import jwt from "jsonwebtoken";
import User from '../models/userModel.js';


// Protect routes
const protect = async (req, res, next) => {
    let token = req.headers.authorization.split(' ')[1];

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.userId).select('-password');
            next();
        } catch (error) {
            console.log(error);
            res.status(401);
            throw new Error('Not authorized, token failed')
        }
    } else {
        
        res.status(401).json({ message: "Unauthorized" });
       
     }}
//  

// Admin middleware
const admin = async(req, res, next) => {
    if (req.user && req.user.isAdmin){
        next();
    } else {
        res.status(401).json({message: "Not authorized as admin"})
    }
};

export { protect, admin };