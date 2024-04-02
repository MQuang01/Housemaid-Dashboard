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
        const response = await axios.post(`${InforUrl}/dash-boards/customers`, frmData, {

            headers: {
                'Content-Type': 'multipart/form-data' // Đặt kiểu dữ liệu content-type là 'multipart/form-data'
            }
        });
        console.log("frmData",frmData);
        return response.data;
    } catch (error) {
        console.error('Error adding customer: ', error);
    }
}

export const fetchDeleteCustomer = async (jobId) => {
    try {
        const response = await axios.delete(`${InforUrl}/dash-boards/customers/${jobId}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting customer: ', error);
    }
}
