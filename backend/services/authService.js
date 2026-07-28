const pool = require('../config/db');

const login = async (username, password) => {

    const result = await pool.query(
        `SELECT * FROM users
         WHERE username = $1
         AND password = $2
         AND status_flag = 'A'`,
        [username, password]
    );

    return result.rows[0];
};

module.exports = {
    login
};