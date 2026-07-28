const express = require('express');
const cors = require('cors');

const employeeRoutes = require('./routes/employeeRoutes');
const authRoutes = require('./routes/authRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const app = express();

app.use(cors());
app.use(express.json());

app.use('/employees', employeeRoutes);

app.use('/auth', authRoutes);
app.use('/dashboard', dashboardRoutes);
module.exports = app;