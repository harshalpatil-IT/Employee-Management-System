const employeeService = require('../services/employeeService');

const getEmployees = async (req, res) => {

    try {

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5;

        const search = req.query.search || '';
        const department = req.query.department || '';

        const result = await employeeService.getEmployees(

            page,
            limit,
            search,
            department

        );

        res.status(200).json({

            employees: result.employees,

            total: result.total,

            page,

            limit,

            totalPages: Math.ceil(result.total / limit)

        });

    } catch (error) {

        console.error(error);

        res.status(500).json({

            message: "Internal Server Error"

        });

    }

};

const exportEmployees = async (req, res) => {

    try {

        const search = req.query.search || '';
        const department = req.query.department || '';

        const employees = await employeeService.getAllEmployeesForExport(
            search,
            department
        );

        res.status(200).json(employees);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Internal Server Error"
        });

    }

};
const getEmployeeById = async (req, res) => {

    try {

        const { id } = req.params;

        const employee = await employeeService.getEmployeeById(id);

        if (!employee) {

            return res.status(404).json({
                message: "Employee Not Found"
            });

        }

        res.status(200).json(employee);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Internal Server Error"
        });

    }

};

const addEmployee = async (req, res) => {

    try {

        const {
            employee_name,
            email,
            department,
            phone,
            status_flag,
            joining_date
        } = req.body;

        // Basic Validation
        if (
            !employee_name ||
            !email ||
            !department ||
            !phone ||
            !status_flag ||
            !joining_date
        ) {

            return res.status(400).json({
                message: "All fields are required"
            });

        }

        await employeeService.addEmployee(req.body);

        res.status(201).json({
            message: "Employee Added Successfully"
        });

    }
    catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Internal Server Error"
        });

    }

};

const updateEmployee = async (req, res) => {

    try {

        const { id } = req.params;

        const {
            employee_name,
            email,
            department,
            phone,
            status_flag,
            joining_date
        } = req.body;

        // Validation
        if (
            !employee_name ||
            !email ||
            !department ||
            !phone ||
            !status_flag ||
            !joining_date
        ) {

            return res.status(400).json({
                message: "All fields are required"
            });

        }

        await employeeService.updateEmployee(id, req.body);

        res.status(200).json({
            message: "Employee Updated Successfully"
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Internal Server Error"
        });

    }

};

const deleteEmployee = async (req, res) => {

    try {

        const { id } = req.params;

        await employeeService.deleteEmployee(id);

        res.status(200).json({
            message: "Employee Deleted Successfully"
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Internal Server Error"
        });

    }

};
module.exports = {

    getEmployees,
    exportEmployees,
    getEmployeeById,
    addEmployee,
    updateEmployee,
    deleteEmployee

};