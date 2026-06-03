import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Code2, Copy, Check, ChevronDown } from 'lucide-react';

const CodeSnippetShowcase = () => {
  const [copied, setCopied] = useState(null);
  const [expandedSnippet, setExpandedSnippet] = useState(0);

  const codeSnippets = [
    {
      title: 'Laravel MVC Architecture',
      language: 'php',
      category: 'Backend',
      color: 'from-red-500 to-orange-500',
      code: `// app/Http/Controllers/ApiController.php
class ApiController extends Controller {
  public function getUsers() {
    return User::with('roles')
      ->where('status', 'active')
      ->paginate(15);
  }

  public function storeUser(Request $request) {
    $validated = $request->validate([
      'email' => 'required|email|unique:users',
      'password' => 'required|min:8'
    ]);

    return User::create($validated);
  }
}`
    },
    {
      title: 'MySQL Query Optimization',
      language: 'sql',
      category: 'Database',
      color: 'from-blue-500 to-cyan-500',
      code: `-- Optimized query with proper indexing
SELECT u.id, u.email, COUNT(o.id) as order_count
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
WHERE u.created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)
AND u.status = 'active'
GROUP BY u.id
HAVING COUNT(o.id) > 0
ORDER BY order_count DESC
LIMIT 50;

-- Index creation for performance
CREATE INDEX idx_users_status_date 
ON users(status, created_at);`
    },
    {
      title: 'REST API with Python',
      language: 'python',
      category: 'API',
      color: 'from-yellow-500 to-green-500',
      code: `# api/routes.py
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/api/v1/data', methods=['GET'])
def fetch_data():
    """Fetch data with error handling"""
    try:
        params = request.args.to_dict()
        data = DataService.query(**params)
        return jsonify({
          'status': 'success',
          'data': data
        }), 200
    except Exception as e:
        return jsonify({
          'status': 'error',
          'message': str(e)
        }), 500`
    },
    {
      title: 'Authentication with JWT',
      language: 'javascript',
      category: 'Security',
      color: 'from-purple-500 to-pink-500',
      code: `// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ error: 'Invalid token' });
    req.user = decoded;
    next();
  });
};

module.exports = authMiddleware;`
    }
  ];

  const handleCopy = (code, id) => {
    navigator.clipboard.writeText(code);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-50 to-slate-100">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          {/* Header */}
          <div className="flex items-center gap-3 mb-12">
            <Code2 className="w-8 h-8 text-slate-900" />
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
              Code Snippets & Architecture
            </h2>
          </div>

          {/* Code Cards Grid */}
          <div className="grid grid-cols-1 gap-6">
            {codeSnippets.map((snippet, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-lg hover:shadow-xl transition-all">
                  {/* Card Header */}
                  <button
                    onClick={() => setExpandedSnippet(expandedSnippet === idx ? -1 : idx)}
                    className="w-full"
                  >
                    <div className={`bg-gradient-to-r ${snippet.color} p-4 text-white flex items-center justify-between cursor-pointer hover:opacity-90 transition-opacity`}>
                      <div className="flex items-center gap-4">
                        <div>
                          <h3 className="font-bold text-lg text-left">{snippet.title}</h3>
                          <p className="text-sm opacity-90">{snippet.language.toUpperCase()} • {snippet.category}</p>
                        </div>
                      </div>
                      <motion.div
                        animate={{ rotate: expandedSnippet === idx ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronDown className="w-6 h-6" />
                      </motion.div>
                    </div>
                  </button>

                  {/* Code Content */}
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{
                      height: expandedSnippet === idx ? 'auto' : 0,
                      opacity: expandedSnippet === idx ? 1 : 0
                    }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="bg-slate-900 p-4 relative">
                      {/* Copy Button */}
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleCopy(snippet.code, idx)}
                        className="absolute top-3 right-3 p-2 bg-slate-700 hover:bg-slate-600 rounded transition-colors z-10"
                      >
                        {copied === idx ? (
                          <Check className="w-4 h-4 text-green-400" />
                        ) : (
                          <Copy className="w-4 h-4 text-slate-300" />
                        )}
                      </motion.button>

                      {/* Code */}
                      <pre className="text-xs sm:text-sm text-slate-100 font-mono overflow-x-auto">
                        <code>{snippet.code}</code>
                      </pre>
                    </div>

                    {/* Footer Info */}
                    <div className="bg-slate-50 px-4 py-3 border-t border-slate-200 flex justify-between items-center text-sm text-slate-600">
                      <span>Tech Stack: <span className="font-semibold text-slate-900">{snippet.language}</span></span>
                      <motion.div
                        animate={{ opacity: copied === idx ? 1 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="text-green-600 font-medium"
                      >
                        {copied === idx && '✓ Copied!'}
                      </motion.div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Note */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded"
          >
            <p className="text-sm text-blue-900">
              <span className="font-semibold">💡 Tip:</span> These code snippets represent actual patterns and architectures I've implemented in production environments. Each demonstrates key principles in backend engineering, database optimization, API design, and security.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CodeSnippetShowcase;
