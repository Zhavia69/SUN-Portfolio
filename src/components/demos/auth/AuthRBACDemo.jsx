import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Shield, Lock, User, Key, Eye, EyeOff, CheckCircle2, XCircle,
  Activity, AlertTriangle, LogOut, RefreshCw, Clock, Monitor,
  Smartphone, Globe, ChevronRight, Users, Settings, FileText,
  BarChart3, Trash2, Edit3, Download, Upload, Check, X, Wifi, MapPin,
} from 'lucide-react';

/* ─────────────────────────────────────────────
   MOCK DATA — Kenyan Enterprise Context
───────────────────────────────────────────── */
const ROLES = [
  { id: 'super_admin', label: 'Super Admin', color: 'from-red-500 to-pink-500', badge: 'bg-red-500/10 text-red-400 border-red-500/20' },
  { id: 'admin', label: 'Administrator', color: 'from-orange-500 to-amber-500', badge: 'bg-orange-500/10 text-orange-400 border-orange-500/20' },
  { id: 'manager', label: 'Department Manager', color: 'from-blue-500 to-cyan-500', badge: 'bg-blue-500/10 text-blue-400 border-blue-500/20' },
  { id: 'hr', label: 'HR Officer', color: 'from-purple-500 to-indigo-500', badge: 'bg-purple-500/10 text-purple-400 border-purple-500/20' },
  { id: 'employee', label: 'Employee', color: 'from-green-500 to-emerald-500', badge: 'bg-green-500/10 text-green-400 border-green-500/20' },
  { id: 'guest', label: 'Guest', color: 'from-slate-500 to-slate-600', badge: 'bg-slate-500/10 text-slate-400 border-slate-500/20' },
];

const USERS_DB = {
  super_admin: { email: 'mwangi.ndungu@nexus.co.ke', password: 'Admin@2024', name: 'Mwangi Ndung\'u', dept: 'Executive', avatar: 'MN' },
  admin:       { email: 'wanjiku.kamau@nexus.co.ke', password: 'Admin@2024', name: 'Wanjiku Kamau', dept: 'ICT', avatar: 'WK' },
  manager:     { email: 'otieno.omondi@nexus.co.ke', password: 'Demo@2024', name: 'Otieno Omondi', dept: 'Operations', avatar: 'OO' },
  hr:          { email: 'achieng.wangari@nexus.co.ke', password: 'Demo@2024', name: 'Achieng Wangari', dept: 'Human Resources', avatar: 'AW' },
  employee:    { email: 'kiberu.njoroge@nexus.co.ke', password: 'Demo@2024', name: 'Kiberu Njoroge', dept: 'Finance', avatar: 'KN' },
  guest:       { email: 'guest@nexus.co.ke', password: 'guest123', name: 'Guest User', dept: 'N/A', avatar: 'GU' },
};

const PERMISSIONS = [
  { id: 'create', label: 'Create', icon: '✦' },
  { id: 'read',   label: 'Read',   icon: '◉' },
  { id: 'update', label: 'Update', icon: '✎' },
  { id: 'delete', label: 'Delete', icon: '⌫' },
  { id: 'export', label: 'Export', icon: '↗' },
  { id: 'manage', label: 'Manage', icon: '⚙' },
  { id: 'approve',label: 'Approve',icon: '✔' },
  { id: 'assign', label: 'Assign', icon: '⇒' },
];

const PERMISSION_MATRIX = {
  super_admin: { create: true,  read: true,  update: true,  delete: true,  export: true,  manage: true,  approve: true,  assign: true  },
  admin:       { create: true,  read: true,  update: true,  delete: true,  export: true,  manage: true,  approve: true,  assign: true  },
  manager:     { create: true,  read: true,  update: true,  delete: false, export: true,  manage: false, approve: true,  assign: true  },
  hr:          { create: true,  read: true,  update: true,  delete: false, export: true,  manage: false, approve: false, assign: false },
  employee:    { create: false, read: true,  update: false, delete: false, export: false, manage: false, approve: false, assign: false },
  guest:       { create: false, read: true,  update: false, delete: false, export: false, manage: false, approve: false, assign: false },
};

const MODULES = ['Users', 'Projects', 'Employees', 'Reports', 'Settings', 'Audit Logs'];

const generateAuditEvent = () => {
  const actions = [
    { type: 'LOGIN_SUCCESS', icon: CheckCircle2, color: 'text-green-400', bg: 'bg-green-500/10' },
    { type: 'LOGIN_FAILED',  icon: XCircle,      color: 'text-red-400',   bg: 'bg-red-500/10'   },
    { type: 'PERMISSION_DENIED', icon: Shield, color: 'text-amber-400', bg: 'bg-amber-500/10' },
    { type: 'PASSWORD_CHANGED',  icon: Key,    color: 'text-blue-400',  bg: 'bg-blue-500/10'  },
    { type: 'LOGOUT',            icon: LogOut, color: 'text-slate-400', bg: 'bg-slate-500/10' },
    { type: 'TOKEN_REFRESHED',   icon: RefreshCw, color: 'text-cyan-400', bg: 'bg-cyan-500/10' },
  ];
  const users = ['wanjiku.kamau', 'otieno.omondi', 'achieng.wangari', 'kiberu.njoroge', 'mwangi.ndungu'];
  const ips = ['41.212.46.', '197.237.128.', '105.163.64.', '154.123.45.'];
  const devices = ['Chrome 124 / Windows', 'Safari 17 / macOS', 'Firefox 123 / Linux', 'Chrome 124 / Android'];

  const action = actions[Math.floor(Math.random() * actions.length)];
  const user = users[Math.floor(Math.random() * users.length)];
  const ip = ips[Math.floor(Math.random() * ips.length)] + Math.floor(Math.random() * 254 + 1);
  const device = devices[Math.floor(Math.random() * devices.length)];

  return {
    id: Date.now() + Math.random(),
    type: action.type,
    icon: action.icon,
    color: action.color,
    bg: action.bg,
    user: user + '@nexus.co.ke',
    ip,
    device,
    time: new Date().toLocaleTimeString('en-KE', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
    module: MODULES[Math.floor(Math.random() * MODULES.length)],
  };
};

/* ─────────────────────────────────────────────
   JWT GENERATOR
───────────────────────────────────────────── */
const buildJWT = (roleId, userData) => {
  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).replace(/=/g, '');
  const payload = btoa(JSON.stringify({
    sub: `usr_${Math.random().toString(36).substr(2, 9)}`,
    name: userData.name,
    email: userData.email,
    role: roleId,
    dept: userData.dept,
    permissions: Object.entries(PERMISSION_MATRIX[roleId])
      .filter(([, v]) => v).map(([k]) => k),
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 3600,
    iss: 'nexus-enterprise-platform',
    aud: 'nexus-api',
  })).replace(/=/g, '');
  const sig = btoa('nexus-secret-signing-key-sha256').replace(/=/g, '').slice(0, 43);
  return { raw: `${header}.${payload}.${sig}`, header, payload, sig };
};

/* ─────────────────────────────────────────────
   SUB-COMPONENTS
───────────────────────────────────────────── */
const TabButton = ({ active, onClick, children, icon: Icon }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 whitespace-nowrap ${
      active
        ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg shadow-red-500/20'
        : 'text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10'
    }`}
  >
    {Icon && <Icon className="w-3.5 h-3.5 flex-shrink-0" />}
    <span className="hidden sm:inline">{children}</span>
    <span className="sm:hidden">{children.split(' ')[0]}</span>
  </button>
);

/* ── TAB 1: Login Simulator ── */
const LoginSimulator = () => {
  const [selectedRole, setSelectedRole] = useState('admin');
  const [email, setEmail] = useState(USERS_DB.admin.email);
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [loginState, setLoginState] = useState('idle'); // idle | loading | success | failed | locked
  const [failCount, setFailCount] = useState(0);
  const [jwt, setJwt] = useState(null);
  const [activeJwtTab, setActiveJwtTab] = useState('payload');

  const handleRoleChange = (roleId) => {
    setSelectedRole(roleId);
    setEmail(USERS_DB[roleId].email);
    setPassword('');
    setLoginState('idle');
    setJwt(null);
    setFailCount(0);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (failCount >= 3) { setLoginState('locked'); return; }
    setLoginState('loading');
    await new Promise(r => setTimeout(r, 1200));

    const correctPw = USERS_DB[selectedRole].password;
    if (password === correctPw || password === 'Demo@2024' || password === 'Admin@2024') {
      const token = buildJWT(selectedRole, USERS_DB[selectedRole]);
      setJwt(token);
      setLoginState('success');
      setFailCount(0);
    } else {
      const newCount = failCount + 1;
      setFailCount(newCount);
      setLoginState(newCount >= 3 ? 'locked' : 'failed');
    }
  };

  const reset = () => { setLoginState('idle'); setJwt(null); setPassword(''); setFailCount(0); };

  const role = ROLES.find(r => r.id === selectedRole);
  const user = USERS_DB[selectedRole];

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 p-4 sm:p-6">
      {/* Left: Login Form */}
      <div className="space-y-5">
        {/* Role Selector */}
        <div>
          <p className="text-xs font-mono text-red-400/80 uppercase tracking-wider mb-3">Select Role</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {ROLES.map(r => (
              <button
                key={r.id}
                onClick={() => handleRoleChange(r.id)}
                className={`px-3 py-2 rounded-lg text-xs font-medium border transition-all duration-200 ${
                  selectedRole === r.id
                    ? `bg-gradient-to-r ${r.color} text-white border-transparent shadow-lg`
                    : 'border-white/10 text-slate-400 hover:text-white bg-white/5 hover:bg-white/10'
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>
        </div>

        {/* Form */}
        <div className="bg-[#0a0f1e] rounded-xl border border-white/10 overflow-hidden">
          {/* Chrome */}
          <div className="flex items-center gap-2 px-4 py-3 bg-[#131b2f] border-b border-white/10">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
            </div>
            <div className="flex-1 mx-2 px-3 py-1 rounded bg-black/30 border border-white/5 text-[10px] text-slate-500 font-mono text-center truncate">
              nexus.co.ke/auth/login
            </div>
          </div>

          <form onSubmit={handleLogin} className="p-5 space-y-4">
            {/* Header */}
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${role.color} flex items-center justify-center text-sm font-bold text-white`}>
                {user.avatar}
              </div>
              <div>
                <p className="text-white font-semibold text-sm">{user.name}</p>
                <span className={`text-[10px] px-2 py-0.5 rounded-full border ${role.badge}`}>{role.label}</span>
              </div>
            </div>

            <div>
              <label className="block text-xs text-slate-400 mb-1.5 font-mono">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full px-3 py-2.5 bg-[#131b2f] border border-white/10 rounded-lg text-sm text-slate-300 font-mono focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20"
              />
            </div>

            <div>
              <label className="block text-xs text-slate-400 mb-1.5 font-mono">Password</label>
              <div className="relative">
                <input
                  type={showPw ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder={`Try: ${user.password}`}
                  className="w-full px-3 py-2.5 pr-10 bg-[#131b2f] border border-white/10 rounded-lg text-sm text-slate-300 font-mono focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20"
                />
                <button type="button" onClick={() => setShowPw(v => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300">
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* State alerts */}
            <AnimatePresence mode="wait">
              {loginState === 'failed' && (
                <motion.div key="fail" initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs">
                  <XCircle className="w-4 h-4 flex-shrink-0" />
                  Invalid credentials. {3 - failCount} attempt{3 - failCount !== 1 ? 's' : ''} remaining.
                </motion.div>
              )}
              {loginState === 'locked' && (
                <motion.div key="locked" initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs">
                  <Lock className="w-4 h-4 flex-shrink-0" />
                  Account locked after 3 failed attempts. Contact your administrator.
                </motion.div>
              )}
            </AnimatePresence>

            {loginState === 'success' || loginState === 'locked' ? (
              <button type="button" onClick={reset}
                className="w-full py-2.5 rounded-lg text-sm font-semibold border border-white/10 text-slate-300 bg-white/5 hover:bg-white/10 transition-colors flex items-center justify-center gap-2">
                <RefreshCw className="w-4 h-4" /> Reset Session
              </button>
            ) : (
              <motion.button
                type="submit"
                disabled={loginState === 'loading' || loginState === 'locked' || !password}
                whileTap={{ scale: 0.98 }}
                className={`w-full py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-2 ${
                  loginState === 'loading'
                    ? 'bg-[#131b2f] border border-white/10 text-slate-400'
                    : `bg-gradient-to-r ${role.color} text-white hover:opacity-90 shadow-lg`
                } disabled:opacity-50`}
              >
                {loginState === 'loading' ? (
                  <><div className="w-4 h-4 border-2 border-slate-500 border-t-white rounded-full animate-spin" />Authenticating...</>
                ) : (
                  <><Key className="w-4 h-4" />Sign In as {role.label}</>
                )}
              </motion.button>
            )}
          </form>
        </div>

        {/* Fail counter */}
        {failCount > 0 && failCount < 3 && (
          <div className="flex gap-1">
            {[0,1,2].map(i => (
              <div key={i} className={`flex-1 h-1 rounded-full ${i < failCount ? 'bg-red-500' : 'bg-white/10'}`} />
            ))}
          </div>
        )}
      </div>

      {/* Right: JWT Viewer */}
      <div className="space-y-4">
        <p className="text-xs font-mono text-red-400/80 uppercase tracking-wider">JWT Token Inspector</p>

        {!jwt ? (
          <div className="h-full min-h-[300px] flex flex-col items-center justify-center bg-[#0a0f1e] rounded-xl border border-white/10 border-dashed gap-3">
            <Key className="w-10 h-10 text-slate-700" />
            <p className="text-slate-600 text-sm">Log in to generate a JWT token</p>
          </div>
        ) : (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
            {/* Token display */}
            <div className="bg-[#0a0f1e] rounded-xl border border-white/10 p-4 overflow-hidden">
              <p className="text-[10px] font-mono text-slate-500 mb-2">Encoded Token</p>
              <p className="text-[10px] font-mono break-all leading-relaxed">
                <span className="text-red-400">{jwt.header}</span>
                <span className="text-slate-600">.</span>
                <span className="text-purple-400">{jwt.payload.slice(0, 40)}...</span>
                <span className="text-slate-600">.</span>
                <span className="text-cyan-400">{jwt.sig.slice(0, 20)}...</span>
              </p>
            </div>

            {/* Decoded tabs */}
            <div className="bg-[#0a0f1e] rounded-xl border border-white/10 overflow-hidden">
              <div className="flex border-b border-white/10">
                {['header','payload','verify'].map(t => (
                  <button key={t} onClick={() => setActiveJwtTab(t)}
                    className={`flex-1 py-2 text-xs font-mono capitalize transition-colors ${
                      activeJwtTab === t ? 'text-white bg-white/5 border-b border-cyan-500' : 'text-slate-500 hover:text-slate-300'
                    }`}>
                    {t}
                  </button>
                ))}
              </div>
              <div className="p-4">
                <AnimatePresence mode="wait">
                  {activeJwtTab === 'header' && (
                    <motion.pre key="h" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      className="text-[11px] font-mono text-slate-300 leading-relaxed">
                      {JSON.stringify({ alg: 'HS256', typ: 'JWT' }, null, 2)}
                    </motion.pre>
                  )}
                  {activeJwtTab === 'payload' && (
                    <motion.div key="p" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      {[
                        { k: 'sub',  v: `usr_${jwt.sig.slice(0,8)}`,            color: 'text-cyan-400' },
                        { k: 'name', v: user.name,                               color: 'text-white' },
                        { k: 'role', v: selectedRole,                            color: 'text-purple-400' },
                        { k: 'dept', v: user.dept,                               color: 'text-slate-300' },
                        { k: 'perms',v: Object.entries(PERMISSION_MATRIX[selectedRole]).filter(([,v])=>v).map(([k])=>k).join(', '), color: 'text-green-400' },
                        { k: 'exp',  v: new Date(Date.now()+3600000).toLocaleTimeString(), color: 'text-amber-400' },
                        { k: 'iss',  v: 'nexus-enterprise-platform',            color: 'text-slate-400' },
                      ].map(({k,v,color}) => (
                        <div key={k} className="flex items-start gap-2 py-0.5">
                          <span className="text-[11px] font-mono text-slate-500 w-16 flex-shrink-0">{k}:</span>
                          <span className={`text-[11px] font-mono ${color} break-all`}>&quot;{v}&quot;</span>
                        </div>
                      ))}
                    </motion.div>
                  )}
                  {activeJwtTab === 'verify' && (
                    <motion.div key="v" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-2">
                      {[
                        { label: 'Signature Valid', ok: true },
                        { label: 'Not Expired', ok: true },
                        { label: 'Issuer Verified', ok: true },
                        { label: 'Algorithm: HS256', ok: true },
                      ].map(({label, ok}) => (
                        <div key={label} className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0" />
                          <span className="text-xs text-slate-300 font-mono">{label}</span>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* User context */}
            <div className={`p-3 rounded-lg bg-gradient-to-r ${role.color} bg-opacity-10 border border-white/10`}>
              <p className="text-xs text-slate-300">
                <span className="font-semibold text-white">{user.name}</span> authenticated as{' '}
                <span className={`font-mono`}>{role.label}</span> • Expires in 1 hour
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

/* ── TAB 2: Permission Matrix ── */
const PermissionMatrix = () => {
  const [hoveredCell, setHoveredCell] = useState(null);
  const [selectedRole, setSelectedRole] = useState(null);

  return (
    <div className="p-4 sm:p-6 space-y-5">
      <div className="flex flex-wrap items-center gap-3">
        <p className="text-xs font-mono text-red-400/80 uppercase tracking-wider">Role × Permission Matrix</p>
        <div className="flex gap-2 ml-auto">
          <span className="flex items-center gap-1 text-xs text-slate-500"><span className="w-3 h-3 rounded bg-green-500/20 border border-green-500/40 inline-block" />Granted</span>
          <span className="flex items-center gap-1 text-xs text-slate-500"><span className="w-3 h-3 rounded bg-red-500/10 border border-red-500/20 inline-block" />Denied</span>
        </div>
      </div>

      {/* Role filter */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setSelectedRole(null)}
          className={`px-3 py-1 rounded-full text-xs font-mono border transition-colors ${!selectedRole ? 'bg-white/10 text-white border-white/20' : 'text-slate-500 border-white/10 hover:text-slate-300'}`}
        >All Roles</button>
        {ROLES.map(r => (
          <button key={r.id} onClick={() => setSelectedRole(r.id === selectedRole ? null : r.id)}
            className={`px-3 py-1 rounded-full text-xs font-mono border transition-all ${selectedRole === r.id ? `bg-gradient-to-r ${r.color} text-white border-transparent` : 'text-slate-500 border-white/10 hover:text-slate-300'}`}>
            {r.label}
          </button>
        ))}
      </div>

      {/* Matrix table */}
      <div className="overflow-x-auto rounded-xl border border-white/10">
        <table className="w-full min-w-[640px] border-collapse">
          <thead>
            <tr className="border-b border-white/10 bg-[#0a0f1e]">
              <th className="text-left px-4 py-3 text-xs font-mono text-slate-500 uppercase tracking-wider w-40">Role</th>
              {PERMISSIONS.map(p => (
                <th key={p.id} className="px-3 py-3 text-center text-xs font-mono text-slate-500 uppercase tracking-wider">
                  <div className="flex flex-col items-center gap-0.5">
                    <span className="text-slate-400">{p.icon}</span>
                    <span>{p.label}</span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ROLES.filter(r => !selectedRole || r.id === selectedRole).map((role, ri) => (
              <motion.tr
                key={role.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: ri * 0.05 }}
                className="border-b border-white/5 hover:bg-white/[0.02] transition-colors"
              >
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${role.color} flex-shrink-0`} />
                    <span className="text-xs font-medium text-slate-300 whitespace-nowrap">{role.label}</span>
                  </div>
                </td>
                {PERMISSIONS.map(perm => {
                  const granted = PERMISSION_MATRIX[role.id][perm.id];
                  const cellId = `${role.id}-${perm.id}`;
                  return (
                    <td key={perm.id} className="px-3 py-3 text-center">
                      <motion.div
                        onHoverStart={() => setHoveredCell(cellId)}
                        onHoverEnd={() => setHoveredCell(null)}
                        whileHover={{ scale: 1.2 }}
                        className={`mx-auto w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-200 ${
                          granted
                            ? 'bg-green-500/20 border border-green-500/40 text-green-400'
                            : 'bg-red-500/10 border border-red-500/20 text-red-400/50'
                        } ${hoveredCell === cellId ? 'scale-110 ring-1 ring-white/20' : ''}`}
                      >
                        {granted ? <Check className="w-3.5 h-3.5" /> : <X className="w-3 h-3" />}
                      </motion.div>
                    </td>
                  );
                })}
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-2">
        {ROLES.map(role => {
          const granted = Object.values(PERMISSION_MATRIX[role.id]).filter(Boolean).length;
          return (
            <motion.div key={role.id} whileHover={{ y: -3 }}
              className="bg-[#0a0f1e] rounded-lg border border-white/10 p-3 text-center">
              <div className={`text-lg font-bold bg-gradient-to-r ${role.color} bg-clip-text text-transparent`}>{granted}/{PERMISSIONS.length}</div>
              <div className="text-[10px] text-slate-500 mt-0.5 font-mono truncate">{role.label}</div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

/* ── TAB 3: Audit Log ── */
const AuditLog = () => {
  const [events, setEvents] = useState(() => Array.from({ length: 8 }, generateAuditEvent));
  const [paused, setPaused] = useState(false);
  const [filter, setFilter] = useState('ALL');

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      setEvents(prev => [generateAuditEvent(), ...prev.slice(0, 19)]);
    }, 2200);
    return () => clearInterval(id);
  }, [paused]);

  const FILTERS = ['ALL', 'LOGIN_SUCCESS', 'LOGIN_FAILED', 'PERMISSION_DENIED', 'LOGOUT'];
  const filtered = filter === 'ALL' ? events : events.filter(e => e.type === filter);

  return (
    <div className="p-4 sm:p-6 space-y-4">
      {/* Controls */}
      <div className="flex flex-wrap items-center gap-3">
        <p className="text-xs font-mono text-red-400/80 uppercase tracking-wider flex items-center gap-2">
          <Activity className="w-3.5 h-3.5" /> Live Security Audit Log
          {!paused && <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse inline-block" />}
        </p>
        <div className="ml-auto flex gap-2">
          <button onClick={() => setPaused(v => !v)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${paused ? 'bg-green-500/10 border-green-500/20 text-green-400' : 'bg-amber-500/10 border-amber-500/20 text-amber-400'}`}>
            {paused ? '▶ Resume' : '⏸ Pause'}
          </button>
          <button onClick={() => setEvents([])}
            className="px-3 py-1.5 rounded-lg text-xs font-medium border border-white/10 text-slate-400 hover:text-slate-300">
            Clear
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {FILTERS.map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-2.5 py-1 rounded text-[10px] font-mono border transition-colors ${filter === f ? 'bg-white/10 text-white border-white/20' : 'text-slate-500 border-white/10 hover:text-slate-300'}`}>
            {f}
          </button>
        ))}
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Total Events', value: events.length, color: 'text-white' },
          { label: 'Successful Logins', value: events.filter(e=>e.type==='LOGIN_SUCCESS').length, color: 'text-green-400' },
          { label: 'Failed Logins', value: events.filter(e=>e.type==='LOGIN_FAILED').length, color: 'text-red-400' },
          { label: 'Denied Access', value: events.filter(e=>e.type==='PERMISSION_DENIED').length, color: 'text-amber-400' },
        ].map(({label, value, color}) => (
          <div key={label} className="bg-[#0a0f1e] rounded-lg border border-white/10 p-3">
            <p className={`text-xl font-bold font-mono ${color}`}>{value}</p>
            <p className="text-[10px] text-slate-500 mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      {/* Event feed */}
      <div className="bg-[#0a0f1e] rounded-xl border border-white/10 overflow-hidden max-h-[340px] overflow-y-auto">
        <div className="sticky top-0 grid grid-cols-12 px-4 py-2 bg-[#131b2f] border-b border-white/10 text-[10px] font-mono text-slate-500 uppercase tracking-wider">
          <span className="col-span-3">User</span>
          <span className="col-span-3 hidden sm:block">Event</span>
          <span className="col-span-3 hidden md:block">IP / Device</span>
          <span className="col-span-2 hidden sm:block">Module</span>
          <span className="col-span-3 sm:col-span-1 text-right">Time</span>
        </div>
        <AnimatePresence initial={false}>
          {filtered.map((evt) => {
            const Icon = evt.icon;
            return (
              <motion.div
                key={evt.id}
                initial={{ opacity: 0, y: -8, backgroundColor: 'rgba(255,255,255,0.05)' }}
                animate={{ opacity: 1, y: 0, backgroundColor: 'transparent' }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-12 px-4 py-2.5 border-b border-white/5 hover:bg-white/[0.02] transition-colors items-center"
              >
                <div className="col-span-3 flex items-center gap-2 min-w-0">
                  <div className={`flex-shrink-0 w-6 h-6 rounded-md ${evt.bg} flex items-center justify-center`}>
                    <Icon className={`w-3 h-3 ${evt.color}`} />
                  </div>
                  <span className="text-[11px] text-slate-300 font-mono truncate hidden sm:block">{evt.user.split('@')[0]}</span>
                </div>
                <div className="col-span-3 hidden sm:block">
                  <span className={`text-[10px] font-mono ${evt.color}`}>{evt.type}</span>
                </div>
                <div className="col-span-3 hidden md:block">
                  <p className="text-[10px] text-slate-500 font-mono">{evt.ip}</p>
                  <p className="text-[10px] text-slate-600 truncate">{evt.device}</p>
                </div>
                <div className="col-span-2 hidden sm:block">
                  <span className="text-[10px] text-slate-500 font-mono">{evt.module}</span>
                </div>
                <div className="col-span-3 sm:col-span-1 text-right">
                  <span className="text-[10px] text-slate-600 font-mono">{evt.time}</span>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-slate-600">
            <Activity className="w-8 h-8 mb-2" />
            <p className="text-sm">No events match this filter</p>
          </div>
        )}
      </div>
    </div>
  );
};

/* ── TAB 4: Session Manager ── */
const INITIAL_SESSIONS = [
  {
    id: 'sess_001', user: 'Wanjiku Kamau', role: 'Administrator',
    device: 'Chrome 124', os: 'Windows 11', icon: Monitor,
    ip: '41.212.46.88', location: 'Nairobi, Kenya',
    started: '2 hours ago', lastActive: '1 min ago', current: true,
    badge: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  },
  {
    id: 'sess_002', user: 'Otieno Omondi', role: 'Dept. Manager',
    device: 'Safari 17', os: 'macOS 14', icon: Monitor,
    ip: '197.237.128.12', location: 'Mombasa, Kenya',
    started: '5 hours ago', lastActive: '12 min ago', current: false,
    badge: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  },
  {
    id: 'sess_003', user: 'Achieng Wangari', role: 'HR Officer',
    device: 'Chrome 124', os: 'Android 14', icon: Smartphone,
    ip: '105.163.64.44', location: 'Kisumu, Kenya',
    started: '1 day ago', lastActive: '3 hours ago', current: false,
    badge: 'bg-green-500/10 text-green-400 border-green-500/20',
  },
  {
    id: 'sess_004', user: 'Kiberu Njoroge', role: 'Employee',
    device: 'Firefox 123', os: 'Ubuntu 22.04', icon: Monitor,
    ip: '154.123.45.200', location: 'Eldoret, Kenya',
    started: '3 days ago', lastActive: '2 days ago', current: false,
    badge: 'bg-slate-500/10 text-slate-400 border-slate-500/20',
  },
  {
    id: 'sess_005', user: 'Mwangi Ndung\'u', role: 'Super Admin',
    device: 'Edge 122', os: 'Windows 11', icon: Monitor,
    ip: '41.212.91.3', location: 'Nairobi, Kenya',
    started: '6 hours ago', lastActive: '5 min ago', current: false,
    badge: 'bg-red-500/10 text-red-400 border-red-500/20',
  },
];

const SessionManager = () => {
  const [sessions, setSessions] = useState(INITIAL_SESSIONS);
  const [revoking, setRevoking] = useState(null);
  const [revokedAll, setRevokedAll] = useState(false);

  const handleRevoke = async (id) => {
    setRevoking(id);
    await new Promise(r => setTimeout(r, 800));
    setSessions(prev => prev.filter(s => s.id !== id));
    setRevoking(null);
  };

  const handleRevokeAll = async () => {
    const others = sessions.filter(s => !s.current);
    for (const s of others) {
      setRevoking(s.id);
      await new Promise(r => setTimeout(r, 400));
      setSessions(prev => prev.filter(x => x.id !== s.id));
    }
    setRevoking(null);
    setRevokedAll(true);
  };

  const activeSessions = sessions.filter(s => !s.current);
  const currentSession = sessions.find(s => s.current);

  return (
    <div className="p-4 sm:p-6 space-y-5">
      {/* Header */}
      <div className="flex flex-wrap items-center gap-3">
        <p className="text-xs font-mono text-red-400/80 uppercase tracking-wider flex items-center gap-2">
          <Wifi className="w-3.5 h-3.5" /> Active Sessions
        </p>
        <div className="ml-auto flex items-center gap-2">
          <span className="text-xs text-slate-500 font-mono">{sessions.length} active</span>
          {activeSessions.length > 0 && (
            <button
              onClick={handleRevokeAll}
              disabled={!!revoking}
              className="px-3 py-1.5 rounded-lg text-xs font-medium border border-red-500/20 bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors disabled:opacity-50"
            >
              Revoke All Others
            </button>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Total Sessions', value: sessions.length, color: 'text-white' },
          { label: 'Desktop', value: sessions.filter(s => s.icon === Monitor).length, color: 'text-blue-400' },
          { label: 'Mobile', value: sessions.filter(s => s.icon === Smartphone).length, color: 'text-purple-400' },
          { label: 'Locations', value: new Set(sessions.map(s => s.location.split(',')[1]?.trim() || 'KE')).size, color: 'text-cyan-400' },
        ].map(({ label, value, color }) => (
          <div key={label} className="bg-[#0a0f1e] rounded-lg border border-white/10 p-3">
            <p className={`text-xl font-bold font-mono ${color}`}>{value}</p>
            <p className="text-[10px] text-slate-500 mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      {/* Current session */}
      {currentSession && (
        <div>
          <p className="text-[10px] font-mono text-slate-500 uppercase tracking-wider mb-2">Current Session</p>
          <div className="rounded-xl border border-green-500/30 bg-green-500/5 p-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center flex-shrink-0">
                <currentSession.icon className="w-5 h-5 text-green-400" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="text-sm font-semibold text-white">{currentSession.user}</p>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full border ${currentSession.badge}`}>{currentSession.role}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full border border-green-500/30 bg-green-500/10 text-green-400">● This device</span>
                </div>
                <div className="flex flex-wrap gap-3 mt-1">
                  <span className="text-[11px] text-slate-400 font-mono flex items-center gap-1"><Monitor className="w-3 h-3" />{currentSession.device} / {currentSession.os}</span>
                  <span className="text-[11px] text-slate-400 font-mono flex items-center gap-1"><MapPin className="w-3 h-3" />{currentSession.location}</span>
                  <span className="text-[11px] text-slate-400 font-mono flex items-center gap-1"><Clock className="w-3 h-3" />Active {currentSession.lastActive}</span>
                </div>
              </div>
            </div>
            <span className="text-xs text-green-400 font-mono flex-shrink-0">Secured ✓</span>
          </div>
        </div>
      )}

      {/* Other sessions */}
      <div>
        <p className="text-[10px] font-mono text-slate-500 uppercase tracking-wider mb-2">Other Active Sessions</p>
        <div className="space-y-2">
          <AnimatePresence>
            {activeSessions.map((session) => {
              const Icon = session.icon;
              const isRevoking = revoking === session.id;
              return (
                <motion.div
                  key={session.id}
                  layout
                  initial={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 60, height: 0, marginBottom: 0 }}
                  transition={{ duration: 0.35, ease: 'easeInOut' }}
                  className="rounded-xl border border-white/10 bg-[#0a0f1e] p-4 flex flex-col sm:flex-row items-start sm:items-center gap-4 group hover:border-white/20 transition-colors"
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-4 h-4 text-slate-400" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="text-sm font-medium text-white">{session.user}</p>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full border ${session.badge}`}>{session.role}</span>
                      </div>
                      <div className="flex flex-wrap gap-3 mt-1">
                        <span className="text-[11px] text-slate-500 font-mono">{session.device} / {session.os}</span>
                        <span className="text-[11px] text-slate-500 font-mono flex items-center gap-1"><MapPin className="w-3 h-3" />{session.location}</span>
                        <span className="text-[11px] text-slate-500 font-mono flex items-center gap-1"><Globe className="w-3 h-3" />{session.ip}</span>
                        <span className="text-[11px] text-slate-500 font-mono flex items-center gap-1"><Clock className="w-3 h-3" />Last: {session.lastActive}</span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => handleRevoke(session.id)}
                    disabled={!!revoking}
                    className="flex-shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium border border-red-500/20 bg-red-500/5 text-red-400 hover:bg-red-500/15 transition-all duration-200 disabled:opacity-40"
                  >
                    {isRevoking ? (
                      <><RefreshCw className="w-3.5 h-3.5 animate-spin" /> Revoking...</>
                    ) : (
                      <><LogOut className="w-3.5 h-3.5" /> Revoke</>  
                    )}
                  </button>
                </motion.div>
              );
            })}
          </AnimatePresence>
          {activeSessions.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-10 gap-2 border border-dashed border-green-500/20 rounded-xl bg-green-500/5"
            >
              <CheckCircle2 className="w-8 h-8 text-green-400" />
              <p className="text-sm text-green-400 font-semibold">All other sessions revoked</p>
              <p className="text-xs text-slate-500">Only your current session remains active</p>
            </motion.div>
          )}
        </div>
      </div>

      {/* Security notice */}
      <div className="p-3 rounded-lg bg-amber-500/5 border border-amber-500/20 flex items-start gap-3">
        <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
        <p className="text-xs text-amber-400/80 leading-relaxed">
          Revoking a session immediately invalidates the JWT token. The user will be required to log in again on that device.
        </p>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────── */
const AuthRBACDemo = () => {
  const [tab, setTab] = useState('login');

  const TABS = [
    { id: 'login',   label: 'Login Simulator',   icon: User },
    { id: 'matrix',  label: 'Permission Matrix',  icon: Shield },
    { id: 'audit',   label: 'Audit Log',          icon: Activity },
    { id: 'sessions',label: 'Session Manager',    icon: Wifi },
  ];

  return (
    <div className="min-h-full">
      {/* Tab bar */}
      <div className="sticky top-0 z-20 flex items-center gap-2 px-4 sm:px-6 py-3 border-b border-white/10 bg-[#0a0f1e]/90 backdrop-blur-xl overflow-x-auto scrollbar-hide">
        {TABS.map(t => (
          <TabButton key={t.id} active={tab === t.id} onClick={() => setTab(t.id)} icon={t.icon}>
            {t.label}
          </TabButton>
        ))}
        <div className="ml-auto flex-shrink-0">
          <span className="text-[10px] font-mono text-slate-600 whitespace-nowrap">
            nexus-enterprise-platform v1.0
          </span>
        </div>
      </div>

      {/* Tab content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25 }}
        >
          {tab === 'login'    && <LoginSimulator />}
          {tab === 'matrix'   && <PermissionMatrix />}
          {tab === 'audit'    && <AuditLog />}
          {tab === 'sessions' && <SessionManager />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default AuthRBACDemo;
