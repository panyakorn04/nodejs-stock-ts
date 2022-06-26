import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { AuthLoginBodyRequest,
    AuthRegisterBodyRequest,
    AuthLoginBodyResponse,
    AuthRefreshTokenResponse } from '../types/auth';
const User = require('../models/User');

exports.register = async(req: any, res: any) => {
    try{
       // Check if user is already exist
       const { username, email, password } = req.body;
       var user = await User.findOne({ email });
        if (user) {
        return  res.status(400).json({ message: "User already exist" });
        }
        const salt = await bcrypt.genSalt(10);
        user = new User({
            username,
            email,
            password: await bcrypt.hash(password, salt)
        })
        await user.save();
        res.status(201).json({ message: "User created" });
       // Encrypt password
    }catch(err){
        console.log(err);
        res.status(500).send({message: "Server Error"});
    }
}

exports.login = async (req: any, res: any) => {
    try{
    const user = await User.findOneAndUpdate({ email: req.body.email }, { $set: { enabled: true } });
    console.log(user)
    if (user && user.enabled) {
        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if (isMatch) {
            // Payload
            const payload = {
                user: {
                    username: user.username,
                    role: user.role
                }
            }
            // Sign token
            jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: 3600
            }, (err: any, token: any) => { if (err) throw err;
                res.json({ token, payload })
            });
        } else {
            res.status(400).json({ message: "Wrong password" });
        }
    }else { 
        return res.status(400).json({ message: "User not found" });
    }
    }catch(err) {
        console.log(err);
        res.status(500).json({message: "Server Error"});
    }
}

exports.listUser = async(req: any, res: any) => {
    try{
        res.send("Hello API World post listUser!");
    }catch(err){
        console.log(err);
        res.status(500).json({message: "Server Error"});
    }
}


exports.editUser = async(req: any, res: any) => {
    try{
        res.send("Hello API World post editUser!");
    }catch(err){
        console.log(err);
        res.status(500).json({message: "Server Error"});
    }
}

exports.deleteUser = async(req: any, res: any) => {
    try{
        res.send("Hello API World post deleteUser!");
    }catch(err){
        console.log(err);
        res.status(500).json({message: "Server Error"});
    }
}