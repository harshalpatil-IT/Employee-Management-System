const pool = require('../config/db');

const getEmployees = async (
    page = 1,
    limit = 5,
    search = '',
    department = ''
) => {

    const offset = (page - 1) * limit;

    let query = `
        SELECT *
        FROM employees
        WHERE 1=1
    `;

    let countQuery = `
        SELECT COUNT(*) AS total
        FROM employees
        WHERE 1=1
    `;

    const values = [];
    let index = 1;

    // Search by employee name
    if (search) {

        query += ` AND employee_name ILIKE $${index}`;
        countQuery += ` AND employee_name ILIKE $${index}`;

        values.push(`%${search}%`);

        index++;

    }

    // Filter by department
    if (department) {

        query += ` AND department = $${index}`;
        countQuery += ` AND department = $${index}`;

        values.push(department);

        index++;

    }

    query += `
        ORDER BY employee_id
        LIMIT $${index}
        OFFSET $${index + 1}
    `;

    values.push(limit);
    values.push(offset);

    const employeeResult = await pool.query(query, values);

    const countValues = values.slice(0, values.length - 2);

    const countResult = await pool.query(
        countQuery,
        countValues
    );

    return {

        employees: employeeResult.rows,

        total: parseInt(countResult.rows[0].total)

    };

};
const getAllEmployeesForExport = async (search = '', department = '') => {

    let query = `
        SELECT *
        FROM employees
        WHERE 1=1
    `;

    const values = [];
    let index = 1;

    // Search
    if (search) {

        query += ` AND employee_name ILIKE $${index}`;

        values.push(`%${search}%`);

        index++;

    }

    // Department Filter
    if (department) {

        query += ` AND department = $${index}`;

        values.push(department);

        index++;

    }

    query += ` ORDER BY employee_id`;

    const result = await pool.query(query, values);

    return result.rows;

};
const getEmployeeById = async (id) => {

    const result = await pool.query(

        `SELECT *
         FROM employees
         WHERE employee_id = $1`,

        [id]

    );

    return result.rows[0];

};

const addEmployee = async (employee) => {

    const {
        employee_name,
        email,
        department,
        phone,
        status_flag,
        joining_date
    } = employee;

    await pool.query(

        `INSERT INTO employees
        (
            employee_name,
            email,
            department,
            phone,
            status_flag,
            joining_date
        )
        VALUES
        (
            $1,$2,$3,$4,$5,$6
        )`,

        [
            employee_name,
            email,
            department,
            phone,
            status_flag,
            joining_date
        ]

    );

};

const updateEmployee = async (id, employee) => {

    const {
        employee_name,
        email,
        department,
        phone,
        status_flag,
        joining_date
    } = employee;

    await pool.query(

        `UPDATE employees
         SET
            employee_name=$1,
            email=$2,
            department=$3,
            phone=$4,
            status_flag=$5,
            joining_date=$6
         WHERE employee_id=$7`,

        [
            employee_name,
            email,
            department,
            phone,
            status_flag,
            joining_date,
            id
        ]

    );

};

const deleteEmployee = async (id) => {

    await pool.query(

        `DELETE FROM employees
         WHERE employee_id=$1`,

        [id]

    );

};

module.exports = {

    getEmployees,
    getAllEmployeesForExport,
    getEmployeeById,
    addEmployee,
    updateEmployee,
    deleteEmployee

};