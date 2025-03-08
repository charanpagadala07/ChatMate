import cloudinary from "../lib/cloudinary.js";
import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";


export const signup = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({ error: "All fields are required" });
        }
        if(password.length < 6){
            return res.status(400).json({ error: "Password must be at least 6 characters" });
        }

        const user = await User.findOne({ email });
        if(user) return res.status(400).json({ error: "User already exists" });
        
        const salt = await bcrypt.genSalt(10);
        const hashedpassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: hashedpassword,
        });

        if(newUser){
            //generate token here
            generateToken(newUser._id, res);
            await newUser.save();

            res.status(201).json({
                _id: newUser._id,
                username: newUser.username,
                email: newUser.email,
                profilePic: newUser.profilePic
            });
            
        } else {
            res.status(400).json({ error: "Invalid user data" });
        }
    } catch (error) {
        console.log("error in signup", error.message);
        res.status(500).json({message:"Internal server error"});
    }
    
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: "All fields are required" });
    }
    const user = await User.findOne({ email });
    if(!user) return res.status(400).json({ error: "User does not exist or Invalid Credentials" });

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if(!isPasswordCorrect) return res.status(400).json({ error: "Invalid Credentials" });

    generateToken(user._id, res);

    res.status(200).json({
        _id: user._id,
        username: user.username,
        email: user.email,
        profilePic: user.profilePic
    });

    } catch (error) {
        console.log("error in login", error.message);
        res.status(500).json({message:"Internal server error"});
    }
};

export const logout = (req, res) => {
    try {
        res.cookie("jwt","", {maxAge:0});
        res.status(201).json({message:"logout successfully"});
    } catch (error) {
        console.log("error in logout", error.message);
        res.status(500).json({message:"Internal server error"});
        
    }
};

export const updateProfile = async (req, res) => {
    try {
        const {profilePic} = req.body;
    const userId = req.user._id;
    if(!profilePic){
        return res.status(400).json({message:"Profile pic in mandatory"})
    }

    const uploadResponse = await cloudinary.uploader.upload(profilePic)
    const updatedUser = await User.findByIdAndUpdate(userId, {profilePic: uploadResponse.secure_url}, {new: true});
    if(!updatedUser){
        return res.status(400).json({message:"User not found"})
    }
    } catch (error) {
        console.log("error in updating profile", error.message);
        res.status(500).json({message:"Internal server error"});
    }
}

export const checkAuth = (req, res) => {
    try {
        res.status(200).json(req.user);
    } catch (error) {
        console.log("error in checking auth", error.message);
        res.status(500).json({message:"Internal server error"});        
    }
}