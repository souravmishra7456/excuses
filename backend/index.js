const express = require('express');
const cors = require('cors');
const chalk = require('chalk');
const rateLimit = require('express-rate-limit');
const { printAsciiWelcome } = require('./utils/ascii.js');
const {
    getRandomExcuse,
    getMultipleExcuses,
    listCategories,
    searchExcuses
} = require('./excuseService.js');

const app = express();
const PORT = process.env.PORT || 5500;

// Rate limiting configuration - simplified
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later.'
});

// Apply rate limiting to all routes
app.use(limiter);

// Stricter rate limiting for search endpoint
const searchLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 30, // limit each IP to 30 search requests per windowMs
    message: 'Too many search requests from this IP, please try again later.'
});

// CORS configuration - simplified for compatibility
app.use(cors({
    origin: true,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'Origin', 'X-Requested-With']
}));

// Simple logging middleware
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path} - ${req.ip}`);
    next();
});

// Health check endpoint (not rate limited)
app.get('/health', (req, res) => {
    res.json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        rateLimit: {
            general: '100 requests per 15 minutes',
            search: '30 requests per 15 minutes'
        }
    });
});

app.get('/', (req, res) => {
    res.send(`
    <h2>🤖 Welcome to DevExcuse API</h2>
    <p>Try endpoints like:</p>
    <ul>
      <li>/excuse</li>
      <li>/excuse?count=3</li>
      <li>/excuse?category=AI</li>
      <li>/excuse?count=3&category=backend</li>
      <li>/excuse/devil</li>
      <li>/categories</li>
      <li>/search?q=cache</li>
    </ul>
    <p><strong>Rate Limits:</strong></p>
    <ul>
      <li>General: 100 requests per 15 minutes</li>
      <li>Search: 30 requests per 15 minutes</li>
    </ul>
  `);
});

// GET /excuse
app.get('/excuse', (req, res) => {
    const { category, count } = req.query;
    const n = parseInt(count) || 1;

    if (n === 1) {
        const excuse = getRandomExcuse(category);
        if (!excuse) return res.status(404).json({ error: "No excuses found for that category." });
        return res.json(excuse);
    }

    const list = getMultipleExcuses(n, category);
    res.json(list);
});

// GET /excuse/devil
app.get('/excuse/devil', (req, res) => {
    res.json({ text: "I deleted production.", category: "devil" });
});

// GET /categories
app.get('/categories', (req, res) => {
    res.json(listCategories());
});

// GET /search
app.get('/search', searchLimiter, (req, res) => {
    const { q } = req.query;
    if (!q) return res.status(400).json({ error: "Missing query parameter ?q=" });

    const searchResult = searchExcuses(q);

    // Check if it's the message format (no results found)
    if (searchResult && searchResult.message && searchResult.count === 0) {
        return res.status(404).json(searchResult);
    }

    // Return structured format for successful searches
    res.json(searchResult);
});

// Global error handler
app.use((err, req, res, next) => {
    console.error(chalk.red('❌ Error:', err.message));
    res.status(500).json({
        error: 'Internal server error',
        message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
    });
});

// 404 handler - catch all unmatched routes
app.use((req, res) => {
    res.status(404).json({
        error: 'Endpoint not found',
        availableEndpoints: [
            'GET /',
            'GET /health',
            'GET /excuse',
            'GET /excuse/devil',
            'GET /categories',
            'GET /search'
        ]
    });
});

// Start
app.listen(PORT, () => {
    printAsciiWelcome();
    console.log(chalk.green(`🌍 DevExcuse API is live at http://localhost:${PORT}`));
    console.log(chalk.cyan(`🌐 CORS enabled`));
    console.log(chalk.yellow(`🛡️  Rate limiting enabled`));
    console.log(chalk.blue(`💚 Health check: http://localhost:${PORT}/health`));
});
