import StudentLoginModel from "../../Models/StudentModel/StudentLoginModel.js";
import bcrypt from 'bcrypt'
import JWT from 'jsonwebtoken'


// Registeration API
export const StudentRegisterCon = async (req, res) => {

    const { name, email, password } = req.body;

    try {
        const emailExists = await StudentLoginModel.findOne({ email })
        if (emailExists) {
            return res.json({ success: false, message: "Email already Exists!!" });
        }
        const hashPassword = await bcrypt.hash(password, 10);
        const student = await StudentLoginModel.create({
            name: name, email: email, password: hashPassword
        })

        const Token = JWT.sign({ id: student._id }, process.env.JWT_SECRET);

        res.cookie('token', Token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',

            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 2 * 60 * 1000,
        });

        res.json({ success: true, message: "Successfully Registered" })

    } catch (error) {
        console.error('Login Error:', error);
        res.status(403).json({ success: false, message: 'Cant Register', error: error.message });

    }

};


// Login APi

export const StudentLoginCon = async (req, res) => {
    const { email, password } = req.body;
    try {

        const checkEmail = await StudentLoginModel.findOne({ email });

        if (!checkEmail) {
            return res.json({ success: false, message: "User Not Found!!!" });
        }

        const checkPassword = await bcrypt.compare(password, checkEmail.password);
        if (!checkPassword) {
            return res.json({ success: false, message: "Wrong Password ,Login Again" });
        }

        const Token = JWT.sign({ id: checkEmail._id }, process.env.JWT_SECRET);

        res.cookie('token', Token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 2 * 60 * 1000,
        });

        res.json({ success: true, message: "Successfully Login", })
    } catch (error) {
        console.error('Login Error:', error);
        res.status(403).json({ success: false, message: 'Cant Login', error: error.message });

    }
}

export const StudentLogOutCon = async (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 2 * 60 * 1000,
        });
        res.json({ success: true, message: "Logout Successfully" })
    } catch (error) {
        console.error('Login Error:', error);
        res.status(403).json({ success: false, message: 'Cant Logout', error: error.message });

    }
}


