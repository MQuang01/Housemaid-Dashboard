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