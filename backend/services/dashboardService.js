const pool = require('../config/db');

const getDashboardData = async () => {

    const totalEmployees = await pool.query(
        "SELECT COUNT(*) FROM employees"
    );

    const activeEmployees = await pool.query(
        "SELECT COUNT(*) FROM employees WHERE status_flag='A'"
    );

    const inactiveEmployees = await pool.query(
        "SELECT COUNT(*) FROM employees WHERE status_flag='I'"
    );

    return {

        totalEmployees: Number(totalEmployees.rows[0].count),

        activeEmployees: Number(activeEmployees.rows[0].count),

        inactiveEmployees: Number(inactiveEmployees.rows[0].count)

    };

};

module.exports = {
    getDashboardData
};