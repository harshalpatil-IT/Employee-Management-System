const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
});

// Test Connection
pool.connect()
    .then(client => {
        console.log("✅ PostgreSQL Connected Successfully");
        client.release();
    })
    .catch(err => {
        console.error("❌ Database Connection Error");
        console.error(err.message);
    });

module.exports = pool;