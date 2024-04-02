import Nav from "../navbar/Nav";
import Footer from "../footer/Footer";
import React, { useState, useEffect } from 'react';
import {fetchCategories,fetchDeleteCategoryById} from "../../service/CategoryService";
import ModalCreateCategory from "../modal/ModalCreateCategory";
import ModalUpdateCategory from "../modal/ModalUpdateCategory";
import { toast } from 'react-toastify';

// import { yupResolver } from '@hookform/resolvers/yup';
// import { useForm } from "react-hook-form";



const LayoutCategory = ({onCategoryCreate, onCategoryUpdate}) => {
    // const { register, handleSubmit, reset,setValue,getValues, formState: { errors } } = useForm({
    //     resolver: yupResolver(schema)
    // });

    const [categories, setCategories] = useState([]);
    useEffect(() => {
        fetchCategories().then((data) => setCategories(data.content));
    }, []);

    const [show, setShow] = useState(false);
    const handleShowCreateModal = () => {
        console.log("aaaaa");
        setShow(true);
    };
    const handleCategoryCreate = async (newCategory) => {
        try {
            // Gọi lại API để fetch danh sách công việc mới từ cơ sở dữ liệu
            const response = await fetchCategories(newCategory);
            // Cập nhật state job với danh sách công việc mới
            setCategories(response.content);
        } catch (error) {
            console.error('Error updating job list after creation: ', error);
        }
    };

    const [showUpdate, setShowUpdate] = useState(false);
    const [id, setId] = useState([]);
    const handleShowUpdateModal = async (idNumber) => {
        setShowUpdate(true);
        setId(idNumber);
    };
    const handleCategoryUpdate = async (newCategory) => {
        try {
            // Gọi lại API để fetch danh sách công việc mới từ cơ sở dữ liệu
            const response = await fetchCategories(newCategory);
            // Cập nhật state job với danh sách công việc mới
            setCategories(response.content);
        } catch (error) {
            console.error('Error updating job list after creation: ', error);
        }
    };


    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [jobToDeleteId, setJobToDeleteId] = useState(null);

    const handleShowConfirmModal = (jobId) => {
        setShowConfirmModal(true);
        setJobToDeleteId(jobId);
    };
    const handleDeleteConfirmation = async () => {
        try {
            await fetchDeleteCategoryById(jobToDeleteId); // Gọi hàm xóa công việc từ API
            updateCategoriesList();// Cập nhật lại danh sách công việc sau khi xóa
            toast.success("Xóa công việc thành công"); // Hiển thị toast thông báo xóa thành công
        } catch (error) {
            console.error('Error deleting job: ', error);
            toast.error("Xóa công việc thất bại"); // Hiển thị toast thông báo xóa thất bại
        }
        setShowConfirmModal(false); // Ẩn modal xác nhận xóa sau khi xử lý xong
    }
    const updateCategoriesList = async () => {
        try {
            const response = await fetchCategories();
            setCategories(response.content);

        } catch (error) {
            console.error('Error updating job list: ', error);
        }
    };
    const handleCloseConfirmModal = () => {
        setShowConfirmModal(false); // Ẩn modal xác nhận xóa nếu người dùng hủy bỏ
    };

    return(
        <>
            <div className="layout-page">
                <Nav />
                <div className="content-wrapper">
                    <div className="container-xxl flex-grow-1 container-p-y">
                        
                        
                        <h4 className="fw-bold py-3 mb-2"><span className="text-muted fw-light">Dữ liệu /</span> Thống kê dịch vụ</h4>
                        <div className="card">
                            <div className="card-header">
                                <div className="d-flex justify-content-between align-items-center">
                                    <button className="btn btn-primary btn-lm" onClick={handleShowCreateModal}>Tạo dịch vụ</button>
                                </div>
                            </div>
                            <div className="table-responsive text-nowrap">
                                <table className="table table-light table-hover">
                                    <thead>
                                    <tr>
                                        <th>STT</th>
                                        <th>Tên loại dịch vụ</th>
                                        <th>Ảnh</th>
                                        <th>Thao tác</th>
                                    </tr>
                                    </thead>
                                    <tbody className="table-border-bottom-0">
                                    {categories.map((category, index) => (
                                        <tr key={category.id}>
                                            <td>{index + 1}</td>
                                            <td><i className="fa-lg text-danger "></i> <strong>{category.name}</strong></td>
                                            <td>
                                                <img src={category.fileInfo.url} height="40px" width="40px" />
                                            </td>

                                            <td>
                                                <div className="d-flex gap-3">
                                                    <button
                                                        type="button"
                                                        className="btn btn-link p-0 me-2"
                                                        style={{ fontSize: '18px', padding: '10px', color: '#56DDA1' }}
                                                        onClick={() => handleShowUpdateModal(category.id)}
                                                        title="Chỉnh Sửa"
                                                    >
                                                        <i className="fa fa-edit"></i>
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className="btn btn-link p-0"
                                                        style={{ fontSize: '18px', color: '#D65F4E' }}
                                                        onClick={() => handleShowConfirmModal(category.id)}
                                                        title="Xóa"
                                                    >
                                                        <i className="fa fa-trash"></i>
                                                    </button>
                                                </div>
                                            </td>

                                        </tr>
                                    ))}
                                    </tbody>
                                </table>

                                <ModalCreateCategory show={show} handleClose={() => setShow(false)} onCategoryCreate={handleCategoryCreate}/>
                                <ModalUpdateCategory
                                    showUpdate={showUpdate}
                                    handleClose={() => setShowUpdate(false)}
                                    onCategoryUpdate={handleCategoryUpdate}
                                id={id}
                                />

                                {showConfirmModal &&
                                    <div className="modal fade show" tabIndex="-1" role="dialog" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                                        <div className="modal-dialog" role="document">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h5 className="modal-title">Xác nhận xóa dịch vụ</h5>

                                                </div>
                                                <div className="modal-body">
                                                    Bạn có chắc chắn muốn xóa dịch vụ này?
                                                </div>
                                                <div className="modal-footer">
                                                    <button type="button" className="btn btn-secondary" onClick={handleCloseConfirmModal}>Hủy bỏ</button>
                                                    <button type="button" className="btn btn-primary" onClick={handleDeleteConfirmation}>Xác nhận</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                }
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

export default LayoutCategory;