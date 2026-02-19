// ================================================
// MANAS360 Session Analytics - Express Server
// Story 3.6: Session Analytics
// ================================================

require('dotenv').config();

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const rateLimit = require('express-rate-limit');

const { testConnection } = require('./config/database');
const analyticsRoutes = require('./routes/analyticsRoutes');
const adminRoutes = require('./routes/adminRoutes');
const { generateToken } = require('./middleware/adminAuth');

const app = express();
const PORT = process.env.PORT || 3001;

// =========================================
// Security & Performance Middleware
// =========================================
app.use(helmet());
app.use(compression());
app.use(cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 1000, // limit each IP to 1000 requests per windowMs
    message: { success: false, error: 'Too many requests, please try again later.' }
});
app.use('/api/', limiter);

// =========================================
// Health Check
// =========================================
app.get('/health', (req, res) => {
    res.json({
        status: 'healthy',
        service: 'MANAS360 Session Analytics API',
        version: '1.0.0',
        timestamp: new Date().toISOString()
    });
});

// =========================================
// Test Token Generation (Development Only)
// =========================================
if (process.env.NODE_ENV !== 'production') {
    app.get('/api/test-token', (req, res) => {
        const testAdmin = {
            id: 'a1111111-1111-1111-1111-111111111111',
            email: 'admin@manas360.com',
            fullName: 'Admin User',
            role: 'admin'
        };
        const token = generateToken(testAdmin);
        res.json({
            success: true,
            token,
            user: testAdmin,
            usage: 'Add to Authorization header as: Bearer <token>'
        });
    });
}

// =========================================
// API Routes
// =========================================
app.use('/api/analytics', analyticsRoutes);
app.use('/api/v1/admin', adminRoutes);

// =========================================
// 404 Handler
// =========================================
app.use((req, res) => {
    res.status(404).json({
        success: false,
        error: 'Endpoint not found',
        availableEndpoints: [
            'GET /health',
            'GET /api/analytics/overview',
            'GET /api/analytics/sessions',
            'GET /api/analytics/outcomes',
            'GET /api/analytics/therapists',
            'GET /api/analytics/trends',
            'GET /api/analytics/dropoff',
            'GET /api/analytics/export/excel',
            'GET /api/analytics/export/pdf'
        ]
    });
});

// =========================================
// Error Handler
// =========================================
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(err.status || 500).json({
        success: false,
        error: process.env.NODE_ENV === 'production'
            ? 'Internal server error'
            : err.message
    });
});

// =========================================
// Start Server
// =========================================
const startServer = async () => {
    try {
        await testConnection();

        app.listen(PORT, () => {
            console.log(`
╔══════════════════════════════════════════════════╗
║   MANAS360 Session Analytics API                  ║
║   Story 3.6: Session Analytics                   ║
╠══════════════════════════════════════════════════╣
║   Server running on: http://localhost:${PORT}       ║
║   Environment: ${process.env.NODE_ENV || 'development'}                      ║
║                                                  ║
║   Endpoints:                                     ║
║   • GET /api/analytics/overview                  ║
║   • GET /api/analytics/sessions                  ║
║   • GET /api/analytics/outcomes                  ║
║   • GET /api/analytics/therapists                ║
║   • GET /api/analytics/trends                    ║
║   • GET /api/analytics/dropoff                   ║
║   • GET /api/analytics/export/excel              ║
║   • GET /api/analytics/export/pdf                ║
╚══════════════════════════════════════════════════╝
            `);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};

startServer();

module.exports = app;
