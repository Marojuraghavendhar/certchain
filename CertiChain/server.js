const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
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

app.get('/config', (req, res) => {
    res.sendFile(path.join(__dirname, 'config.js'));
});

// API endpoints for blockchain interaction
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
