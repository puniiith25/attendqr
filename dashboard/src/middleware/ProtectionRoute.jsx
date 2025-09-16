import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

const ProtectedRoute = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [isAuth, setIsAuth] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await axios.get("http://localhost:8000/details/me", {
                    withCredentials: true,
                });

                if (res.data.success && res.data.user) {
                    setIsAuth(true);
                    setIsAdmin(res.data.user.role === "admin");
                } else {
                    setIsAuth(false);
                }
            } catch (error) {
                setIsAuth(false);
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, []);

    if (loading) return <div>Loading...</div>;

    if (!isAuth) return <Navigate to="/login" replace />;
    if (!isAdmin) return <Navigate to="/login" replace />;

    return children;
};

export default ProtectedRoute;
