import UserModel from "../Models/UserModel.js";
import JWT from 'jsonwebtoken'

export const AuthMiddleWare = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: "No token, authorization denied" });
        }
        const decode = JWT.verify(token, process.env.JWT_SECRET);
        req.user = await UserModel.findById(decode.id).select("-password");
        next();
    } catch (error) {
        res.status(401).json({ message: "Token is not valid" });

    }
}