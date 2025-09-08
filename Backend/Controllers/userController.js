import express from 'express'
import UserModel from '../Models/UserModel.js';
import JWT from 'jsonwebtoken'
import Bcrypt from 'bcrypt'

// Registeration API

export const userRegister = async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
        if (req.user.role != 'admin') {
            return res.json({ success: false, message: 'Admin only create account' });

        }

        const existinguser = await UserModel.findOne({ email });
        if (existinguser) {
            return res.json({ sucsess: false, message: "user already exist" });
        }

        const hashpassword = await Bcrypt.hash(password, 10);

        const user = await UserModel.create({
            name: name,
            email: email,
            password: hashpassword,
            role: role
        });

        res.json({ success: true, message: `${role}Successfully Registerd` });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }

}

export const Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }

        const isMatch = await Bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({ success: false, message: "Invalid password" });
        }
        const token = JWT.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
            expiresIn: "2h",
        });
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 2 * 60 * 60 * 1000,
        });
        res.json({ success: true, message: "Login successful", role: user.role });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error", error: error.message });

    }

}

export const logout = async (req, res) => {
    res.clearCookie("token");
    res.json({ success: true, message: "Logged out successfully" });
};