import axios from "axios";
import {InforUrl} from "../until/InforUrl";

export const fetchCustomersPaging = async (page) => {
    try {
        const response = await axios.get(`${InforUrl}/dash-boards/customers?page=${page}&size=5`);
        return response.data;
    } catch (error) {
        console.error('Error fetching data: ', error);
    }
}

export const fetchAddCustomerFormData = async (frmData) => {
    try {
        // const accessToken = localStorage.getItem('access_token');
        const response = await axios.post(`${InforUrl}/auths/register`, frmData, {
            headers: {
                'Content-Type': 'multipart/form-data'
                // 'Authorization': 'Bearer ' +
            }
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data); // Ném ra một Error với thông báo lỗi từ máy chủ
    }
}

export const fetchDeleteCustomer = async (jobId) => {
    try {
        const response = await axios.delete(`${InforUrl}/users/${jobId}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting customer: ', error);
    }
}
