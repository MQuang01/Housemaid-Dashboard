import axios from "axios";
import {InforUrl} from "../until/InforUrl";

export const fetchJobsPaging = async (page) => {
    try {
        const response = await axios.get(`${InforUrl}/jobs?page=${page}&size=10`);
        return response.data;
    } catch (error) {
        console.error('Error fetching data: ', error);
    }
}

export const fetchAddJob = async (jobData) => {
    try {
        const response = await axios.post(`${InforUrl}/jobs`, jobData);
        return response.data;
    } catch (error) {
        console.error('Error adding job: ', error);
    }
}
export const fetchAddJobFormData = async (frmData) => {
    try {
        const response = await axios.post(`${InforUrl}/jobs`, frmData, {
           
        headers: {
            'Content-Type': 'multipart/form-data' // Đặt kiểu dữ liệu content-type là 'multipart/form-data'
        }
        });
        console.log("frmData",frmData);
        return response.data;
    } catch (error) {
        console.error('Error adding job: ', error);
    }
}

