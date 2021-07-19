require('dotenv').config();
const jwt = require("jsonwebtoken");
const Student = require("../models/students");


const auth = async(req,res,next) => {
    try {
        const token = req.cookie.restjwt;
        const verifyUser = jwt.verify(token,process.env.SECRET_KEY);
        console.log("Verifying User Using cookie and token",verifyUser);
        next();
    } catch (error) {
        res.status(401).send(error)
    }
}

module.exports = auth;