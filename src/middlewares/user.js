const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
    


const isUser = async (req, res, next) => {
    const token = req.body.token;
    if(!token){
        res.status(401).json({ message: 'Token missing' });
    }
    const decoded = jwt.decode(token);
    const findUser = await User.findById(decoded.sub);
    const userRole = findUser.role;
    if(userRole === 'user'){
        next();
    }
    else{
        res.status(401).json({ message: 'Unauthorized' });
    }

}

    module.exports = isUser;