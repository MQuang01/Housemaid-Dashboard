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
        const response = axios.post(`${InforUrl}/jobs`, frmData, {
           
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

export const fetchDeleteJob = async (jobId) => {
    try {
        const response = await axios.delete(`${InforUrl}/jobs/${jobId}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting job: ', error);
    }
}

export const fetchUpdateJob = async (jobId, jobData) => {
    console.log("jobData",jobData);
    try {
        const response = await axios.put(`${InforUrl}/jobs/${jobId}`, jobData);
        return response.data;
    } catch (error) {
        console.error('Error updating job: ', error);
        throw error; // Ném lỗi để xử lý ở phần gọi API
    }
};

export const fetchCategory = async () => {
    try {
        const response = await axios.get(`${InforUrl}/categories`);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data)
    }
};