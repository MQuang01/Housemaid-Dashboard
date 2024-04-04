import axios from "axios";
import { InforUrl } from "../until/InforUrl";

export const Login = async (username, password) => {
    try {
        const response = await axios.post(
            `${InforUrl}/auths/login`, {
                username: username,
                password: password,
            });
        sessionStorage.setItem("accessToken", response.data);
        console.log(response.data, "Token");
        return true;
    } catch (error) {
        return false;
    }
}
export const Logout = () => {
    sessionStorage.removeItem("admin");
}
