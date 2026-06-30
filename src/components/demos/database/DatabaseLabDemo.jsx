import React, { useState, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend,
} from 'recharts';
import {
  Database, Zap, Clock, TrendingUp, Play, ChevronRight, Check,
  AlertTriangle, Activity, BarChart2, Search, RefreshCw,
  GitBranch, Table,
} from 'lucide-react';

/* ─── Design tokens (match DemoModal dark theme) ─────────────────────── */
const T = {
  bg: '#050816',
  card: '#0a0f1e',
  border: 'rgba(255,255,255,0.08)',
  cyan: '#22d3ee',
  green: '#34d399',
  amber: '#fbbf24',
  red: '#f87171',
  purple: '#a78bfa',
  muted: '#64748b',
};

/* ─── Shared tab bar ─────────────────────────────────────────────────── */
const tabs = [
  { id: 'query', label: 'Query Lab', icon: Search },
  { id: 'perf', label: 'Performance Dashboard', icon: BarChart2 },
  { id: 'index', label: 'Index Visualizer', icon: GitBranch },
  { id: 'schema', label: 'Schema Explorer', icon: Table },
];

/* ─── Query Lab data ─────────────────────────────────────────────────── */
const QUERIES = [
  {
    id: 'user_lookup',
    label: 'User Lookup',
    slow: {
      sql: `SELECT *
FROM users u
JOIN orders o ON o.user_id = u.id
JOIN departments d ON d.id = u.department_id
WHERE u.email LIKE '%@nexus.co.ke'
ORDER BY u.created_at DESC;`,
      time: 3420,
      rows: 15800,
      issue: 'Full table scan — no index on email column. SELECT * fetches 40 unused columns. No LIMIT clause.',
    },
    fast: {
      sql: `SELECT u.id, u.name, u.email, d.name AS dept
FROM users u
  INNER JOIN departments d ON d.id = u.department_id
WHERE u.email LIKE '%@nexus.co.ke'
  AND u.is_active = 1
ORDER BY u.created_at DESC
LIMIT 50;`,
      time: 48,
      rows: 50,
      fix: 'Added composite index on (email, is_active). Replaced SELECT * with explicit columns. Added LIMIT 50.',
    },
  },
  {
    id: 'dept_report',
    label: 'Department Report',
    slow: {
      sql: `SELECT d.name,
       (SELECT COUNT(*) FROM users WHERE department_id = d.id) AS staff,
       (SELECT SUM(amount) FROM payroll WHERE dept_id = d.id) AS total_pay
FROM departments d;`,
      time: 6100,
      rows: 24,
      issue: 'Correlated sub-queries execute once per department row — O(n²) complexity. No indexes on FK columns.',
    },
    fast: {
      sql: `SELECT d.name,
       COUNT(u.id)       AS staff,
       SUM(p.amount)     AS total_pay
FROM departments d
  LEFT JOIN users    u ON u.department_id = d.id
  LEFT JOIN payroll  p ON p.dept_id = d.id
GROUP BY d.id, d.name
ORDER BY total_pay DESC;`,
      time: 92,
      rows: 24,
      fix: 'Replaced correlated sub-queries with JOINs + GROUP BY. Added FK indexes on users.department_id and payroll.dept_id.',
    },
  },
  {
    id: 'project_search',
    label: 'Project Search',
    slow: {
      sql: `SELECT * FROM projects
WHERE YEAR(deadline) = 2025
  AND status NOT IN ('archived')
  AND title LIKE '%Infrastructure%';`,
      time: 2890,
      rows: 3,
      issue: 'Function on indexed column (YEAR) prevents index use. LIKE with leading wildcard forces full scan.',
    },
    fast: {
      sql: `SELECT id, title, status, deadline, owner_id
FROM projects
WHERE deadline BETWEEN '2025-01-01' AND '2025-12-31'
  AND status = 'active'
  AND MATCH(title) AGAINST ('Infrastructure' IN BOOLEAN MODE);`,
      time: 14,
      rows: 3,
      fix: 'Removed YEAR() function — range query on indexed deadline. Added FULLTEXT index on title for fast text search.',
    },
  },
];

/* ─── Performance Dashboard data ─────────────────────────────────────── */
const generatePerfData = () =>
  Array.from({ length: 24 }, (_, i) => {
    const base = 800 + Math.sin(i * 0.4) * 200;
    return {
      hour: `${String(i).padStart(2, '0')}:00`,
      queries: Math.round(base + Math.random() * 100),
      avgMs: +(40 + Math.random() * 60).toFixed(1),
      slowQueries: Math.round(Math.random() * 8),
      cacheHit: +(88 + Math.random() * 10).toFixed(1),
    };
  });

const TABLE_STATS = [
  { table: 'users', rows: '48,200', size: '18.4 MB', idx: '3 indexes', health: 'good' },
  { table: 'orders', rows: '312,540', size: '84.2 MB', idx: '5 indexes', health: 'good' },
  { table: 'payroll', rows: '96,100', size: '32.8 MB', idx: '2 indexes', health: 'warn' },
  { table: 'projects', rows: '4,870', size: '6.1 MB', idx: '4 indexes', health: 'good' },
  { table: 'departments', rows: '48', size: '0.2 MB', idx: '1 index', health: 'good' },
  { table: 'audit_logs', rows: '1,204,000', size: '512 MB', idx: '1 index', health: 'warn' },
];

/* ─── Tiny shared pill badge ─────────────────────────────────────────── */
const Badge = ({ color, children }) => {
  const map = {
    cyan:   'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
    green:  'bg-green-500/10 text-green-400 border-green-500/20',
    amber:  'bg-amber-500/10 text-amber-400 border-amber-500/20',
    red:    'bg-red-500/10 text-red-400 border-red-500/20',
    purple: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    muted:  'bg-white/5 text-slate-400 border-white/10',
  };
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono border ${map[color]}`}>
      {children}
    </span>
  );
};

/* ─── SQL code block ─────────────────────────────────────────────────── */
const SqlBlock = ({ code, variant }) => {
  const colors = variant === 'slow'
    ? 'border-red-500/30 bg-red-500/5'
    : 'border-green-500/30 bg-green-500/5';
  return (
    <pre className={`rounded-lg border ${colors} p-4 overflow-x-auto text-xs font-mono leading-relaxed text-slate-300 whitespace-pre-wrap break-words`}>
      <code>{code}</code>
    </pre>
  );
};

/* ─── Animated query timer bar ───────────────────────────────────────── */
const TimerBar = ({ ms, max, color }) => {
  const pct = Math.min((ms / max) * 100, 100);
  const barColor = color === 'red' ? 'from-red-500 to-red-400' : 'from-green-500 to-emerald-400';
  return (
    <div className="relative w-full h-2 rounded-full bg-white/5 overflow-hidden">
      <motion.div
        className={`absolute inset-y-0 left-0 rounded-full bg-gradient-to-r ${barColor}`}
        initial={{ width: 0 }}
        animate={{ width: `${pct}%` }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      />
    </div>
  );
};

/* ─── Query Lab panel ────────────────────────────────────────────────── */
const QueryLabPanel = () => {
  const [activeQuery, setActiveQuery] = useState(QUERIES[0]);
  const [running, setRunning] = useState(false);
  const [ran, setRan] = useState(false);
  const [phase, setPhase] = useState(null); // 'slow' | 'fast' | 'done'
  const [elapsed, setElapsed] = useState(0);
  const timerRef = useRef(null);

  const runQuery = useCallback(() => {
    if (running) return;
    setRunning(true);
    setRan(false);
    setPhase('slow');
    setElapsed(0);

    // Simulate slow query running
    const start = Date.now();
    const slowTarget = Math.min(activeQuery.slow.time, 800); // cap animation at 800 ms for UX
    timerRef.current = setInterval(() => {
      setElapsed(Date.now() - start);
    }, 50);

    setTimeout(() => {
      clearInterval(timerRef.current);
      setPhase('fast');
      setTimeout(() => {
        setPhase('done');
        setRunning(false);
        setRan(true);
      }, 300);
    }, slowTarget + 200);
  }, [running, activeQuery]);

  useEffect(() => () => clearInterval(timerRef.current), []);

  const maxMs = activeQuery.slow.time;

  return (
    <div className="p-4 sm:p-6 space-y-6">
      {/* Query selector */}
      <div className="flex flex-wrap gap-2">
        {QUERIES.map((q) => (
          <button
            key={q.id}
            onClick={() => { setActiveQuery(q); setRan(false); setPhase(null); }}
            className={`px-4 py-2 rounded-lg text-xs font-mono transition-all duration-200 border ${
              activeQuery.id === q.id
                ? 'bg-cyan-500/15 border-cyan-500/40 text-cyan-300'
                : 'bg-white/5 border-white/10 text-slate-400 hover:text-white hover:bg-white/10'
            }`}
          >
            {q.label}
          </button>
        ))}

        <button
          onClick={runQuery}
          disabled={running}
          className={`ml-auto px-5 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all duration-200 ${
            running
              ? 'bg-white/5 text-slate-500 cursor-not-allowed border border-white/5'
              : 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:opacity-90 active:scale-95 shadow-lg shadow-cyan-500/20'
          }`}
        >
          {running ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Play className="w-3.5 h-3.5" />}
          {running ? 'Running...' : 'Run Comparison'}
        </button>
      </div>

      {/* Side-by-side SQL */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Slow */}
        <div className="rounded-xl border border-red-500/20 bg-[#0a0f1e] p-4 space-y-3">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-red-400" />
            <span className="text-xs font-semibold text-red-400 uppercase tracking-wider">Unoptimized Query</span>
          </div>
          <SqlBlock code={activeQuery.slow.sql} variant="slow" />
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs text-slate-500 font-mono">
              <span>Execution time</span>
              <span className="text-red-400 font-semibold">{activeQuery.slow.time.toLocaleString()} ms</span>
            </div>
            <TimerBar ms={activeQuery.slow.time} max={maxMs} color="red" />
          </div>
          <div className="flex gap-2 flex-wrap">
            <Badge color="red">Rows scanned: {activeQuery.slow.rows.toLocaleString()}</Badge>
          </div>
          <p className="text-xs text-slate-500 leading-relaxed border-t border-white/5 pt-3">
            <span className="text-red-400 font-semibold">Issue: </span>
            {activeQuery.slow.issue}
          </p>
        </div>

        {/* Fast */}
        <div className="rounded-xl border border-green-500/20 bg-[#0a0f1e] p-4 space-y-3">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-green-400" />
            <span className="text-xs font-semibold text-green-400 uppercase tracking-wider">Optimized Query</span>
          </div>
          <SqlBlock code={activeQuery.fast.sql} variant="fast" />
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs text-slate-500 font-mono">
              <span>Execution time</span>
              <span className="text-green-400 font-semibold">{activeQuery.fast.time} ms</span>
            </div>
            <TimerBar ms={activeQuery.fast.time} max={maxMs} color="green" />
          </div>
          <div className="flex gap-2 flex-wrap">
            <Badge color="green">Rows returned: {activeQuery.fast.rows.toLocaleString()}</Badge>
            <Badge color="cyan">
              {Math.round(((activeQuery.slow.time - activeQuery.fast.time) / activeQuery.slow.time) * 100)}% faster
            </Badge>
          </div>
          <p className="text-xs text-slate-500 leading-relaxed border-t border-white/5 pt-3">
            <span className="text-green-400 font-semibold">Fix: </span>
            {activeQuery.fast.fix}
          </p>
        </div>
      </div>

      {/* Animated results bar */}
      <AnimatePresence>
        {(running || ran) && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="rounded-xl border border-white/10 bg-[#0a0f1e] p-4"
          >
            <div className="flex items-center gap-3 text-sm">
              {phase === 'slow' && (
                <>
                  <RefreshCw className="w-4 h-4 text-red-400 animate-spin flex-shrink-0" />
                  <span className="text-red-400 font-mono">Running unoptimized query… {elapsed} ms</span>
                </>
              )}
              {phase === 'fast' && (
                <>
                  <RefreshCw className="w-4 h-4 text-cyan-400 animate-spin flex-shrink-0" />
                  <span className="text-cyan-400 font-mono">Switching to optimized query…</span>
                </>
              )}
              {phase === 'done' && (
                <div className="flex flex-wrap items-center gap-4 w-full">
                  <div className="flex items-center gap-2 text-green-400">
                    <Check className="w-4 h-4" />
                    <span className="font-semibold">Comparison complete</span>
                  </div>
                  <div className="flex gap-4 ml-auto flex-wrap">
                    <span className="text-xs font-mono text-slate-400">
                      Slow: <span className="text-red-400">{activeQuery.slow.time.toLocaleString()} ms</span>
                    </span>
                    <span className="text-xs font-mono text-slate-400">
                      Fast: <span className="text-green-400">{activeQuery.fast.time} ms</span>
                    </span>
                    <span className="text-xs font-mono text-slate-400">
                      Speedup: <span className="text-cyan-400 font-semibold">
                        {(activeQuery.slow.time / activeQuery.fast.time).toFixed(0)}x
                      </span>
                    </span>
                  </div>
                </div>
              )}
            </div>

            {phase === 'done' && (
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="mt-3 h-1 rounded-full bg-gradient-to-r from-red-500 via-amber-500 to-green-500 origin-left"
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* ─── Performance Dashboard panel ────────────────────────────────────── */
const PerfDashboardPanel = () => {
  const [data] = useState(generatePerfData);

  const kpis = [
    { label: 'Avg Query Time', value: '47 ms', delta: '-12%', good: true, icon: Clock },
    { label: 'Queries / Hour', value: '894', delta: '+8%', good: true, icon: Activity },
    { label: 'Slow Queries', value: '3.2%', delta: '-5%', good: true, icon: AlertTriangle },
    { label: 'Cache Hit Rate', value: '94.1%', delta: '+2%', good: true, icon: Zap },
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload?.length) return null;
    return (
      <div className="rounded-lg border border-white/10 bg-[#0a0f1e]/95 backdrop-blur p-3 text-xs font-mono space-y-1 shadow-xl">
        <p className="text-slate-400 mb-2">{label}</p>
        {payload.map((p) => (
          <div key={p.dataKey} className="flex justify-between gap-4">
            <span style={{ color: p.color }}>{p.name}</span>
            <span className="text-white font-semibold">{p.value}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="p-4 sm:p-6 space-y-6">
      {/* KPI cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {kpis.map((k, i) => {
          const Icon = k.icon;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="rounded-xl border border-white/8 bg-[#0a0f1e] p-4 space-y-2"
            >
              <div className="flex items-center justify-between">
                <Icon className="w-4 h-4 text-cyan-400" />
                <span className={`text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded ${
                  k.good ? 'text-green-400 bg-green-500/10' : 'text-red-400 bg-red-500/10'
                }`}>{k.delta}</span>
              </div>
              <p className="text-xl font-bold text-white">{k.value}</p>
              <p className="text-[11px] text-slate-500">{k.label}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Area chart — query volume */}
      <div className="rounded-xl border border-white/8 bg-[#0a0f1e] p-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm font-semibold text-white">Query Volume — Last 24 Hours</p>
            <p className="text-xs text-slate-500">Queries per hour vs slow query count</p>
          </div>
          <Badge color="cyan">Live</Badge>
        </div>
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={data} margin={{ top: 5, right: 5, bottom: 0, left: -10 }}>
            <defs>
              <linearGradient id="gradQ" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#22d3ee" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="gradS" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f87171" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#f87171" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
            <XAxis dataKey="hour" tick={{ fontSize: 10, fill: '#64748b' }} tickLine={false} axisLine={false} interval={3} />
            <YAxis tick={{ fontSize: 10, fill: '#64748b' }} tickLine={false} axisLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ fontSize: 11, color: '#94a3b8' }} />
            <Area type="monotone" dataKey="queries" name="Queries/hr" stroke="#22d3ee" fill="url(#gradQ)" strokeWidth={1.5} dot={false} />
            <Area type="monotone" dataKey="slowQueries" name="Slow Queries" stroke="#f87171" fill="url(#gradS)" strokeWidth={1.5} dot={false} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Bar chart — avg response time */}
      <div className="rounded-xl border border-white/8 bg-[#0a0f1e] p-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm font-semibold text-white">Avg Query Response Time (ms)</p>
            <p className="text-xs text-slate-500">Hourly average — target &lt;80 ms</p>
          </div>
          <Badge color="green">Healthy</Badge>
        </div>
        <ResponsiveContainer width="100%" height={160}>
          <BarChart data={data.filter((_, i) => i % 2 === 0)} margin={{ top: 5, right: 5, bottom: 0, left: -10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
            <XAxis dataKey="hour" tick={{ fontSize: 10, fill: '#64748b' }} tickLine={false} axisLine={false} interval={1} />
            <YAxis tick={{ fontSize: 10, fill: '#64748b' }} tickLine={false} axisLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="avgMs" name="Avg ms" fill="#22d3ee" radius={[3, 3, 0, 0]} opacity={0.8} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Table stats */}
      <div className="rounded-xl border border-white/8 bg-[#0a0f1e] overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/8">
          <p className="text-sm font-semibold text-white">Table Statistics</p>
          <Badge color="muted">6 tables</Badge>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs font-mono">
            <thead>
              <tr className="border-b border-white/5">
                {['Table', 'Rows', 'Size', 'Indexes', 'Health'].map((h) => (
                  <th key={h} className="text-left px-4 py-2.5 text-slate-500 font-semibold uppercase tracking-wider text-[10px]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {TABLE_STATS.map((row, i) => (
                <tr key={i} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                  <td className="px-4 py-3 text-cyan-400">{row.table}</td>
                  <td className="px-4 py-3 text-slate-300">{row.rows}</td>
                  <td className="px-4 py-3 text-slate-300">{row.size}</td>
                  <td className="px-4 py-3 text-slate-400">{row.idx}</td>
                  <td className="px-4 py-3">
                    <span className={`flex items-center gap-1 ${row.health === 'good' ? 'text-green-400' : 'text-amber-400'}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${row.health === 'good' ? 'bg-green-400' : 'bg-amber-400'}`} />
                      {row.health === 'good' ? 'Optimal' : 'Review'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

/* ─── Index Visualizer panel ─────────────────────────────────────────── */
const TOTAL_ROWS = 24;
const TARGET_ROWS = [7, 8, 9]; // rows that match in index seek

const IndexVisualizerPanel = () => {
  const [mode, setMode] = useState('full'); // 'full' | 'seek'
  const [scanning, setScanning] = useState(false);
  const [lit, setLit] = useState(new Set());
  const [done, setDone] = useState(false);
  const intervalRef = useRef(null);

  const reset = () => {
    clearInterval(intervalRef.current);
    setLit(new Set());
    setDone(false);
    setScanning(false);
  };

  const runScan = () => {
    if (scanning) return;
    reset();
    setScanning(true);

    if (mode === 'full') {
      let idx = 0;
      intervalRef.current = setInterval(() => {
        setLit((prev) => new Set([...prev, idx]));
        idx++;
        if (idx >= TOTAL_ROWS) {
          clearInterval(intervalRef.current);
          setScanning(false);
          setDone(true);
        }
      }, 70);
    } else {
      // Index seek — light target rows quickly with short delay
      const delays = [80, 160, 240];
      TARGET_ROWS.forEach((row, i) => {
        setTimeout(() => {
          setLit((prev) => new Set([...prev, row]));
          if (i === TARGET_ROWS.length - 1) {
            setScanning(false);
            setDone(true);
          }
        }, delays[i]);
      });
    }
  };

  useEffect(() => () => clearInterval(intervalRef.current), []);

  const isLit = (i) => lit.has(i);
  const isTarget = (i) => TARGET_ROWS.includes(i);

  const metrics = mode === 'full'
    ? { rows: 24, time: '1 240 ms', color: 'red' }
    : { rows: 3, time: '12 ms', color: 'green' };

  return (
    <div className="p-4 sm:p-6 space-y-6">
      {/* Mode toggle + Run button */}
      <div className="flex flex-wrap items-center gap-3">
        {['full', 'seek'].map((m) => (
          <button
            key={m}
            onClick={() => { setMode(m); reset(); }}
            className={`px-4 py-2 rounded-lg text-xs font-mono border transition-all duration-200 ${
              mode === m
                ? m === 'full'
                  ? 'bg-red-500/15 border-red-500/40 text-red-300'
                  : 'bg-green-500/15 border-green-500/40 text-green-300'
                : 'bg-white/5 border-white/10 text-slate-400 hover:text-white hover:bg-white/10'
            }`}
          >
            {m === 'full' ? 'Full Table Scan' : 'Index Seek'}
          </button>
        ))}
        <button
          onClick={runScan}
          disabled={scanning}
          className={`ml-auto px-5 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all duration-200 ${
            scanning
              ? 'bg-white/5 text-slate-500 cursor-not-allowed border border-white/5'
              : 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:opacity-90 active:scale-95 shadow-lg shadow-cyan-500/20'
          }`}
        >
          {scanning ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Play className="w-3.5 h-3.5" />}
          {scanning ? 'Scanning…' : 'Run Scan'}
        </button>
      </div>

      {/* Description */}
      <div className={`rounded-xl border p-4 text-xs leading-relaxed ${
        mode === 'full'
          ? 'border-red-500/20 bg-red-500/5 text-red-200'
          : 'border-green-500/20 bg-green-500/5 text-green-200'
      }`}>
        {mode === 'full' ? (
          <><span className="font-semibold text-red-400">Full Table Scan: </span>
            MySQL reads every single row in the table from disk. With no index on the WHERE column,
            the engine cannot skip ahead — it must examine all 24 rows (or millions in production)
            before returning the matching records. This is O(n) and kills performance at scale.
          </>
        ) : (
          <><span className="font-semibold text-green-400">Index Seek: </span>
            MySQL traverses the B-tree index (O(log n)) to jump directly to the matching leaf nodes.
            Only 3 rows are examined and fetched — the rest are never touched. The arrow shows the
            engine's direct path through the index structure to the data page.
          </>
        )}
      </div>

      {/* Row grid */}
      <div className="rounded-xl border border-white/8 bg-[#0a0f1e] p-5 space-y-4">
        <div className="flex items-center justify-between mb-1">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Table: users (24 rows)</p>
          {done && (
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${
                mode === 'full'
                  ? 'text-red-400 border-red-500/30 bg-red-500/10'
                  : 'text-green-400 border-green-500/30 bg-green-500/10'
              }`}
            >
              {mode === 'full' ? '24 rows examined' : '3 rows examined'}
            </motion.span>
          )}
        </div>

        {/* Index seek arrow */}
        {mode === 'seek' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: done ? 1 : 0.4 }}
            className="flex items-center gap-2 text-[10px] font-mono text-cyan-400 mb-2"
          >
            <GitBranch className="w-3.5 h-3.5" />
            <span>B-tree index → leaf page → row 7, 8, 9</span>
            <ChevronRight className="w-3 h-3" />
          </motion.div>
        )}

        <div className="grid grid-cols-6 sm:grid-cols-8 gap-1.5">
          {Array.from({ length: TOTAL_ROWS }, (_, i) => {
            const active = isLit(i);
            const target = isTarget(i);
            const isSeekMode = mode === 'seek';
            return (
              <motion.div
                key={i}
                animate={{
                  backgroundColor: active
                    ? isSeekMode
                      ? 'rgba(52,211,153,0.25)'
                      : 'rgba(248,113,113,0.25)'
                    : 'rgba(255,255,255,0.04)',
                  borderColor: active
                    ? isSeekMode ? '#34d399' : '#f87171'
                    : 'rgba(255,255,255,0.08)',
                  scale: active && isSeekMode && target ? 1.08 : 1,
                }}
                transition={{ duration: 0.15 }}
                className="relative rounded border p-1.5 text-center cursor-default"
              >
                <p className={`text-[9px] font-mono leading-tight ${
                  active
                    ? isSeekMode ? 'text-green-300' : 'text-red-300'
                    : 'text-slate-600'
                }`}>
                  row_{i + 1}
                </p>
                {active && isSeekMode && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-green-400 flex items-center justify-center"
                  >
                    <Check className="w-1.5 h-1.5 text-[#050816]" />
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Metrics comparison */}
      <div className="grid grid-cols-2 gap-4">
        {[
          {
            label: 'Rows Examined',
            full: '24',
            seek: '3',
            unit: 'rows',
            icon: Database,
          },
          {
            label: 'Execution Time',
            full: '1 240 ms',
            seek: '12 ms',
            unit: '',
            icon: Clock,
          },
        ].map((m, i) => {
          const Icon = m.icon;
          return (
            <div key={i} className="rounded-xl border border-white/8 bg-[#0a0f1e] p-4 space-y-3">
              <div className="flex items-center gap-2">
                <Icon className="w-4 h-4 text-slate-500" />
                <span className="text-xs text-slate-400 font-semibold">{m.label}</span>
              </div>
              <div className="flex items-end justify-between">
                <div className="space-y-0.5">
                  <p className="text-[10px] text-slate-600 font-mono">Full Scan</p>
                  <p className="text-lg font-bold text-red-400 font-mono">{m.full}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-600 mb-1" />
                <div className="space-y-0.5 text-right">
                  <p className="text-[10px] text-slate-600 font-mono">Index Seek</p>
                  <p className="text-lg font-bold text-green-400 font-mono">{m.seek}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

/* ─── Schema Explorer panel ──────────────────────────────────────────── */
const SCHEMA = [
  {
    id: 'users',
    color: 'cyan',
    columns: [
      { name: 'id', type: 'INT', role: 'pk' },
      { name: 'full_name', type: 'VARCHAR(120)', role: 'col' },
      { name: 'email', type: 'VARCHAR(150)', role: 'col' },
      { name: 'phone_ke', type: 'VARCHAR(20)', role: 'col' },
      { name: 'is_active', type: 'TINYINT(1)', role: 'col' },
      { name: 'department_id', type: 'INT', role: 'fk', ref: 'departments.id' },
      { name: 'created_at', type: 'DATETIME', role: 'col' },
    ],
  },
  {
    id: 'departments',
    color: 'purple',
    columns: [
      { name: 'id', type: 'INT', role: 'pk' },
      { name: 'name', type: 'VARCHAR(80)', role: 'col' },
      { name: 'cost_centre', type: 'VARCHAR(20)', role: 'col' },
      { name: 'head_id', type: 'INT', role: 'fk', ref: 'users.id' },
      { name: 'budget_kes', type: 'DECIMAL(14,2)', role: 'col' },
    ],
  },
  {
    id: 'orders',
    color: 'amber',
    columns: [
      { name: 'id', type: 'BIGINT', role: 'pk' },
      { name: 'order_ref', type: 'VARCHAR(30)', role: 'col' },
      { name: 'user_id', type: 'INT', role: 'fk', ref: 'users.id' },
      { name: 'amount_kes', type: 'DECIMAL(12,2)', role: 'col' },
      { name: 'status', type: "ENUM('pending','paid','cancelled')", role: 'col' },
      { name: 'created_at', type: 'DATETIME', role: 'col' },
    ],
  },
  {
    id: 'payroll',
    color: 'green',
    columns: [
      { name: 'id', type: 'BIGINT', role: 'pk' },
      { name: 'dept_id', type: 'INT', role: 'fk', ref: 'departments.id' },
      { name: 'employee_id', type: 'INT', role: 'fk', ref: 'users.id' },
      { name: 'gross_kes', type: 'DECIMAL(12,2)', role: 'col' },
      { name: 'nssf_deduction', type: 'DECIMAL(10,2)', role: 'col' },
      { name: 'paye_tax', type: 'DECIMAL(10,2)', role: 'col' },
      { name: 'pay_period', type: 'DATE', role: 'col' },
    ],
  },
  {
    id: 'projects',
    color: 'cyan',
    columns: [
      { name: 'id', type: 'INT', role: 'pk' },
      { name: 'title', type: 'VARCHAR(200)', role: 'col' },
      { name: 'owner_id', type: 'INT', role: 'fk', ref: 'users.id' },
      { name: 'dept_id', type: 'INT', role: 'fk', ref: 'departments.id' },
      { name: 'status', type: "ENUM('active','archived','on_hold')", role: 'col' },
      { name: 'deadline', type: 'DATE', role: 'col' },
    ],
  },
  {
    id: 'audit_logs',
    color: 'red',
    columns: [
      { name: 'id', type: 'BIGINT', role: 'pk' },
      { name: 'user_id', type: 'INT', role: 'fk', ref: 'users.id' },
      { name: 'action', type: 'VARCHAR(60)', role: 'col' },
      { name: 'table_name', type: 'VARCHAR(60)', role: 'col' },
      { name: 'record_id', type: 'BIGINT', role: 'col' },
      { name: 'ip_address', type: 'VARCHAR(45)', role: 'col' },
      { name: 'logged_at', type: 'DATETIME', role: 'col' },
    ],
  },
];

const RELATIONS = [
  { from: 'users', to: 'departments', label: 'many → one', fromKey: 'department_id', toKey: 'id' },
  { from: 'orders', to: 'users', label: 'many → one', fromKey: 'user_id', toKey: 'id' },
  { from: 'payroll', to: 'departments', label: 'many → one', fromKey: 'dept_id', toKey: 'id' },
  { from: 'audit_logs', to: 'users', label: 'many → one', fromKey: 'user_id', toKey: 'id' },
];

const colorMap = {
  cyan:   { header: 'bg-cyan-500/15 border-cyan-500/30 text-cyan-300', dot: 'bg-cyan-400' },
  purple: { header: 'bg-purple-500/15 border-purple-500/30 text-purple-300', dot: 'bg-purple-400' },
  amber:  { header: 'bg-amber-500/15 border-amber-500/30 text-amber-300', dot: 'bg-amber-400' },
  green:  { header: 'bg-green-500/15 border-green-500/30 text-green-300', dot: 'bg-green-400' },
  red:    { header: 'bg-red-500/15 border-red-500/30 text-red-300', dot: 'bg-red-400' },
};

const roleStyle = {
  pk:  'text-cyan-400 font-bold',
  fk:  'text-amber-400',
  col: 'text-slate-400',
};

const roleBadge = {
  pk:  'PK',
  fk:  'FK',
  col: '',
};

const TableCard = ({ table, highlight, onHover }) => {
  const c = colorMap[table.color] || colorMap.cyan;
  return (
    <motion.div
      onMouseEnter={() => onHover(table.id)}
      onMouseLeave={() => onHover(null)}
      animate={{ opacity: highlight === null || highlight === table.id ? 1 : 0.35 }}
      transition={{ duration: 0.2 }}
      className="rounded-xl border border-white/8 bg-[#0a0f1e] overflow-hidden"
    >
      {/* Table header */}
      <div className={`flex items-center gap-2 px-3 py-2.5 border-b ${c.header} border-opacity-50`}>
        <span className={`w-2 h-2 rounded-full ${c.dot}`} />
        <span className="text-xs font-bold tracking-wide uppercase">{table.id}</span>
        <span className="ml-auto text-[9px] text-slate-500 font-mono">{table.columns.length} cols</span>
      </div>
      {/* Columns */}
      <div className="divide-y divide-white/[0.04]">
        {table.columns.map((col) => (
          <div key={col.name} className="flex items-center gap-2 px-3 py-1.5">
            {roleBadge[col.role] && (
              <span className={`text-[9px] font-mono font-semibold w-5 flex-shrink-0 ${
                col.role === 'pk' ? 'text-cyan-500' : 'text-amber-500'
              }`}>
                {roleBadge[col.role]}
              </span>
            )}
            {!roleBadge[col.role] && <span className="w-5 flex-shrink-0" />}
            <span className={`text-[11px] font-mono flex-1 ${roleStyle[col.role]}`}>{col.name}</span>
            <span className="text-[9px] text-slate-600 font-mono truncate max-w-[100px]">{col.type}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

const SchemaExplorerPanel = () => {
  const [highlight, setHighlight] = useState(null);

  const relatedTables = highlight
    ? new Set(
        RELATIONS
          .filter((r) => r.from === highlight || r.to === highlight)
          .flatMap((r) => [r.from, r.to])
      )
    : null;

  const effectiveHighlight = highlight
    ? (relatedTables.has(highlight) ? highlight : null)
    : null;

  return (
    <div className="p-4 sm:p-6 space-y-6">
      {/* Legend */}
      <div className="flex flex-wrap gap-4 text-[11px] font-mono">
        {[
          { label: 'Primary Key', cls: 'text-cyan-400 font-bold', badge: 'PK' },
          { label: 'Foreign Key', cls: 'text-amber-400', badge: 'FK' },
          { label: 'Column', cls: 'text-slate-400', badge: '—' },
        ].map((l) => (
          <div key={l.label} className="flex items-center gap-1.5">
            <span className={l.cls}>{l.badge}</span>
            <span className="text-slate-500">{l.label}</span>
          </div>
        ))}
        <div className="ml-auto text-slate-600 italic">Hover a table to highlight relations</div>
      </div>

      {/* Relationship pills */}
      <div className="rounded-xl border border-white/8 bg-[#0a0f1e] p-4 space-y-2">
        <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-3">Foreign Key Relationships</p>
        <div className="flex flex-col gap-2">
          {RELATIONS.map((r, i) => (
            <motion.div
              key={i}
              animate={{
                opacity: highlight === null || highlight === r.from || highlight === r.to ? 1 : 0.25,
              }}
              className="flex items-center gap-2 text-xs font-mono"
            >
              <span className="text-amber-400">{r.from}.{r.fromKey}</span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-600 flex-shrink-0" />
              <span className="text-cyan-400">{r.to}.{r.toKey}</span>
              <span className="ml-2 text-[9px] text-slate-600 border border-white/8 px-1.5 py-0.5 rounded-full">{r.label}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Table cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {SCHEMA.map((table) => (
          <TableCard
            key={table.id}
            table={table}
            highlight={highlight}
            onHover={setHighlight}
          />
        ))}
      </div>

      {/* Summary footer */}
      <div className="rounded-xl border border-white/8 bg-[#0a0f1e] p-4">
        <div className="grid grid-cols-3 gap-4 text-center">
          {[
            { label: 'Tables', value: '6' },
            { label: 'Relationships', value: '4' },
            { label: 'Total Columns', value: String(SCHEMA.reduce((s, t) => s + t.columns.length, 0)) },
          ].map((s) => (
            <div key={s.label}>
              <p className="text-xl font-bold text-white">{s.value}</p>
              <p className="text-[11px] text-slate-500">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ─── Root component ─────────────────────────────────────────────────── */
const DatabaseLabDemo = () => {
  const [activeTab, setActiveTab] = useState('query');

  return (
    <div className="flex flex-col h-full min-h-0" style={{ background: T.bg }}>
      {/* Tab bar */}
      <div className="flex-shrink-0 flex items-center gap-1 px-4 sm:px-6 py-3 border-b border-white/8 overflow-x-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                active
                  ? 'bg-green-500/10 border border-green-500/30 text-green-400'
                  : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Panel content */}
      <div className="flex-1 overflow-y-auto min-h-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="h-full"
          >
            {activeTab === 'query' && <QueryLabPanel />}
            {activeTab === 'perf' && <PerfDashboardPanel />}
            {activeTab === 'index' && <IndexVisualizerPanel />}
            {activeTab === 'schema' && <SchemaExplorerPanel />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default DatabaseLabDemo;
