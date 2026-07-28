const authService = require('../services/authService');
const { generateToken } = require('../utils/jwt');

const login = async (req, res) => {

    try {

        const { username, password } = req.body;

        if (!username || !password) {

            return res.status(400).json({
                message: "Username and Password are required"
            });

        }

        const user = await authService.login(username, password);

        if (!user) {

            return res.status(401).json({
                message: "Invalid Username or Password"
            });

        }

    const token = generateToken(user);

res.status(200).json({

    message: "Login Successful",

    token: token,

    user: {

        userId: user.user_id,

        username: user.username,

        fullName: user.full_name,

        role: user.role

    }

});

    }

    catch (error) {

        console.error(error);

        res.status(500).json({

            message: "Internal Server Error"

        });

    }

};

module.exports = {
    login
};