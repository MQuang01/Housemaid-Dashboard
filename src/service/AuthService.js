import axios from "axios";
import { InforUrl } from "../until/InforUrl";

export const Login = async (username, password) => {
    try {
        const response = await axios.post(
            `${InforUrl}/auths/login`, {
                username: username,
                password: password,
            });
        localStorage.setItem("accessToken", response.data);
        return true;
    } catch (error) {
        return false;
    }
}
export const Logout = () => {
    localStorage.removeItem("admin");
}
