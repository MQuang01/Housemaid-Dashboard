import React, {createContext, useContext, useEffect, useState} from "react";
import { Logout } from "../service/AuthService";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("accessToken"));
    useEffect(() => {
        if(localStorage.getItem('accessToken')){
            setIsLoggedIn(true)
        }
    }, []);
    const login = () => {
        setIsLoggedIn(true)
    }
    const logout = () => {
        Logout();
        setIsLoggedIn(false)
    }

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);

