import express from 'express'
import UserModel from '../Models/UserModel.js';
import JWT from 'jsonwebtoken'
import Bcrypt from 'bcrypt'

// Registeration API

export const userRegister = async (req, res) => {
    const { name, email, password, role, StudentRollNO, Employeid, study_year, branch, department } = req.body;

    try {
        if (req.user.role != 'admin') {
            return res.json({ success: false, message: 'Admin only create account' });

        }


        const existinguser = await UserModel.findOne({ email });
        if (existinguser) {
            return res.json({ sucsess: false, message: "user already exist" });
        }
        if (role === "student") {
            if (!StudentRollNO) {
                return res.json({ success: false, message: " Please Enter Student Roll Number" })

            }
            const existsRollNO = await UserModel.findOne({ StudentRollNO })
            if (existsRollNO) {
                return res.json({ success: false, message: "Student Roll Number is Aready Exists!!" })
            }
            if (!study_year) {
                return res.json({ success: false, message: "Please Enter year (1st year...)!!" })
            }
            if (!branch) {
                return res.json({ success: false, message: "Please Enter Branch!!" })
            }

        }

        if (role === "teacher") {
            if (!Employeid) {
                return res.json({ success: false, message: " Please Enter Employe ID" })

            }
            const existsEP_ID = await UserModel.findOne({ Employeid })
            if (existsEP_ID) {
                return res.json({ success: false, message: "Employe ID is Aready Exists!!" })
            }

            if (!department) {
                return res.json({ success: false, message: "Please Enter Department!!" })
            }

        }



        const hashpassword = await Bcrypt.hash(password, 10);

        const user = await UserModel.create({
            name: name,
            email: email,
            password: hashpassword,
            role: role,
            StudentRollNO: StudentRollNO,
            Employeid: Employeid,
            study_year: study_year,
            branch: branch,
            department: department

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
        res.json({
            success: true, message: "Login successful", role: user.role, user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                branch: user.branch,
                department: user.department
            }
});
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error", error: error.message });

    }

}

export const logout = async (req, res) => {
    res.clearCookie("token");
    res.json({ success: true, message: "Logged out successfully" });
};