import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Layers, Code2, ArrowRight, Globe, Shield, Router,
  Cpu, Database, Package, ChevronRight, Play, RefreshCw,
  FileCode, FolderOpen, Eye, Zap, Lock, Terminal, GitFork, List,
} from 'lucide-react';

/* ─── Design tokens ──────────────────────────────────────────────────── */
const T = {
  bg: '#050816',
  card: '#0a0f1e',
  border: 'rgba(255,255,255,0.08)',
  orange: '#fb923c',
  amber: '#fbbf24',
  cyan: '#22d3ee',
};

/* ─── Tabs ───────────────────────────────────────────────────────────── */
const tabs = [
  { id: 'lifecycle', label: 'Request Lifecycle', icon: Globe },
  { id: 'arch', label: 'Architecture Explorer', icon: Layers },
  { id: 'relationships', label: 'Model Relationships', icon: GitFork },
  { id: 'routes', label: 'Route Inspector', icon: List },
];

/* ─── REQUEST LIFECYCLE DATA ─────────────────────────────────────────── */
const LIFECYCLE_STEPS = [
  {
    id: 'http',
    label: 'HTTP Request',
    icon: Globe,
    color: 'text-sky-400',
    border: 'border-sky-500/30',
    bg: 'bg-sky-500/5',
    glow: 'shadow-sky-500/20',
    description: 'Browser sends GET /api/users/42 with Authorization: Bearer <token>',
    code: `GET /api/users/42 HTTP/1.1
Host: nexus.co.ke
Authorization: Bearer eyJ0eXAiOiJKV1Qi...
Accept: application/json`,
  },
  {
    id: 'middleware',
    label: 'Middleware Pipeline',
    icon: Shield,
    color: 'text-purple-400',
    border: 'border-purple-500/30',
    bg: 'bg-purple-500/5',
    glow: 'shadow-purple-500/20',
    description: 'Request passes through global → group → route middleware stack',
    code: `// Kernel.php — middleware pipeline
[
  \\App\\Http\\Middleware\\TrustProxies::class,
  \\Illuminate\\Auth\\Middleware\\Authenticate::class,
  \\App\\Http\\Middleware\\CheckPermissions::class, // RBAC
  \\Illuminate\\Routing\\Middleware\\ThrottleRequests::class,
]`,
  },
  {
    id: 'router',
    label: 'Router',
    icon: Router,
    color: 'text-cyan-400',
    border: 'border-cyan-500/30',
    bg: 'bg-cyan-500/5',
    glow: 'shadow-cyan-500/20',
    description: 'Router resolves route → maps to UserController@show',
    code: `// routes/api.php
Route::middleware(['auth:sanctum', 'permission:users.read'])
  ->prefix('api')
  ->group(function () {
    Route::apiResource('users', UserController::class);
    // GET /api/users/{id} → UserController@show
  });`,
  },
  {
    id: 'controller',
    label: 'Controller',
    icon: Cpu,
    color: 'text-orange-400',
    border: 'border-orange-500/30',
    bg: 'bg-orange-500/5',
    glow: 'shadow-orange-500/20',
    description: 'Controller delegates to service layer, returns JSON resource',
    code: `// app/Http/Controllers/Api/UserController.php
class UserController extends Controller
{
    public function __construct(
        private readonly UserService $userService
    ) {}

    public function show(int $id): UserResource
    {
        $user = $this->userService->findOrFail($id);
        return new UserResource($user);
    }
}`,
  },
  {
    id: 'model',
    label: 'Eloquent Model',
    icon: Database,
    color: 'text-green-400',
    border: 'border-green-500/30',
    bg: 'bg-green-500/5',
    glow: 'shadow-green-500/20',
    description: 'Eloquent Model queries database via query builder; result cached in Redis',
    code: `// app/Models/User.php
class User extends Authenticatable
{
    protected $fillable = ['name', 'email', 'role_id'];

    protected $hidden = ['password', 'remember_token'];

    public function department(): BelongsTo
    {
        return $this->belongsTo(Department::class);
    }

    public function roles(): BelongsToMany
    {
        return $this->belongsToMany(Role::class);
    }
}`,
  },
  {
    id: 'response',
    label: 'JSON Response',
    icon: Package,
    color: 'text-amber-400',
    border: 'border-amber-500/30',
    bg: 'bg-amber-500/5',
    glow: 'shadow-amber-500/20',
    description: 'API Resource transforms model to JSON; 200 OK sent back to client',
    code: `// 200 OK — application/json
{
  "data": {
    "id": 42,
    "name": "Amara Ochieng",
    "email": "a.ochieng@nexus.co.ke",
    "department": "Engineering",
    "roles": ["developer", "reviewer"],
    "created_at": "2024-08-14T10:22:00Z"
  },
  "meta": { "version": "1.0" }
}`,
  },
];

/* ─── ARCHITECTURE TREE DATA ─────────────────────────────────────────── */
const ARCH_TREE = [
  {
    name: 'app/',
    type: 'dir',
    children: [
      {
        name: 'Http/',
        type: 'dir',
        children: [
          {
            name: 'Controllers/',
            type: 'dir',
            badge: 'Thin controllers',
            badgeColor: 'cyan',
            children: [
              { name: 'Api/UserController.php', type: 'file', lang: 'PHP', detail: 'CRUD + resource transform' },
              { name: 'Api/AuthController.php', type: 'file', lang: 'PHP', detail: 'Login / refresh / revoke' },
              { name: 'Api/ProjectController.php', type: 'file', lang: 'PHP', detail: 'Project CRUD' },
            ],
          },
          {
            name: 'Middleware/',
            type: 'dir',
            badge: 'Pipeline',
            badgeColor: 'purple',
            children: [
              { name: 'Authenticate.php', type: 'file', lang: 'PHP', detail: 'Sanctum token guard' },
              { name: 'CheckPermissions.php', type: 'file', lang: 'PHP', detail: 'RBAC gate check' },
              { name: 'ForceJsonResponse.php', type: 'file', lang: 'PHP', detail: 'Ensures JSON Accept header' },
            ],
          },
          {
            name: 'Requests/',
            type: 'dir',
            badge: 'Validation',
            badgeColor: 'amber',
            children: [
              { name: 'StoreUserRequest.php', type: 'file', lang: 'PHP', detail: 'Validated & authorised' },
              { name: 'UpdateUserRequest.php', type: 'file', lang: 'PHP', detail: 'Partial update rules' },
            ],
          },
          {
            name: 'Resources/',
            type: 'dir',
            badge: 'Transformers',
            badgeColor: 'orange',
            children: [
              { name: 'UserResource.php', type: 'file', lang: 'PHP', detail: 'JSON API shape' },
              { name: 'UserCollection.php', type: 'file', lang: 'PHP', detail: 'Paginated wrapper' },
            ],
          },
        ],
      },
      {
        name: 'Models/',
        type: 'dir',
        badge: 'Eloquent ORM',
        badgeColor: 'green',
        children: [
          { name: 'User.php', type: 'file', lang: 'PHP', detail: 'Authenticatable + HasRoles' },
          { name: 'Department.php', type: 'file', lang: 'PHP', detail: 'HasMany users' },
          { name: 'Project.php', type: 'file', lang: 'PHP', detail: 'Polymorphic tasks' },
          { name: 'Role.php', type: 'file', lang: 'PHP', detail: 'BelongsToMany users' },
        ],
      },
      {
        name: 'Services/',
        type: 'dir',
        badge: 'Business Logic',
        badgeColor: 'cyan',
        children: [
          { name: 'UserService.php', type: 'file', lang: 'PHP', detail: 'findOrFail, create, update' },
          { name: 'AuthService.php', type: 'file', lang: 'PHP', detail: 'Token lifecycle' },
        ],
      },
    ],
  },
  {
    name: 'database/',
    type: 'dir',
    children: [
      {
        name: 'migrations/',
        type: 'dir',
        badge: 'Schema history',
        badgeColor: 'muted',
        children: [
          { name: '2024_01_create_users_table.php', type: 'file', lang: 'PHP', detail: 'FK + indexes' },
          { name: '2024_02_create_roles_table.php', type: 'file', lang: 'PHP', detail: 'RBAC pivot' },
          { name: '2024_03_create_projects_table.php', type: 'file', lang: 'PHP', detail: 'Polymorphic ready' },
        ],
      },
      {
        name: 'seeders/',
        type: 'dir',
        children: [
          { name: 'DatabaseSeeder.php', type: 'file', lang: 'PHP', detail: 'Orchestrates all seeders' },
          { name: 'UserSeeder.php', type: 'file', lang: 'PHP', detail: 'Factory + realistic KE data' },
        ],
      },
    ],
  },
  {
    name: 'routes/',
    type: 'dir',
    children: [
      { name: 'api.php', type: 'file', lang: 'PHP', detail: 'Versioned, grouped routes' },
      { name: 'web.php', type: 'file', lang: 'PHP', detail: 'SPA catch-all' },
    ],
  },
  {
    name: 'config/',
    type: 'dir',
    children: [
      { name: 'auth.php', type: 'file', lang: 'PHP', detail: 'Sanctum guard config' },
      { name: 'database.php', type: 'file', lang: 'PHP', detail: 'MySQL + Redis connections' },
    ],
  },
];

/* ─── Helpers ────────────────────────────────────────────────────────── */
const badgeColor = {
  cyan:   'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
  green:  'bg-green-500/10 text-green-400 border-green-500/20',
  amber:  'bg-amber-500/10 text-amber-400 border-amber-500/20',
  orange: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
  purple: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  muted:  'bg-white/5 text-slate-400 border-white/10',
};

const Pill = ({ color, children }) => (
  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-mono border ${badgeColor[color]}`}>
    {children}
  </span>
);

/* ─── Tree node ──────────────────────────────────────────────────────── */
const TreeNode = ({ node, depth = 0, onSelect, selected }) => {
  const [open, setOpen] = useState(depth < 2);
  const isDir = node.type === 'dir';

  return (
    <div>
      <button
        onClick={() => {
          if (isDir) setOpen((o) => !o);
          else onSelect(node);
        }}
        className={`w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-left transition-all duration-150 group
          ${selected?.name === node.name ? 'bg-orange-500/10 text-orange-300' : 'hover:bg-white/5 text-slate-300 hover:text-white'}`}
        style={{ paddingLeft: `${depth * 16 + 8}px` }}
      >
        {isDir ? (
          <>
            <ChevronRight
              className={`w-3 h-3 text-slate-500 transition-transform duration-200 flex-shrink-0 ${open ? 'rotate-90' : ''}`}
            />
            <FolderOpen className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
          </>
        ) : (
          <>
            <span className="w-3 flex-shrink-0" />
            <FileCode className="w-3.5 h-3.5 text-slate-500 flex-shrink-0" />
          </>
        )}
        <span className="text-xs font-mono truncate">{node.name}</span>
        {node.badge && (
          <span className="ml-auto flex-shrink-0">
            <Pill color={node.badgeColor || 'muted'}>{node.badge}</Pill>
          </span>
        )}
      </button>

      <AnimatePresence>
        {isDir && open && node.children && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            {node.children.map((child, i) => (
              <TreeNode
                key={i}
                node={child}
                depth={depth + 1}
                onSelect={onSelect}
                selected={selected}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* ─── Lifecycle Animator panel ───────────────────────────────────────── */
const LifecyclePanel = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [playing, setPlaying] = useState(false);
  const intervalRef = useRef(null);

  const play = useCallback(() => {
    if (playing) {
      clearInterval(intervalRef.current);
      setPlaying(false);
      return;
    }
    setPlaying(true);
    setActiveStep(0);
    let idx = 0;
    intervalRef.current = setInterval(() => {
      idx += 1;
      if (idx >= LIFECYCLE_STEPS.length) {
        clearInterval(intervalRef.current);
        setPlaying(false);
        return;
      }
      setActiveStep(idx);
    }, 1200);
  }, [playing]);

  useEffect(() => () => clearInterval(intervalRef.current), []);

  const step = LIFECYCLE_STEPS[activeStep];

  return (
    <div className="p-4 sm:p-6 space-y-6">
      {/* Controls */}
      <div className="flex items-center gap-3 flex-wrap">
        <h3 className="text-sm font-semibold text-white">Laravel HTTP Request Lifecycle</h3>
        <button
          onClick={play}
          className={`ml-auto flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-200 ${
            playing
              ? 'bg-red-500/10 border border-red-500/30 text-red-400'
              : 'bg-gradient-to-r from-orange-500 to-amber-500 text-white hover:opacity-90 active:scale-95 shadow-lg shadow-orange-500/20'
          }`}
        >
          {playing ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Play className="w-3.5 h-3.5" />}
          {playing ? 'Animating…' : 'Animate Lifecycle'}
        </button>
      </div>

      {/* Pipeline visual */}
      <div className="overflow-x-auto pb-2">
        <div className="flex items-center gap-1 min-w-max">
          {LIFECYCLE_STEPS.map((s, i) => {
            const Icon = s.icon;
            const isActive = i === activeStep;
            const isPast = i < activeStep;
            return (
              <React.Fragment key={s.id}>
                <button
                  onClick={() => { setActiveStep(i); setPlaying(false); clearInterval(intervalRef.current); }}
                  className={`flex flex-col items-center gap-1.5 px-3 py-2 rounded-xl border transition-all duration-300 min-w-[80px] ${
                    isActive
                      ? `${s.bg} ${s.border} shadow-lg ${s.glow}`
                      : isPast
                        ? 'bg-green-500/5 border-green-500/20'
                        : 'bg-white/3 border-white/8 hover:bg-white/5'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? s.color : isPast ? 'text-green-400' : 'text-slate-500'}`} />
                  <span className={`text-[10px] font-mono font-medium text-center leading-tight ${
                    isActive ? 'text-white' : isPast ? 'text-green-400' : 'text-slate-500'
                  }`}>{s.label}</span>
                </button>
                {i < LIFECYCLE_STEPS.length - 1 && (
                  <ArrowRight className={`w-3 h-3 flex-shrink-0 transition-colors duration-500 ${
                    isPast ? 'text-green-400' : 'text-slate-700'
                  }`} />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Step detail */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeStep}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25 }}
          className={`rounded-xl border ${step.border} ${step.bg} p-4 space-y-3`}
        >
          <div className="flex items-center gap-2">
            <step.icon className={`w-4 h-4 ${step.color}`} />
            <span className={`text-sm font-semibold ${step.color}`}>{step.label}</span>
            <span className="ml-auto text-xs text-slate-500 font-mono">Step {activeStep + 1}/{LIFECYCLE_STEPS.length}</span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">{step.description}</p>
          <pre className="rounded-lg bg-black/30 border border-white/5 p-3 overflow-x-auto text-xs font-mono text-slate-300 leading-relaxed whitespace-pre-wrap break-words">
            <code>{step.code}</code>
          </pre>
        </motion.div>
      </AnimatePresence>

      {/* Progress bar */}
      <div className="space-y-1.5">
        <div className="flex justify-between text-[10px] font-mono text-slate-500">
          <span>Pipeline progress</span>
          <span>{activeStep + 1} / {LIFECYCLE_STEPS.length} stages</span>
        </div>
        <div className="h-1 rounded-full bg-white/5 overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-orange-500 to-amber-400"
            animate={{ width: `${((activeStep + 1) / LIFECYCLE_STEPS.length) * 100}%` }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          />
        </div>
      </div>
    </div>
  );
};

/* ─── Architecture Explorer panel ────────────────────────────────────── */
const ArchExplorerPanel = () => {
  const [selected, setSelected] = useState(null);

  const DETAIL_CODE = {
    'UserController.php': `<?php
namespace App\\Http\\Controllers\\Api;

use App\\Http\\Requests\\StoreUserRequest;
use App\\Http\\Resources\\UserResource;
use App\\Services\\UserService;

class UserController extends Controller
{
    public function __construct(
        private readonly UserService $userService
    ) {}

    public function index(): UserCollection
    {
        return new UserCollection(
            $this->userService->paginate(20)
        );
    }

    public function store(StoreUserRequest $request): UserResource
    {
        $user = $this->userService->create($request->validated());
        return new UserResource($user);
    }

    public function show(int $id): UserResource
    {
        return new UserResource(
            $this->userService->findOrFail($id)
        );
    }
}`,
    'User.php': `<?php
namespace App\\Models;

use Illuminate\\Foundation\\Auth\\User as Authenticatable;
use Illuminate\\Notifications\\Notifiable;

class User extends Authenticatable
{
    use Notifiable;

    protected $fillable = [
        'name', 'email', 'password', 'department_id',
    ];

    protected $hidden = ['password', 'remember_token'];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'password'          => 'hashed',
    ];

    public function department(): BelongsTo
    {
        return $this->belongsTo(Department::class);
    }

    public function roles(): BelongsToMany
    {
        return $this->belongsToMany(Role::class, 'role_user');
    }
}`,
    'api.php': `<?php
use Illuminate\\Support\\Facades\\Route;
use App\\Http\\Controllers\\Api\\{
    UserController,
    AuthController,
    ProjectController,
};

Route::prefix('v1')->group(function () {
    // Public
    Route::post('auth/login',   [AuthController::class, 'login']);
    Route::post('auth/refresh', [AuthController::class, 'refresh']);

    // Protected
    Route::middleware(['auth:sanctum'])->group(function () {
        Route::apiResource('users',    UserController::class);
        Route::apiResource('projects', ProjectController::class);
        Route::post('auth/logout',     [AuthController::class, 'logout']);
    });
});`,
  };

  const codeToShow = selected
    ? DETAIL_CODE[selected.name] ?? `<?php\n// ${selected.name}\n// ${selected.detail ?? ''}\n`
    : null;

  return (
    <div className="p-4 sm:p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-full">
        {/* File tree */}
        <div className="rounded-xl border border-white/8 bg-[#0a0f1e] overflow-hidden flex flex-col min-h-[400px] lg:min-h-0">
          <div className="flex items-center gap-2 px-4 py-3 border-b border-white/8 flex-shrink-0">
            <FolderOpen className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-semibold text-white">Project Structure</span>
            <span className="ml-auto text-[10px] font-mono text-slate-500">Laravel 11.x</span>
          </div>
          <div className="flex-1 overflow-y-auto p-2">
            {ARCH_TREE.map((node, i) => (
              <TreeNode
                key={i}
                node={node}
                depth={0}
                onSelect={setSelected}
                selected={selected}
              />
            ))}
          </div>
        </div>

        {/* Code viewer */}
        <div className="rounded-xl border border-white/8 bg-[#0a0f1e] overflow-hidden flex flex-col min-h-[300px] lg:min-h-0">
          <div className="flex items-center gap-2 px-4 py-3 border-b border-white/8 flex-shrink-0">
            <FileCode className="w-4 h-4 text-orange-400" />
            <span className="text-xs font-semibold text-white truncate">
              {selected ? selected.name : 'Select a file…'}
            </span>
            {selected?.detail && (
              <span className="ml-auto flex-shrink-0">
                <span className="text-[10px] font-mono text-slate-500">{selected.detail}</span>
              </span>
            )}
          </div>
          <div className="flex-1 overflow-auto p-4">
            <AnimatePresence mode="wait">
              {codeToShow ? (
                <motion.pre
                  key={selected?.name}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-xs font-mono text-slate-300 leading-relaxed whitespace-pre overflow-x-auto"
                >
                  <code>{codeToShow}</code>
                </motion.pre>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center justify-center h-full text-center py-12 gap-3"
                >
                  <Eye className="w-8 h-8 text-slate-600" />
                  <p className="text-slate-500 text-sm">Select a file from the tree to view its code</p>
                  <p className="text-slate-600 text-xs font-mono">Click any .php file on the left</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Architecture layer legend */}
      <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Controllers', desc: 'HTTP layer — thin, delegate only', color: 'cyan' },
          { label: 'Services', desc: 'Business logic — single responsibility', color: 'orange' },
          { label: 'Models', desc: 'Eloquent ORM — data relationships', color: 'green' },
          { label: 'Middleware', desc: 'Cross-cutting concerns — auth / RBAC', color: 'purple' },
        ].map((layer) => (
          <div key={layer.label} className={`rounded-lg border ${badgeColor[layer.color].replace('bg-', 'border-').split(' ')[0].replace('10', '20')} bg-${layer.color}-500/5 p-3 space-y-1`}>
            <Pill color={layer.color}>{layer.label}</Pill>
            <p className="text-[11px] text-slate-500 leading-relaxed">{layer.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};


/* ─── Model Relationships panel ──────────────────────────────────────── */
const ModelRelationshipsPanel = () => {
  const [selectedRel, setSelectedRel] = useState('user_dept');

  const RELATIONS = {
    user_dept: {
      title: 'User ➔ Department (Many-to-One)',
      model: 'User.php',
      method: 'department()',
      code: `// app/Models/User.php
class User extends Authenticatable
{
    public function department(): BelongsTo
    {
        return $this->belongsTo(Department::class);
    }
}`,
      explanation: 'Defines a direct relationship where each User belongs to exactly one Department. Laravel will look for a foreign key named department_id on the users table.',
    },
    user_roles: {
      title: 'User ➔ Role (Many-to-Many)',
      model: 'User.php',
      method: 'roles()',
      code: `// app/Models/User.php
class User extends Authenticatable
{
    public function roles(): BelongsToMany
    {
        return $this->belongsToMany(Role::class, 'role_user')
                    ->withTimestamps();
    }
}`,
      explanation: 'Models a many-to-many relationship using a junction table role_user. A user can have multiple security roles, and roles can belong to multiple users.',
    },
    dept_users: {
      title: 'Department ➔ User (One-to-Many)',
      model: 'Department.php',
      method: 'users()',
      code: `// app/Models/Department.php
class Department extends Model
{
    public function users(): HasMany
    {
        return $this->hasMany(User::class);
    }
}`,
      explanation: 'The inverse of the User-Department relationship. A department can possess many registered users. Laravel automatically links via department_id.',
    },
    user_projects: {
      title: 'User ➔ Project (One-to-Many)',
      model: 'User.php',
      method: 'projects()',
      code: `// app/Models/User.php
class User extends Authenticatable
{
    public function projects(): HasMany
    {
        return $this->hasMany(Project::class, 'owner_id');
    }
}`,
      explanation: 'Indicates projects owned by this user. Since the database column is custom (owner_id instead of user_id), we pass it as the second parameter.',
    },
  };

  const rel = RELATIONS[selectedRel];

  return (
    <div className="p-4 sm:p-6 space-y-6">
      <div className="flex flex-wrap items-center gap-3">
        <h3 className="text-sm font-semibold text-white">Eloquent ORM Relationships</h3>
        <span className="ml-auto text-[10px] font-mono text-slate-500">Active Map</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Relationship selector/visual map */}
        <div className="lg:col-span-5 bg-[#0a0f1e] rounded-xl border border-white/10 p-5 flex flex-col justify-between min-h-[320px]">
          <div className="space-y-4">
            <p className="text-xs font-mono text-orange-400/80 uppercase tracking-wider">Relationship Schema</p>
            <div className="space-y-3">
              {[
                { id: 'user_dept', label: 'User BelongsTo Department', color: 'from-blue-500 to-cyan-500' },
                { id: 'user_roles', label: 'User BelongsToMany Role', color: 'from-red-500 to-pink-500' },
                { id: 'dept_users', label: 'Department HasMany User', color: 'from-green-500 to-emerald-500' },
                { id: 'user_projects', label: 'User HasMany Project (Custom Owner FK)', color: 'from-orange-500 to-amber-500' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setSelectedRel(item.id)}
                  className={`w-full text-left px-4 py-3 rounded-lg border text-xs font-mono transition-all duration-200 flex items-center justify-between ${
                    selectedRel === item.id
                      ? 'bg-orange-500/10 border-orange-500/30 text-orange-300 shadow-md'
                      : 'border-white/5 bg-white/3 text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${item.color}`} />
                    {item.label}
                  </span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              ))}
            </div>
          </div>

          <div className="p-3 bg-white/5 border border-white/10 rounded-lg mt-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-300 mb-1">
              <Database className="w-3.5 h-3.5 text-orange-400" />
              <span>Eloquent Lazy Loading Guard</span>
            </div>
            <p className="text-[10px] text-slate-500 leading-relaxed">
              Nexus enforces strict lazy loading prevention in local development environment to avoid N+1 query problems automatically.
            </p>
          </div>
        </div>

        {/* Relationship code preview */}
        <div className="lg:col-span-7 flex flex-col bg-[#0a0f1e] rounded-xl border border-white/10 overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 bg-[#131b2f] border-b border-white/10">
            <div className="flex items-center gap-2">
              <FileCode className="w-4 h-4 text-orange-400" />
              <span className="text-xs font-semibold text-white font-mono">{rel.model} ➔ {rel.method}</span>
            </div>
            <Pill color="orange">Eloquent</Pill>
          </div>

          <div className="flex-1 p-4 space-y-4">
            <pre className="text-xs font-mono text-slate-300 leading-relaxed overflow-x-auto bg-black/30 border border-white/5 p-3 rounded-lg">
              <code>{rel.code}</code>
            </pre>

            <div className="space-y-1.5">
              <p className="text-[11px] font-mono text-slate-500 uppercase tracking-wider">How it works</p>
              <p className="text-xs text-slate-400 leading-relaxed">{rel.explanation}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ─── Route Inspector panel ─────────────────────────────────────────── */
const RouteInspectorPanel = () => {
  const [search, setSearch] = useState('');
  const [methodFilter, setMethodFilter] = useState('ALL');

  const ROUTES = [
    { method: 'POST',   uri: '/api/v1/auth/login',    action: 'AuthController@login',       middleware: 'guest, throttle:10,1', rLimit: '10/min' },
    { method: 'POST',   uri: '/api/v1/auth/refresh',  action: 'AuthController@refresh',     middleware: 'guest',                rLimit: '60/min' },
    { method: 'POST',   uri: '/api/v1/auth/logout',   action: 'AuthController@logout',      middleware: 'auth:sanctum',         rLimit: 'N/A' },
    { method: 'GET',    uri: '/api/v1/users',         action: 'UserController@index',       middleware: 'auth:sanctum, perms:users.read', rLimit: '1000/hr' },
    { method: 'POST',   uri: '/api/v1/users',         action: 'UserController@store',       middleware: 'auth:sanctum, perms:users.create', rLimit: '1000/hr' },
    { method: 'GET',    uri: '/api/v1/users/{user}',  action: 'UserController@show',        middleware: 'auth:sanctum, perms:users.read', rLimit: '1000/hr' },
    { method: 'PUT',    uri: '/api/v1/users/{user}',  action: 'UserController@update',      middleware: 'auth:sanctum, perms:users.update', rLimit: '1000/hr' },
    { method: 'DELETE', uri: '/api/v1/users/{user}',  action: 'UserController@destroy',     middleware: 'auth:sanctum, perms:users.delete', rLimit: '1000/hr' },
    { method: 'GET',    uri: '/api/v1/departments',   action: 'DepartmentController@index',  middleware: 'auth:sanctum',         rLimit: '500/hr' },
    { method: 'GET',    uri: '/api/v1/projects',      action: 'ProjectController@index',     middleware: 'auth:sanctum',         rLimit: '1000/hr' },
    { method: 'POST',   uri: '/api/v1/projects',      action: 'ProjectController@store',     middleware: 'auth:sanctum',         rLimit: '1000/hr' },
    { method: 'GET',    uri: '/api/v1/health',        action: 'HealthController@show',      middleware: 'none',                 rLimit: '600/hr' },
  ];

  const filtered = ROUTES.filter((r) => {
    const matchesSearch = r.uri.toLowerCase().includes(search.toLowerCase()) || r.action.toLowerCase().includes(search.toLowerCase());
    const matchesMethod = methodFilter === 'ALL' || r.method === methodFilter;
    return matchesSearch && matchesMethod;
  });

  const methodBadgeClass = {
    GET:    'bg-green-500/10 text-green-400 border-green-500/20',
    POST:   'bg-blue-500/10 text-blue-400 border-blue-500/20',
    PUT:    'bg-amber-500/10 text-amber-400 border-amber-500/20',
    DELETE: 'bg-red-500/10 text-red-400 border-red-500/20',
  };

  return (
    <div className="p-4 sm:p-6 space-y-4">
      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        <div className="flex items-center gap-2">
          <Router className="w-4 h-4 text-orange-400" />
          <h3 className="text-sm font-semibold text-white">Route Registry</h3>
          <span className="text-xs text-slate-500 font-mono">({filtered.length} loaded)</span>
        </div>

        {/* Search */}
        <input
          type="text"
          placeholder="Filter routes (e.g. /users)..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-3 py-1.5 bg-[#131b2f] border border-white/10 rounded-lg text-xs text-slate-300 font-mono focus:outline-none focus:border-orange-500/50 max-w-xs w-full"
        />
      </div>

      {/* Method filter buttons */}
      <div className="flex flex-wrap gap-2">
        {['ALL', 'GET', 'POST', 'PUT', 'DELETE'].map((m) => (
          <button
            key={m}
            onClick={() => setMethodFilter(m)}
            className={`px-3 py-1 rounded-full text-[10px] font-mono border transition-colors ${
              methodFilter === m
                ? 'bg-orange-500/10 text-orange-400 border-orange-500/30'
                : 'text-slate-500 border-white/10 hover:text-slate-300'
            }`}
          >
            {m}
          </button>
        ))}
      </div>

      {/* Routes table */}
      <div className="overflow-x-auto rounded-xl border border-white/10 bg-[#0a0f1e]">
        <table className="w-full min-w-[700px] text-xs font-mono text-left">
          <thead>
            <tr className="border-b border-white/10 bg-[#131b2f] text-slate-500 uppercase tracking-wider text-[10px]">
              <th className="px-4 py-2.5 w-24">Method</th>
              <th className="px-4 py-2.5">URI</th>
              <th className="px-4 py-2.5">Action</th>
              <th className="px-4 py-2.5">Middleware</th>
              <th className="px-4 py-2.5 w-24">Rate Limit</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((route, i) => (
              <tr key={i} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                <td className="px-4 py-3">
                  <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold border ${methodBadgeClass[route.method] || 'bg-slate-500/10 text-slate-400 border-slate-500/20'}`}>
                    {route.method}
                  </span>
                </td>
                <td className="px-4 py-3 text-white font-medium">{route.uri}</td>
                <td className="px-4 py-3 text-cyan-400">{route.action}</td>
                <td className="px-4 py-3 text-slate-400 text-[11px] truncate max-w-[200px]">{route.middleware}</td>
                <td className="px-4 py-3 text-slate-500 text-[11px]">{route.rLimit}</td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center py-8 text-slate-600">
                  No routes match the filter criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

/* ─── Root ───────────────────────────────────────────────────────────── */
const LaravelArchDemo = () => {
  const [activeTab, setActiveTab] = useState('lifecycle');

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
                  ? 'bg-orange-500/10 border border-orange-500/30 text-orange-400'
                  : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Panel */}
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
            {activeTab === 'lifecycle' && <LifecyclePanel />}
            {activeTab === 'arch' && <ArchExplorerPanel />}
            {activeTab === 'relationships' && <ModelRelationshipsPanel />}
            {activeTab === 'routes' && <RouteInspectorPanel />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default LaravelArchDemo;
