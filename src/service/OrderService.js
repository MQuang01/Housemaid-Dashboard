import axios from "axios"
import { InforUrl } from "../until/InforUrl"

export const fetchDataOrder = async () => {
    try {
        const response = await axios.get(`${InforUrl}/orders`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("accessToken")}`
            }
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data); // Ném ra một Error với thông báo lỗi từ máy chủ
    }
}

export const updateStatusOrder = async (id, status) => {
    try {
        const response = await axios.put(`${InforUrl}/orders/update-status/${id}?status=${status}`, "",{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("accessToken")}`
            }
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data)
    }
}