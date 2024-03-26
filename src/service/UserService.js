import axios from "axios";
import {InforUrl} from "../until/InforUrl";

export const fetchCustomersPaging = async (page) => {
    try {
        const response = await axios.get(`${InforUrl}/dash-boards/customers?page=${page}&size=4`);
        return response.data;
    } catch (error) {
        console.error('Error fetching data: ', error);
    }
}