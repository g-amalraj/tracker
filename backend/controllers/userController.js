import mongoose from 'mongoose';
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';


const authUser = async (req, res) => {
    try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {

        const token = generateToken(res, user._id);
        res.status(200).json({  _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token : token   
           
    });
    } else {
        res.status(401);
        throw new Error('Invalid email or password');
    }

}catch(error){
    console.error(`Error fetching data: ${error.message}`); 
}
}


const registerUser = async (req, res) => {
    try {
    const { name, email, password , isAdmin, phone, place, role,address,manager,profileImageUrl} = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }
    console.log(role)
    const user = await User.create({name,email,password,isAdmin,phone,place,role,address, manager,profileImageUrl});
    if (user !== userExists) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            password: user.password,
            isAdmin: user.isAdmin,
            phone: user.phone,
            place: user.place,
            role: user.role,
            profileImageUrl:user.profileImageUrl,
            manager: user.manager

        })
        
    } 
    else {
        res.status(400);
        throw new Error('Invalid user data')
    }
} catch(error){
    console.error(`Error fetching data: ${error.message}`); 
}
}


const getUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ data: user });
    } catch (error) {
       
        console.error(`Error fetching data: ${error.message}`); 
    }
};

// @desc Logout user / clear cookie
// @route POST /api/users/logout
// @access Private
const logoutUser = async (req, res) => {
    
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0)
    });

    res.status(200).json({ message: 'Logged out successfully'});
};

const updateUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const userDetails = req.body;
        console.log(userDetails);
        let user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        user = await User.findByIdAndUpdate(userId, userDetails, { new: true });
        res.status(200).json({ success: true, data: user });
    } catch (error) {
        console.log(error)
        
    }
}

const getUsers = async (req, res) => {
    try {
        const user = await User.find({})
        res.status(200).json(user)
    } catch (error) {
    console.error(`Error fetching data: ${error.message}`); 
    }
}
const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        await User.findByIdAndDelete(userId);
        res.status(200).json({ success: true, message: 'User deleted successfully' });
    } catch (error) {
         console.error(`Error fetching data: ${error.message}`); 
    }
}



export {
    authUser,
    registerUser,
    logoutUser,
    getUsers,
    getUser,
    updateUser,
    deleteUser
}