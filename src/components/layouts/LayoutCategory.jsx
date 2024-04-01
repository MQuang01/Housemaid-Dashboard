import Nav from "../navbar/Nav";
import Footer from "../footer/Footer";
import React, { useState, useEffect } from 'react';
import {fetchCategories,fetchDeleteCategoryById} from "../../service/CategoryService";
import ModalCreateCategory from "../modal/ModalCreateCategory";
// import { yupResolver } from '@hookform/resolvers/yup';
// import { useForm } from "react-hook-form";



const LayoutCategory = () => {
    // const { register, handleSubmit, reset,setValue,getValues, formState: { errors } } = useForm({
    //     resolver: yupResolver(schema)
    // });

    const [categories, setCategory] = useState([]);
    useEffect(() => {
        fetchCategories().then((data) => setCategory(data.content));
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
            setCategory(response.content);
        } catch (error) {
            console.error('Error updating job list after creation: ', error);
        }
    };

    const handleBtnDelete = async (id) => {
        window.confirm('Are you sure you want to delete this product?');

        await fetchDeleteCategoryById(id);
    }
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
                                    <button className="btn btn-primary btn-lm" onClick={handleShowCreateModal}>Tạo công việc</button>
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
                                                <div className="dropdown">
                                                    <button type="button" className="btn p-0 dropdown-toggle hide-arrow"
                                                            data-bs-toggle="dropdown">
                                                        <i className="fas fa-ellipsis-v"></i>
                                                    </button>
                                                    <div className="dropdown-menu">
                                                        <a className="dropdown-item" href="javascript:void(0);"
                                                        ><i className="fa fa-edit me-1"></i> Edit</a
                                                        >
                                                        <a className="dropdown-item" onClick={() =>handleBtnDelete(category.id)}
                                                        ><i className="fa fa-trash me-1"></i> Delete</a
                                                        >
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>

                                <ModalCreateCategory show={show} handleClose={() => setShow(false)} onJobCreate={handleCategoryCreate}/>

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