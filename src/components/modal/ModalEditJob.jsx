import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Modal, ModalBody, ModalHeader, ModalTitle, ModalFooter } from 'react-bootstrap';
import { fetchUpdateJob } from "../../service/JobService";
import { fetchCategory } from '../../service/JobService';
import { toast } from 'react-toastify';
import { da } from 'yup-locales';



const ModalEditJob = ({ show, handleClose, jobData, onUpdateJob }) => {
    const { register, handleSubmit, setValue, reset } = useForm();
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState(''); // State để lưu trữ đường link hình ảnh



    useEffect(() => {
        setLoading(true);
        try {
            fetchCategory().then(data => {
                setCategories(data);
            });
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        // Khi hiển thị modal, set giá trị cho các trường thông tin công việc từ jobData
        if (show) {
            setValue("name", jobData.name);
            setValue("urlImage", jobData.urlImage);
            setValue("price", jobData.price);
            setValue("timeApprox", jobData.timeApprox);
            setValue("typeJob", jobData.typeJob);
            setValue("category", jobData.category.id);
            setImageUrl(jobData.urlImage); // Set giá trị ban đầu của imageUrl từ jobData.urlImage

        }
    }, [show, jobData, setValue]);

    const handleFileInputChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setImageUrl(reader.result); // Cập nhật đường link từ file đã chọn
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const onSubmit = async (data) => {
        data = {
            ...data,
            typeJob: data.typeJob,
            urlImage: imageUrl // Sử dụng đường link hiện tại của ảnh
        };
    
        try {
            const updatedJob = await fetchUpdateJob(jobData.id, data);
            // Kiểm tra dữ liệu đã được cập nhật chính xác
            if (updatedJob) {
                onUpdateJob(updatedJob); // Gọi hàm onUpdateJob với dữ liệu đã cập nhật
                handleClose();
                toast.success("Cập nhật công việc thành công");
            } else {
                toast.error("Cập nhật công việc thất bại: Không nhận được dữ liệu cập nhật từ máy chủ");
            }
        } catch (error) {
            console.error('Error updating job: ', error);
            toast.error("Cập nhật công việc thất bại: " + error.message);
        }
    };


    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <ModalHeader closeButton>
                    <ModalTitle>Sửa công việc</ModalTitle>
                </ModalHeader>
                <ModalBody>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="row mb-3">
                            <div className="col-md-12 mb-3">
                                <label htmlFor="name" className="form-label">Tên công việc</label>
                                <input type="text" className="form-control" id="name" {...register("name")} />
                            </div>
                            <div className="col-md-12">
                                <label htmlFor="urlImage" className="form-label">Hình ảnh</label>
                                <div className="input-group gap-1">
                                    <label className="input-group-btn">
                                        <span className="btn btn-primary">
                                            Đổi ảnh
                                            <input
                                                type="file"
                                                style={{ display: "none" }}
                                                id="fileInput"
                                                onChange={handleFileInputChange} // Xử lý khi người dùng chọn file mới
                                            />
                                        </span>
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="imageLink"
                                        readOnly
                                        value={imageUrl} // Hiển thị đường link hiện tại của ảnh
                                    />
                                    
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="mb-3">
                                    <label htmlFor="price" className="form-label">Giá tiền</label>
                                    <input type="number" className="form-control" id="price" {...register("price")} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="timeApprox" className="form-label">Thời gian ước tính</label>
                                    <input type="number" className="form-control" id="timeApprox" {...register("timeApprox")} />
                                </div>
                            </div>
                            <div className="col-md-6">
                                {jobData && (
                                    <div className="mb-3">
                                        <label htmlFor="typeJob" className="form-label">Đơn vị</label>
                                        <select className="form-control" id="typeJob" {...register("typeJob")} defaultValue={jobData.typeJob}>
                                            <option value="Quantity">Quantity</option>
                                            <option value="Size">Size</option>
                                        </select>
                                    </div>
                                )}
                                <div className="mb-3">
                                    <label htmlFor="category" className="form-label">Loại dịch vụ</label>
                                    <select className="form-control" id="category" {...register("category")}>
                                        {/* Lặp qua danh sách loại dịch vụ từ API và render các option */}
                                        {categories.map(category => (
                                            <option key={category.id} value={category.id}>{category.name}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                        {imageUrl && (
                                        <img src={imageUrl} alt="Preview" className="img-fluid mb-3 modal-image" style={{ width: '120px', height: '120px' }} />
                                    )}
                    </form>
                </ModalBody>
                <ModalFooter>
                    <Button variant="secondary" onClick={handleClose}>
                        Đóng
                    </Button>
                    <Button variant="primary" type="submit" onClick={handleSubmit(onSubmit)}>
                        Lưu
                    </Button>
                </ModalFooter>
            </Modal>

        </>
    );
};

export default ModalEditJob;