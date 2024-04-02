import Nav from "../navbar/Nav";
import Footer from "../footer/Footer";
import React, { useState, useEffect } from 'react';
import Pagination from "../pagination/Pagination";
import { fetchCustomersPaging, fetchDeleteCustomer } from "../../service/UserService";
import { toast } from 'react-toastify';
import ModalCreateCustomer from "../modal/ModalCreateCustomer";

const LayoutPage = () => {
    const [loading, setLoading] = useState(false);
    const [customer, setCustomer] = useState([]);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [userToDeleteId, setUserToDeleteId] = useState(null);

    const [dataPage, setDataPage] = useState(
        {
            page: 0,
            totalPage: 0
        }
    );
    const defaultImageUrl = "https://bom.so/KozLmH"


    const handleShowEditModal = (jobId) => {
        // Tìm công việc tương ứng với id được chọn
        // const jobToEdit = job.find(job => job.id === jobId);
        // // Nếu tồn tại công việc, cập nhật state selectedJob
        // if (jobToEdit) {
        //     setSelectedJob(jobToEdit);
        //     setShowEditModal(true);
        // }
    };

    const handleShowConfirmModal = (userId) => {
        setShowConfirmModal(true);
        setUserToDeleteId(userId);
    };

    function fetchDataPage(newDataPage) {
        setDataPage(newDataPage);
    }


    useEffect(() => {
        fetchCustomersPaging(dataPage.page).then((data) => {
            setCustomer(data.content);
            setDataPage(
                {
                    ...dataPage,
                    totalPage: data.totalPages
                }
            );
        })
    }, []);

    console.log(customer)

    // useEffect(() => {
    //     // Gọi API để lấy dữ liệu và cập nhật state
    //     fetch('URL_API')
    //         .then(response => response.json())
    //         .then(data => setUsers(data))
    //         .catch(error => console.log(error));
    // }, []);
    
    const [show, setShow] = useState(false);
    const handleShowCreateModal = async () => {
        setShow(true);
    }
    const handleCustomerCreate = async (newJob) => {
        try {
            // Gọi lại API để fetch danh sách công việc mới từ cơ sở dữ liệu
            const response = await fetchCustomersPaging(dataPage.page);
            // Cập nhật state job với danh sách công việc mới

            setCustomer(response.content);
        } catch (error) {
            console.error('Error updating job list after creation: ', error);
        }
    };
    const handleDeleteConfirmation = async () => {
        try {
            await fetchDeleteCustomer(userToDeleteId); // Gọi hàm xóa công việc từ API
            updateCustomerList(); // Cập nhật lại danh sách công việc sau khi xóa
            toast.success("Xóa người dùng thành công"); // Hiển thị toast thông báo xóa thành công
        } catch (error) {
            console.error('Error deleting job: ', error);
            toast.error("Xóa người dùng thất bại"); // Hiển thị toast thông báo xóa thất bại
        }
        setShowConfirmModal(false); // Ẩn modal xác nhận xóa sau khi xử lý xong
    };
    const updateCustomerList = async () => {
        try {
            const response = await fetchCustomersPaging(dataPage.page);
            setCustomer(response.content);
            setDataPage({
                ...dataPage,
                totalPage: response.totalPages
            });
        } catch (error) {
            console.error('Error updating customer list: ', error);
        }
    };
    useEffect(() => {
        updateCustomerList();
    }, [dataPage.page]);
    const handleCloseConfirmModal = () => {
        setShowConfirmModal(false); // Ẩn modal xác nhận xóa nếu người dùng hủy bỏ
    };
    return (
        <>
            <div className="layout-page">
                <Nav />
                <div className="content-wrapper">
                    <div className="container-xxl flex-grow-1 container-p-y">
                        <h4 className="fw-bold py-3 mb-2"><span className="text-muted fw-light">Dữ liệu /</span> Thống kê khách hàng</h4>
                        <div className="card">
                            <div className="card-header">
                                <div className="d-flex justify-content-between align-items-center">
                                    <button className="btn btn-primary btn-lm" onClick={handleShowCreateModal}>Tạo khách hàng</button>
                                </div>
                            </div>

                            <div className="table-responsive text-nowrap">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>STT</th>
                                            <th>Họ và Tên</th>
                                            <th>Ảnh</th>
                                            <th>Email</th>
                                            <th>Địa chỉ</th>
                                            <th>SĐT</th>
                                            <th>Ngày sinh</th>
                                            <th>Giới tính</th>
                                            <th>Thao tác</th>
                                        </tr>
                                    </thead>
                                    <tbody className="table-border-bottom-0">
                                        {customer.map((c, index) => (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td><i className="fa-lg text-danger "></i> <strong>{c.fullName}</strong></td>
                                                <td>{c.fileUrl ? (
                                                    <img src={c.fileUrl} height="40px" width="40px" />
                                                ) : (
                                                    <img src={defaultImageUrl} height="40px" width="40px" />
                                                )}</td>
                                                <td>{c.email}</td>
                                                <td>{c.address}</td>
                                                <td>{c.phone}</td>
                                                <td>{c.dob}</td>
                                                <td>{c.gender}</td>
                                                <td>
                                                    <div className="d-flex gap-3">
                                                        <button
                                                            type="button"
                                                            className="btn btn-link p-0 me-2"
                                                            style={{ fontSize: '18px', padding: '10px', color: '#56DDA1' }}
                                                            onClick={() => handleShowEditModal(c.id)} // Truyền id của công việc vào hàm handleShowEditModal
                                                        >
                                                            <i className="fa fa-edit"></i>
                                                        </button>
                                                        <button type="button" className="btn btn-link p-0"
                                                                style={{ fontSize: '18px', color: '#D65F4E' }}
                                                                onClick={() => handleShowConfirmModal(c.id)}>
                                                            <i className="fa fa-trash"></i>
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>

                                <ModalCreateCustomer 
                                    show={show} 
                                    handleClose={() => setShow(false)}
                                    onCustomerCreate={handleCustomerCreate} />


                                {showConfirmModal &&
                                    <div className="modal fade show" tabIndex="-1" role="dialog" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                                        <div className="modal-dialog" role="document">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h5 className="modal-title">Xác nhận xóa công việc</h5>

                                                </div>
                                                <div className="modal-body">
                                                    Bạn có chắc chắn muốn xóa công việc này?
                                                </div>
                                                <div className="modal-footer">
                                                    <button type="button" className="btn btn-secondary" onClick={handleCloseConfirmModal}>Hủy bỏ</button>
                                                    <button type="button" className="btn btn-primary" onClick={handleDeleteConfirmation}>Xác nhận</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                }
                                <div className="card-footer d-flex justify-content-center">
                                    <Pagination dataPage={dataPage} setDataPage={fetchDataPage} loading={loading} setLoading={setLoading} />
                                </div>
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
export default LayoutPage;