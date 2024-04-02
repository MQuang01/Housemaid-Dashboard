import {InforUrl} from "../until/InforUrl";
import axios from "axios";

export const fetchCategories = async () => {
    try{
        const response = await axios.get(`${InforUrl}/categories/all`);
        return response.data;
    } catch (error){
        console.error('Error fetching data: ', error);
    }
}
export const fetchAddCategoryFormData = async (frmData) => {
    try {
        const response = await axios.post(`${InforUrl}/categories`, frmData, {

            headers: {
                'Content-Type': 'multipart/form-data' // Đặt kiểu dữ liệu content-type là 'multipart/form-data'
            }
        });
        console.log("frmData", frmData);
        return response.data;
    } catch (error) {
        console.error('Error adding category: ', error);
    }
}

export const fetchDeleteCategoryById = async (id) => {
    try {
        const response = await axios.delete(`${InforUrl}/categories/${id}`);
        console.log("delete:",id);
        return response.data;
    } catch (error) {
        console.error('Error adding category: ', error);
    }
}

export const getCategoryById = async (id) => {
    try{
        const response = await axios.get(`${InforUrl}/categories/${id}`);
        return response.data;
    } catch (error){
        console.error('Error collect data: ', error);
    }
}