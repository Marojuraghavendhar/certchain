const express = require('express');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const xss = require('xss-clean');
const hpp = require('hpp');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to SQLite database
const dbPath = path.join(__dirname, 'certichain.db');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        console.log('Connected to the CertiChain SQLite database.');
    }
});

// Middleware
// Set security HTTP headers
app.use(helmet({
    contentSecurityPolicy: false, // Disabling CSP for now to avoid breaking existing inline scripts/styles unless specifically tuned
}));

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again after 15 minutes'
});
app.use(limiter);

// Data sanitization against XSS
app.use(xss());

// Prevent HTTP Parameter Pollution
app.use(hpp());

app.use(cors());
app.use(express.json());
app.use(express.static('.'));

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'dashboard.html'));
});

app.get('/student-dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'student_dashboard.html'));
});

app.get('/faculty-dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'faculty_dashboard.html'));
});

app.get('/config', (req, res) => {
    res.sendFile(path.join(__dirname, 'config.js'));
});

// API endpoints for blockchain interaction
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ success: false, message: 'Email and password are required' });
    }
    
    // In a real application, you should hash the password and compare hashes.
    // For this prototype, we are checking plain text passwords or pre-seeded hashes.
    db.get('SELECT * FROM Students WHERE email = ? AND password_hash = ?', [email, password], (err, row) => {
        if (err) {
            console.error('Database error during login:', err.message);
            return res.status(500).json({ success: false, message: 'Server error' });
        }
        
        if (!row) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }
        
        res.json({
            success: true,
            user: {
                id: row.student_id,
                name: row.full_name,
                email: row.email
            }
        });
    });
});

app.post('/api/signup', (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ success: false, message: 'Name, email, and password are required' });
    }
    
    // Check if email exists
    db.get('SELECT * FROM Students WHERE email = ?', [email], (err, row) => {
        if (err) return res.status(500).json({ success: false, message: 'Database error' });
        if (row) return res.status(409).json({ success: false, message: 'Email already exists' });
        
        const studentId = 'STD' + Date.now().toString().slice(-8); // Generate unique ID
        
        db.run('INSERT INTO Students (student_id, full_name, email, password_hash) VALUES (?, ?, ?, ?)', 
        [studentId, name, email, password], function(err) {
            if (err) return res.status(500).json({ success: false, message: 'Failed to create account' });
            
            res.json({
                success: true,
                user: {
                    id: studentId,
                    name: name,
                    email: email
                }
            });
        });
    });
});

app.get('/api/health', (req, res) => {
    res.json({
        status: 'OK',
        message: 'CertiChain API is running',
        timestamp: new Date().toISOString()
    });
});

// Start server
app.listen(PORT, () => {
    console.log('🚀 CertiChain server is running!');
    console.log(`📱 Open your browser and navigate to:`);
    console.log(`   🌐 http://localhost:${PORT}`);
    console.log(`   🔗 http://localhost:${PORT}/dashboard`);
    console.log('');
    console.log('📋 Available routes:');
    console.log('   / - Login/Signup page');
    console.log('   /dashboard - Main application dashboard');
    console.log('   /config - Configuration file');
    console.log('   /api/health - API health check');
    console.log('');
    console.log('💡 To stop the server, press Ctrl+C');
});
