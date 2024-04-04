import axios from "axios";
import {InforUrl} from "../until/InforUrl";

export const fetchEmployeesPaging = async (page) => {
    try {
        const response = await axios.get(`${InforUrl}/dash-boards/employees?page=${page}&size=5`);
        return response.data;
    } catch (error) {
        console.error('Error fetching data: ', error);
    }
}

export const fetchAddEmployeeFormData = async (frmData) => {
    try {
        const response = await axios.post(`${InforUrl}/auths/register`, frmData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data); // Ném ra một Error với thông báo lỗi từ máy chủ
    }
}
export const fetchUpdateEmployee = async (employeeId, employeeData) => {
    console.log("employeeData trong API",employeeData);
    try {
        const response = await axios.put(`${InforUrl}/dash-boards/${employeeId}`, employeeData);
        return response.data;
    } catch (error) {
        console.error('Error updating employee: ', error);
        throw error; // Ném lỗi để xử lý ở phần gọi API
    }
};

export const fetchDeleteEmployee = async (employeeId) => {
    try {
        const response = await axios.delete(`${InforUrl}/users/${employeeId}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting Employee: ', error);
    }
}
export const fetchFindEmployeeById = async (jobId) => {
    try {
        const response = await axios.get(`${InforUrl}/dash-boards/${jobId}`);
        return response.data;
    } catch (error) {
        console.error('Error finding Employee: ', error);
    }
}
