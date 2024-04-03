import Footer from "../footer/Footer";
import React, { useEffect, useState } from 'react';
import LoadingModal from '../loading/LoadingModal'
import { fetchDataOrder, updateStatusOrder } from "../../service/OrderService";
import { toast } from "react-toastify";
import ModelDetailOrder from "../modal/ModelDetailOrder";

const LayoutManagerOrder = () => {
    const [loading, setLoading] = useState(false);
    const [dataOrders, setDataOrders] = useState([]);
    const [showDetaiOrderModal, setShowDetaiOrderModal] = useState(false);
    const [orderDetail, setOrderDetail] = useState(null)


    //Update status Process or Cancel
    const handleUpdateStatusOrder = async (id, status) => {
        setLoading(true);
        try {
            const  response = await updateStatusOrder(id, status);
            toast.success(response)
            const data = await fetchDataOrder();
            setDataOrders(data.content)
        } catch (error) {
            toast.error("Sửa trạng thái order bị lỗi: " + error.message)
        } finally {
            setLoading(false)
        }
    }

    //Show detail order by id
    const handleShowDetailOrderClick = (id) => {
        // Tìm đơn hàng với id tương ứng
        const order = dataOrders.find(data => data.id === id);
        if (order) { // Kiểm tra nếu đơn hàng tồn tại
            setOrderDetail(order); // Cập nhật thông tin đơn hàng
            setShowDetaiOrderModal(true); // Hiển thị modal
        }
    }

    const fetchData = async () => {
        try {
            const data = await fetchDataOrder();
            setDataOrders(data.content);
            console.table(data.content);
        } catch(error) {
            toast.error("Lấy data Order thất bại, error: " + error.message);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        setLoading(true);
        fetchData();
    }, []);

    return (
        <>  
            <LoadingModal loading={loading}/>
            <div className="layout-page">

                <div className="content-wrapper">
                    <div className="container-xxl flex-grow-1 container-p-y">
                        <h4 className="fw-bold py-3 mb-2"><span className="text-muted fw-light">Dữ liệu /</span> Lịch sử đơn hàng</h4>

                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Tìm kiếm..."
                            />
                        </div>
                        <div className="card">
                            
                            <div className="table-responsive text-nowrap">
                                <table className="table table-light table-hover text-center">
                                    <thead>
                                        <tr>
                                            <th>STT</th>
                                            <th>Mã đơn</th>
                                            <th>Địa chỉ làm việc</th>
                                            <th>Tổng giá tiền</th>
                                            <th>Ngày giờ làm việc</th>
                                            <th>Trạng thái đơn</th>
                                            <th>Lựa chọn</th>
                                        </tr>
                                    </thead>
                                    <tbody className="table-border-bottom-0 ">
                                    {dataOrders.filter((item) => item.status === "WAITING").map((item, index) => (
                                        <tr key={item.id}>
                                            <td>{index + 1}</td>
                                            <td>{item.currentlyCode}</td>
                                            <td>{item.address}</td>
                                            <td>{item.totalPrice}</td>
                                            <td>{item.workDay} : {item.timeStart} giờ</td>
                                            <td>{item.status === "WAITING" ? "Đang chờ xử lý" : ""}</td>
                                            <td>
                                                <div className="">
                                                    <button 
                                                        onClick={() => handleShowDetailOrderClick(item.id)}
                                                        className="fa-solid fa-eye text-info" title="Xem chi tiết hóa đơn"></button>
                                                    <button
                                                        variant="outline-success"
                                                        onClick={() => {
                                                            const isConfirmed = window.confirm("Bạn muốn chấp nhận đơn hàng có mã: " + item.currentlyCode + " này?");
                                                            if (isConfirmed) {
                                                                handleUpdateStatusOrder(item.id, "PROCESS")
                                                        }}}
                                                        className="fa-solid fa-check text-success" title="Chấp nhận đơn hàng"></button>
                                                    <button
                                                        onClick={() => {
                                                            const isConfirmed = window.confirm("Bạn muốn hủy đơn hàng có mã: " + item.currentlyCode + " này?");
                                                            if (isConfirmed) {
                                                                handleUpdateStatusOrder(item.id, "CANCEL")
                                                            }}}
                                                        className="fa-solid fa-xmark text-danger" title="Hủy bỏ đơn hàng"></button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                        
                                    </tbody>
                                </table>
                                <ModelDetailOrder
                                    show={showDetaiOrderModal}
                                    data={orderDetail}
                                    handleClose={() => setShowDetaiOrderModal(false)}
                                    handleUpdateStatusOrder={handleUpdateStatusOrder}
                                />
                            </div>
                        </div>

                    </div>
                    <Footer />
                    <div className="content-backdrop fade"></div>
                </div>

            </div>
        </>
    )
}
export default LayoutManagerOrder;