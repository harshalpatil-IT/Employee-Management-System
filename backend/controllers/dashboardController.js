const dashboardService = require('../services/dashboardService');

const getDashboardData = async (req, res) => {

    try {

        const dashboard = await dashboardService.getDashboardData();

        res.status(200).json(dashboard);

    }

    catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Internal Server Error"
        });

    }

};

module.exports = {
    getDashboardData
};