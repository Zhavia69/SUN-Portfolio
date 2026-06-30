import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Send, Plus, Folder, Clock, Copy, Check, ChevronDown, ChevronRight,
  Trash2, Zap, Globe, AlertCircle, CheckCircle2, RefreshCw, Code2,
  List, BookOpen, Info, Eye, EyeOff, X, Edit3, Gauge, AlertTriangle, TrendingUp,
} from 'lucide-react';

/* ─────────────────────────────────────────────
   MOCK API SIMULATION
───────────────────────────────────────────── */
const MOCK_USERS = [
  { id: 1, name: 'Wanjiku Kamau', email: 'wanjiku.kamau@nexus.co.ke', role: 'admin',    dept: 'ICT',              status: 'active',   joined: '2023-01-15' },
  { id: 2, name: 'Otieno Omondi', email: 'otieno.omondi@nexus.co.ke', role: 'manager',  dept: 'Operations',       status: 'active',   joined: '2022-09-01' },
  { id: 3, name: 'Achieng Wangari', email: 'achieng.wangari@nexus.co.ke', role: 'hr',  dept: 'Human Resources',  status: 'active',   joined: '2023-04-22' },
  { id: 4, name: 'Kiberu Njoroge', email: 'kiberu.njoroge@nexus.co.ke', role: 'employee',dept: 'Finance',         status: 'active',   joined: '2024-01-03' },
  { id: 5, name: 'Mwangi Ndung\'u', email: 'mwangi.ndungu@nexus.co.ke', role: 'super_admin', dept: 'Executive', status: 'active',   joined: '2021-06-01' },
  { id: 6, name: 'Njoroge Kibiru', email: 'njoroge.kibiru@nexus.co.ke', role: 'employee', dept: 'Legal',         status: 'inactive', joined: '2023-08-14' },
];

const MOCK_DEPARTMENTS = [
  { id: 1, name: 'ICT',             head: 'Wanjiku Kamau',   headcount: 12, budget: 'KES 2.4M', status: 'active' },
  { id: 2, name: 'Operations',      head: 'Otieno Omondi',   headcount: 28, budget: 'KES 5.6M', status: 'active' },
  { id: 3, name: 'Human Resources', head: 'Achieng Wangari', headcount: 6,  budget: 'KES 1.2M', status: 'active' },
  { id: 4, name: 'Finance',         head: 'Kipchoge Mutai',  headcount: 15, budget: 'KES 3.8M', status: 'active' },
  { id: 5, name: 'Legal & Compliance', head: 'Adhiambo Oloo',headcount: 4,  budget: 'KES 0.9M', status: 'active' },
];

const API_RESPONSES = {
  'GET /api/v1/users': {
    success: true, message: 'Users retrieved successfully.', data: MOCK_USERS,
    meta: { total: MOCK_USERS.length, page: 1, per_page: 15, last_page: 1 }, errors: [],
  },
  'GET /api/v1/users/1': {
    success: true, message: 'User retrieved successfully.', data: MOCK_USERS[0], meta: {}, errors: [],
  },
  'GET /api/v1/departments': {
    success: true, message: 'Departments retrieved successfully.', data: MOCK_DEPARTMENTS,
    meta: { total: MOCK_DEPARTMENTS.length }, errors: [],
  },
  'GET /api/v1/health': {
    success: true, message: 'System operational.', data: {
      status: 'healthy', version: '1.4.2', environment: 'production',
      services: { database: 'connected', cache: 'connected', queue: 'running', storage: 'mounted' },
      uptime: '14d 6h 22m', timestamp: new Date().toISOString(),
    }, meta: {}, errors: [],
  },
  'POST /api/v1/users': {
    success: true, message: 'User created successfully.', data: {
      id: 7, name: 'Kamau Muriuki', email: 'kamau.muriuki@nexus.co.ke',
      role: 'employee', dept: 'Operations', status: 'active', joined: new Date().toISOString().split('T')[0],
    }, meta: {}, errors: [],
  },
  'PUT /api/v1/users/1': {
    success: true, message: 'User updated successfully.', data: { ...MOCK_USERS[0], status: 'inactive' }, meta: {}, errors: [],
  },
  'DELETE /api/v1/users/6': {
    success: true, message: 'User deactivated successfully (soft delete).', data: null, meta: {}, errors: [],
  },
  'GET /api/v1/auth/me': {
    success: true, message: 'Authenticated user retrieved.', data: MOCK_USERS[4], meta: {}, errors: [],
  },
};

const simulateRequest = async (method, url, headers, body) => {
  const latency = 120 + Math.floor(Math.random() * 380);
  await new Promise(r => setTimeout(r, latency));

  const key = `${method} ${url}`;
  const response = API_RESPONSES[key];

  if (!response) {
    if (!headers['Authorization']) {
      return { status: 401, statusText: 'Unauthorized', data: { success: false, message: 'No authentication token provided.', data: null, errors: ['MISSING_TOKEN'] }, latency };
    }
    return { status: 404, statusText: 'Not Found', data: { success: false, message: `Endpoint ${url} not found.`, data: null, errors: ['ENDPOINT_NOT_FOUND'] }, latency };
  }

  if (!headers['Authorization'] && url !== '/api/v1/health') {
    return { status: 401, statusText: 'Unauthorized', data: { success: false, message: 'Authentication required.', data: null, errors: ['UNAUTHENTICATED'] }, latency };
  }

  return { status: 200, statusText: 'OK', data: response, latency };
};

/* ─────────────────────────────────────────────
   COLLECTIONS DATA
───────────────────────────────────────────── */
const COLLECTIONS = [
  {
    name: 'User Management',
    icon: '👥',
    color: 'from-blue-500 to-cyan-500',
    requests: [
      { method: 'GET',    url: '/api/v1/users',    label: 'List All Users' },
      { method: 'GET',    url: '/api/v1/users/1',  label: 'Get User by ID' },
      { method: 'POST',   url: '/api/v1/users',    label: 'Create User' },
      { method: 'PUT',    url: '/api/v1/users/1',  label: 'Update User' },
      { method: 'DELETE', url: '/api/v1/users/6',  label: 'Soft Delete User' },
    ],
  },
  {
    name: 'Authentication',
    icon: '🔐',
    color: 'from-red-500 to-pink-500',
    requests: [
      { method: 'GET', url: '/api/v1/auth/me', label: 'Get Authenticated User' },
    ],
  },
  {
    name: 'Departments',
    icon: '🏢',
    color: 'from-purple-500 to-indigo-500',
    requests: [
      { method: 'GET', url: '/api/v1/departments', label: 'List Departments' },
    ],
  },
  {
    name: 'System',
    icon: '⚙️',
    color: 'from-green-500 to-emerald-500',
    requests: [
      { method: 'GET', url: '/api/v1/health', label: 'Health Check' },
    ],
  },
];

const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
};

const METHOD_COLORS = {
  GET:    'bg-green-500/10 text-green-400 border-green-500/20',
  POST:   'bg-blue-500/10 text-blue-400 border-blue-500/20',
  PUT:    'bg-amber-500/10 text-amber-400 border-amber-500/20',
  DELETE: 'bg-red-500/10 text-red-400 border-red-500/20',
  PATCH:  'bg-purple-500/10 text-purple-400 border-purple-500/20',
};

const STATUS_COLORS = {
  200: 'text-green-400', 201: 'text-green-400', 204: 'text-green-400',
  400: 'text-amber-400', 401: 'text-red-400',   403: 'text-red-400',
  404: 'text-amber-400', 500: 'text-red-400',
};

/* ─────────────────────────────────────────────
   SUB-COMPONENTS
───────────────────────────────────────────── */
const MethodBadge = ({ method, size = 'sm' }) => (
  <span className={`font-mono font-bold border rounded ${size === 'xs' ? 'text-[9px] px-1.5 py-0.5' : 'text-[10px] px-2 py-0.5'} ${METHOD_COLORS[method] || 'bg-slate-500/10 text-slate-400 border-slate-500/20'}`}>
    {method}
  </span>
);

const TabButton = ({ active, onClick, children, icon: Icon }) => (
  <button onClick={onClick}
    className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 whitespace-nowrap ${
      active ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/20'
             : 'text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10'
    }`}>
    {Icon && <Icon className="w-3.5 h-3.5 flex-shrink-0" />}
    <span>{children}</span>
  </button>
);

/* ── TAB 1: API Explorer ── */
const APIExplorer = () => {
  const [method, setMethod] = useState('GET');
  const [url, setUrl] = useState('/api/v1/users');
  const [headers, setHeaders] = useState(DEFAULT_HEADERS);
  const [body, setBody] = useState('{\n  "name": "Kamau Muriuki",\n  "email": "kamau.muriuki@nexus.co.ke",\n  "role": "employee",\n  "dept": "Operations"\n}');
  const [activePanel, setActivePanel] = useState('headers');
  const [showAuth, setShowAuth] = useState(true);
  const [sending, setSending] = useState(false);
  const [response, setResponse] = useState(null);
  const [copied, setCopied] = useState(false);
  const [responseTab, setResponseTab] = useState('body');
  const [history, setHistory] = useState([]);

  const handleSend = async () => {
    setSending(true);
    setResponse(null);
    const activeHeaders = showAuth ? headers : { ...headers, Authorization: undefined };
    const result = await simulateRequest(method, url, activeHeaders, body);
    setResponse(result);
    setSending(false);
    setHistory(prev => [{
      id: Date.now(), method, url, status: result.status, latency: result.latency,
      time: new Date().toLocaleTimeString('en-KE'),
    }, ...prev.slice(0, 9)]);
  };

  const handleCopy = () => {
    if (response) {
      navigator.clipboard.writeText(JSON.stringify(response.data, null, 2));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const loadRequest = (req) => { setMethod(req.method); setUrl(req.url); };

  return (
    <div className="flex flex-col lg:flex-row h-full min-h-[600px] divide-y lg:divide-y-0 lg:divide-x divide-white/10">
      {/* ── Left: Request Builder ── */}
      <div className="flex-1 lg:max-w-[55%] flex flex-col">
        {/* URL bar */}
        <div className="p-4 sm:p-5 border-b border-white/10">
          <div className="flex items-center gap-2">
            {/* Method selector */}
            <div className="relative flex-shrink-0">
              <select
                value={method}
                onChange={e => setMethod(e.target.value)}
                className="appearance-none bg-[#131b2f] border border-white/10 rounded-lg px-3 py-2.5 pr-8 text-xs font-mono font-bold text-slate-300 focus:outline-none focus:border-cyan-500/50 cursor-pointer"
              >
                {['GET','POST','PUT','PATCH','DELETE'].map(m => <option key={m}>{m}</option>)}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-slate-500 pointer-events-none" />
            </div>

            {/* URL input */}
            <div className="flex-1 relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600 text-xs font-mono pointer-events-none hidden sm:block">
                api.nexus.co.ke
              </div>
              <input
                type="text"
                value={url}
                onChange={e => setUrl(e.target.value)}
                className="w-full pl-3 sm:pl-28 pr-3 py-2.5 bg-[#131b2f] border border-white/10 rounded-lg text-xs sm:text-sm font-mono text-slate-300 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20"
              />
            </div>

            {/* Send button */}
            <motion.button
              onClick={handleSend}
              disabled={sending}
              whileTap={{ scale: 0.96 }}
              className="flex-shrink-0 px-4 py-2.5 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-sm font-semibold flex items-center gap-2 hover:opacity-90 transition-opacity shadow-lg shadow-blue-500/20 disabled:opacity-60"
            >
              {sending
                ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Sending</>
                : <><Send className="w-4 h-4" />Send</>
              }
            </motion.button>
          </div>
        </div>

        {/* Tabs: Headers / Body / Auth */}
        <div className="flex items-center gap-1 px-4 pt-3 pb-0 border-b border-white/10">
          {['headers','body','auth'].map(p => (
            <button key={p} onClick={() => setActivePanel(p)}
              className={`px-3 py-2 text-xs font-mono capitalize rounded-t transition-colors ${
                activePanel === p ? 'text-white border-b-2 border-cyan-500 -mb-px' : 'text-slate-500 hover:text-slate-300'
              }`}>
              {p}
            </button>
          ))}
        </div>

        {/* Panel content */}
        <div className="flex-1 overflow-y-auto p-4">
          {activePanel === 'headers' && (
            <div className="space-y-2">
              {Object.entries(headers).map(([k, v]) => (
                <div key={k} className="flex gap-2 items-center">
                  <input readOnly value={k} className="flex-1 min-w-0 px-3 py-1.5 bg-[#131b2f] border border-white/10 rounded-lg text-[11px] font-mono text-slate-400 focus:outline-none" />
                  <input readOnly value={k === 'Authorization' ? (showAuth ? v : '— hidden —') : v}
                    className="flex-1 min-w-0 px-3 py-1.5 bg-[#131b2f] border border-white/10 rounded-lg text-[11px] font-mono text-slate-300 focus:outline-none truncate" />
                </div>
              ))}
            </div>
          )}
          {activePanel === 'body' && (
            <textarea
              value={body}
              onChange={e => setBody(e.target.value)}
              rows={12}
              className="w-full px-3 py-3 bg-[#131b2f] border border-white/10 rounded-lg text-xs font-mono text-slate-300 focus:outline-none focus:border-cyan-500/50 resize-none leading-relaxed"
            />
          )}
          {activePanel === 'auth' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-xs font-mono text-slate-400">Bearer Token Authentication</p>
                <button onClick={() => setShowAuth(v => !v)}
                  className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border transition-colors ${showAuth ? 'bg-green-500/10 border-green-500/20 text-green-400' : 'bg-red-500/10 border-red-500/20 text-red-400'}`}>
                  {showAuth ? <><Eye className="w-3.5 h-3.5" />Enabled</> : <><EyeOff className="w-3.5 h-3.5" />Disabled</>}
                </button>
              </div>
              {showAuth && (
                <div>
                  <label className="text-[10px] font-mono text-slate-500 mb-1.5 block">JWT Token</label>
                  <textarea readOnly value={headers.Authorization}
                    className="w-full px-3 py-2.5 bg-[#131b2f] border border-white/10 rounded-lg text-[10px] font-mono text-cyan-400 resize-none focus:outline-none" rows={4} />
                </div>
              )}
              <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                <p className="text-xs text-blue-400">Token auto-includes <code className="font-mono bg-blue-500/10 px-1 rounded">Authorization: Bearer</code> header with each request.</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── Right: Response Viewer ── */}
      <div className="flex-1 flex flex-col bg-[#080d1a]">
        {/* Response meta */}
        <div className="flex items-center justify-between px-4 sm:px-5 py-3 border-b border-white/10 flex-wrap gap-2">
          <div className="flex items-center gap-3">
            {response ? (
              <>
                <span className={`text-sm font-bold font-mono ${STATUS_COLORS[response.status] || 'text-white'}`}>
                  {response.status}
                </span>
                <span className="text-xs text-slate-500 font-mono">{response.statusText}</span>
                <span className="flex items-center gap-1 text-xs text-slate-500 font-mono">
                  <Zap className="w-3 h-3 text-amber-400" />{response.latency}ms
                </span>
              </>
            ) : sending ? (
              <span className="text-xs text-slate-500 font-mono flex items-center gap-2">
                <div className="w-3 h-3 border-2 border-slate-600 border-t-cyan-400 rounded-full animate-spin" />
                Waiting for response...
              </span>
            ) : (
              <span className="text-xs text-slate-600 font-mono">Click Send to get a response</span>
            )}
          </div>
          {response && (
            <button onClick={handleCopy} className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors">
              {copied ? <><Check className="w-3.5 h-3.5 text-green-400" />Copied</> : <><Copy className="w-3.5 h-3.5" />Copy</>}
            </button>
          )}
        </div>

        {/* Response tabs */}
        {response && (
          <div className="flex items-center gap-1 px-4 pt-2 border-b border-white/10">
            {['body','headers'].map(t => (
              <button key={t} onClick={() => setResponseTab(t)}
                className={`px-3 py-1.5 text-xs font-mono capitalize rounded-t transition-colors ${
                  responseTab === t ? 'text-white border-b-2 border-cyan-500 -mb-px' : 'text-slate-500 hover:text-slate-300'
                }`}>{t}</button>
            ))}
          </div>
        )}

        {/* Response body */}
        <div className="flex-1 overflow-y-auto p-4">
          <AnimatePresence mode="wait">
            {sending && (
              <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center h-full gap-3 text-slate-600">
                <div className="w-8 h-8 border-2 border-slate-700 border-t-cyan-500 rounded-full animate-spin" />
                <p className="text-sm font-mono">Sending request...</p>
              </motion.div>
            )}
            {!sending && !response && (
              <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center h-full gap-3 text-slate-700">
                <Globe className="w-12 h-12" />
                <p className="text-sm font-mono">No response yet</p>
                <p className="text-xs">Hit Send to see the response here</p>
              </motion.div>
            )}
            {!sending && response && responseTab === 'body' && (
              <motion.div key="body" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                <pre className="text-[11px] sm:text-xs font-mono text-slate-300 whitespace-pre-wrap leading-relaxed break-all">
                  {JSON.stringify(response.data, null, 2)
                    .replace(/"([^"]+)":/g, (_, k) => `<span class="text-cyan-400">"${k}"</span>:`)
                  }
                  {/* NOTE: In production, use a proper syntax highlighter like Prism */}
                  {JSON.stringify(response.data, null, 2)}
                </pre>
              </motion.div>
            )}
            {!sending && response && responseTab === 'headers' && (
              <motion.div key="respHeaders" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-1.5">
                {[
                  ['Content-Type', 'application/json; charset=utf-8'],
                  ['X-Request-ID', `req_${Math.random().toString(36).substr(2, 12)}`],
                  ['X-Response-Time', `${response.latency}ms`],
                  ['X-RateLimit-Limit', '1000'],
                  ['X-RateLimit-Remaining', `${Math.floor(Math.random() * 900 + 50)}`],
                  ['Cache-Control', 'no-cache, private'],
                  ['Access-Control-Allow-Origin', 'https://nexus.co.ke'],
                ].map(([k,v]) => (
                  <div key={k} className="flex gap-3">
                    <span className="text-[11px] font-mono text-cyan-400 w-48 flex-shrink-0">{k}:</span>
                    <span className="text-[11px] font-mono text-slate-300">{v}</span>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* History strip */}
        {history.length > 0 && (
          <div className="border-t border-white/10 px-4 py-2 flex gap-2 overflow-x-auto scrollbar-hide">
            {history.map(h => (
              <button key={h.id} onClick={() => { setMethod(h.method); setUrl(h.url); }}
                className="flex-shrink-0 flex items-center gap-1.5 px-2 py-1 rounded-md bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                <MethodBadge method={h.method} size="xs" />
                <span className="text-[10px] font-mono text-slate-400 truncate max-w-[100px]">{h.url}</span>
                <span className={`text-[10px] font-mono ${STATUS_COLORS[h.status]}`}>{h.status}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

/* ── TAB 2: Collections ── */
const Collections = ({ onLoadRequest }) => {
  const [expanded, setExpanded] = useState({ 0: true });
  const toggle = (i) => setExpanded(prev => ({ ...prev, [i]: !prev[i] }));

  return (
    <div className="p-4 sm:p-6 space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-xs font-mono text-blue-400/80 uppercase tracking-wider flex items-center gap-2">
          <Folder className="w-3.5 h-3.5" /> API Collections
        </p>
        <span className="text-xs text-slate-500">{COLLECTIONS.reduce((a,c)=>a+c.requests.length,0)} endpoints</span>
      </div>

      <div className="space-y-3">
        {COLLECTIONS.map((col, ci) => (
          <div key={ci} className="bg-[#0a0f1e] rounded-xl border border-white/10 overflow-hidden">
            {/* Collection header */}
            <button onClick={() => toggle(ci)} className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors">
              <span className="text-lg">{col.icon}</span>
              <span className="flex-1 text-left text-sm font-semibold text-white">{col.name}</span>
              <span className="text-xs text-slate-500 font-mono">{col.requests.length} requests</span>
              {expanded[ci] ? <ChevronDown className="w-4 h-4 text-slate-500" /> : <ChevronRight className="w-4 h-4 text-slate-500" />}
            </button>

            <AnimatePresence>
              {expanded[ci] && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden border-t border-white/10"
                >
                  {col.requests.map((req, ri) => (
                    <motion.button
                      key={ri}
                      initial={{ opacity: 0, x: -5 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: ri * 0.04 }}
                      onClick={() => onLoadRequest(req)}
                      className="w-full flex items-center gap-3 px-5 py-2.5 hover:bg-white/5 transition-colors border-b border-white/5 last:border-0"
                    >
                      <MethodBadge method={req.method} size="xs" />
                      <span className="flex-1 text-left text-xs text-slate-300">{req.label}</span>
                      <span className="text-[10px] font-mono text-slate-600 hidden sm:block">{req.url}</span>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      {/* OpenAPI hint */}
      <div className="p-4 rounded-xl bg-blue-500/5 border border-blue-500/20">
        <div className="flex items-start gap-3">
          <BookOpen className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-white mb-1">OpenAPI 3.0 Specification</p>
            <p className="text-xs text-slate-400 leading-relaxed">
              All Nexus Enterprise API endpoints follow OpenAPI 3.0 spec. Versioned under <code className="font-mono text-cyan-400">/api/v1</code>. Response envelope:
              <code className="font-mono text-slate-300 text-[10px] block mt-1 bg-[#131b2f] p-2 rounded">
                {'{ "success": bool, "message": string, "data": T, "meta": {}, "errors": [] }'}
              </code>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ── TAB 3: Rate Limits ── */
const RATE_LIMIT_BUCKETS = [
  { id: 'users',   label: '/api/v1/users',       limit: 1000, used: 347, window: '1 hour',  color: 'cyan'   },
  { id: 'auth',    label: '/api/v1/auth/*',       limit: 60,   used: 12,  window: '1 min',   color: 'red'    },
  { id: 'depts',   label: '/api/v1/departments',  limit: 500,  used: 89,  window: '1 hour',  color: 'purple' },
  { id: 'health',  label: '/api/v1/health',       limit: 600,  used: 600, window: '1 hour',  color: 'amber'  },
  { id: 'global',  label: 'Global (All routes)',   limit: 5000, used: 1048,window: '24 hours',color: 'blue'   },
];

const colorMap = {
  cyan:   { bar: 'from-cyan-500 to-cyan-400',     text: 'text-cyan-400',   badge: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20' },
  red:    { bar: 'from-red-500 to-red-400',       text: 'text-red-400',    badge: 'bg-red-500/10 text-red-400 border-red-500/20' },
  purple: { bar: 'from-purple-500 to-purple-400', text: 'text-purple-400', badge: 'bg-purple-500/10 text-purple-400 border-purple-500/20' },
  amber:  { bar: 'from-amber-500 to-amber-400',   text: 'text-amber-400',  badge: 'bg-amber-500/10 text-amber-400 border-amber-500/20' },
  blue:   { bar: 'from-blue-500 to-blue-400',     text: 'text-blue-400',   badge: 'bg-blue-500/10 text-blue-400 border-blue-500/20' },
};

const RateLimitGauge = ({ bucket, onBurst }) => {
  const pct = Math.min((bucket.used / bucket.limit) * 100, 100);
  const isThrottled = pct >= 100;
  const isWarning   = pct >= 80;
  const c = colorMap[bucket.color];

  return (
    <div className="bg-[#0a0f1e] rounded-xl border border-white/10 p-4 space-y-3 hover:border-white/20 transition-colors">
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="text-xs font-mono text-slate-300 font-medium">{bucket.label}</p>
          <p className="text-[10px] text-slate-500 mt-0.5">Window: {bucket.window}</p>
        </div>
        <span className={`text-[10px] px-2 py-0.5 rounded-full border flex-shrink-0 ${
          isThrottled ? 'bg-red-500/10 text-red-400 border-red-500/30' :
          isWarning   ? 'bg-amber-500/10 text-amber-400 border-amber-500/30' :
          c.badge
        }`}>
          {isThrottled ? 'THROTTLED' : isWarning ? 'WARNING' : 'OK'}
        </span>
      </div>

      {/* Gauge bar */}
      <div>
        <div className="flex justify-between text-[10px] font-mono text-slate-500 mb-1.5">
          <span>{bucket.used.toLocaleString()} used</span>
          <span>{bucket.limit.toLocaleString()} limit</span>
        </div>
        <div className="h-3 rounded-full bg-white/5 overflow-hidden">
          <motion.div
            className={`h-full rounded-full bg-gradient-to-r ${
              isThrottled ? 'from-red-600 to-red-400' :
              isWarning   ? 'from-amber-500 to-amber-400' :
              c.bar
            }`}
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 1, ease: 'easeOut', delay: 0.1 }}
          />
        </div>
        <div className="flex justify-between items-center mt-1.5">
          <span className={`text-[10px] font-mono font-semibold ${
            isThrottled ? 'text-red-400' : isWarning ? 'text-amber-400' : c.text
          }`}>{pct.toFixed(0)}% consumed</span>
          <span className="text-[10px] text-slate-600 font-mono">{(bucket.limit - bucket.used).toLocaleString()} remaining</span>
        </div>
      </div>

      {isThrottled && (
        <div className="flex items-center gap-2 p-2 rounded-lg bg-red-500/10 border border-red-500/20">
          <AlertTriangle className="w-3.5 h-3.5 text-red-400 flex-shrink-0" />
          <p className="text-[10px] text-red-400">Rate limit exceeded. Retry after window resets.</p>
        </div>
      )}
    </div>
  );
};

const RateLimitsPanel = () => {
  const [buckets, setBuckets] = useState(RATE_LIMIT_BUCKETS);
  const [bursting, setBursting] = useState(false);
  const [burstTarget, setBurstTarget] = useState('users');

  const handleBurst = async () => {
    setBursting(true);
    const steps = 12;
    for (let i = 0; i < steps; i++) {
      await new Promise(r => setTimeout(r, 100));
      setBuckets(prev => prev.map(b => {
        if (b.id === burstTarget) {
          return { ...b, used: Math.min(b.used + Math.floor(b.limit / steps), b.limit) };
        }
        if (b.id === 'global') {
          return { ...b, used: Math.min(b.used + Math.floor(50), b.limit) };
        }
        return b;
      }));
    }
    setBursting(false);
  };

  const handleReset = () => setBuckets(RATE_LIMIT_BUCKETS);

  const globalBucket = buckets.find(b => b.id === 'global');
  const globalPct = Math.min((globalBucket.used / globalBucket.limit) * 100, 100);

  return (
    <div className="p-4 sm:p-6 space-y-5">
      {/* Header */}
      <div className="flex flex-wrap items-center gap-3">
        <p className="text-xs font-mono text-blue-400/80 uppercase tracking-wider flex items-center gap-2">
          <Gauge className="w-3.5 h-3.5" /> Rate Limit Monitor
        </p>
        <div className="ml-auto flex items-center gap-2 flex-wrap">
          <select
            value={burstTarget}
            onChange={e => setBurstTarget(e.target.value)}
            className="text-xs font-mono bg-[#131b2f] border border-white/10 rounded-lg px-2.5 py-1.5 text-slate-300 focus:outline-none focus:border-cyan-500/50"
          >
            {buckets.filter(b => b.id !== 'global').map(b => (
              <option key={b.id} value={b.id}>{b.id}</option>
            ))}
          </select>
          <button
            onClick={handleBurst}
            disabled={bursting}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {bursting ? <><RefreshCw className="w-3 h-3 animate-spin" /> Bursting...</> : <><Zap className="w-3 h-3" /> Simulate Burst</>}
          </button>
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border border-white/10 text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Global meter */}
      <div className="rounded-xl border border-blue-500/20 bg-blue-500/5 p-4 space-y-2">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold text-white">Global Request Budget</p>
          <span className="text-xs font-mono text-blue-400">{globalBucket.used.toLocaleString()} / {globalBucket.limit.toLocaleString()} req / 24h</span>
        </div>
        <div className="h-4 rounded-full bg-white/5 overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-blue-600 via-blue-400 to-cyan-400"
            animate={{ width: `${globalPct}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
        <div className="flex justify-between text-[10px] font-mono text-slate-500">
          <span>{globalPct.toFixed(1)}% consumed</span>
          <span>Resets in 14h 22m</span>
        </div>
      </div>

      {/* Per-endpoint gauges */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {buckets.filter(b => b.id !== 'global').map(bucket => (
          <RateLimitGauge key={bucket.id} bucket={bucket} />
        ))}
      </div>

      {/* Headers spec */}
      <div className="rounded-xl border border-white/10 bg-[#0a0f1e] overflow-hidden">
        <div className="px-4 py-3 border-b border-white/8 flex items-center gap-2">
          <Code2 className="w-4 h-4 text-slate-400" />
          <p className="text-xs font-semibold text-white">Response Headers — Rate Limit Info</p>
        </div>
        <div className="p-4 space-y-1.5">
          {[
            ['X-RateLimit-Limit',      '1000'],
            ['X-RateLimit-Remaining',  '653'],
            ['X-RateLimit-Reset',      '1719745200 (Unix)'],
            ['Retry-After',            '3600 (when throttled)'],
            ['X-RateLimit-Policy',     'sliding-window'],
          ].map(([k, v]) => (
            <div key={k} className="flex gap-3">
              <span className="text-[11px] font-mono text-cyan-400 w-52 flex-shrink-0">{k}:</span>
              <span className="text-[11px] font-mono text-slate-300">{v}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────── */
const APIExplorerDemo = () => {
  const [tab, setTab] = useState('explorer');
  const [pendingRequest, setPendingRequest] = useState(null);

  const handleLoadRequest = (req) => {
    setPendingRequest(req);
    setTab('explorer');
  };

  const TABS = [
    { id: 'explorer',    label: 'API Explorer', icon: Send },
    { id: 'collections', label: 'Collections',  icon: Folder },
    { id: 'ratelimits',  label: 'Rate Limits',  icon: Gauge },
  ];

  return (
    <div className="flex flex-col min-h-full">
      {/* Tab bar */}
      <div className="sticky top-0 z-20 flex items-center gap-2 px-4 sm:px-6 py-3 border-b border-white/10 bg-[#0a0f1e]/90 backdrop-blur-xl overflow-x-auto scrollbar-hide">
        {TABS.map(t => (
          <TabButton key={t.id} active={tab === t.id} onClick={() => setTab(t.id)} icon={t.icon}>
            {t.label}
          </TabButton>
        ))}
        <div className="ml-auto flex-shrink-0 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          <span className="text-[10px] font-mono text-slate-600">v1 · REST · JSON</span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="h-full"
          >
            {tab === 'explorer'    && <APIExplorer initialRequest={pendingRequest} />}
            {tab === 'collections' && <Collections onLoadRequest={handleLoadRequest} />}
            {tab === 'ratelimits'  && <RateLimitsPanel />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default APIExplorerDemo;
