// ================================================
// MANAS360 Session Analytics - Database Configuration
// Story 3.6: Session Analytics
// ================================================

const { Sequelize } = require('sequelize');

console.log('Database Config:', {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    database: process.env.DB_NAME || 'manas360',
    user: process.env.DB_USER || 'postgres',
    password_length: (process.env.DB_PASS || 'password').length
});

const sequelize = new Sequelize(
    process.env.DB_NAME || 'manas360',
    process.env.DB_USER || 'postgres',
    process.env.DB_PASS || 'password',
    {
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 5432,
        dialect: 'postgres',
        logging: console.log, // Ensure logging is on to see connection attempts
        pool: {
            max: 10,
            min: 0,
            acquire: 30000,
            idle: 10000
        },
        define: {
            timestamps: true,
            underscored: true,
            freezeTableName: true
        }
    }
);

const testConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log('✅ Database connection established successfully.');
    } catch (error) {
        console.error('❌ Unable to connect to database:', error.message);
    }
};

module.exports = { sequelize, testConnection };
