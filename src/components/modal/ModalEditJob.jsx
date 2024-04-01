import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Modal, ModalBody, ModalHeader, ModalTitle, ModalFooter } from 'react-bootstrap';
import { fetchUpdateJob } from "../../service/JobService";
import { fetchCategory } from '../../service/JobService';
import { toast } from 'react-toastify';

const ModalEditJob = ({ show, handleClose, jobData, onUpdateJob }) => {
    const [categories, setCategories] = useState([]);
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

    const schema = yup.object().shape({
        name: yup.string().required('Tên công việc không được để trống'),
        price: yup.number().typeError('Giá tiền phải là một số').required('Giá tiền không được để trống').positive('Giá tiền phải là một số dương').moreThan(1000, 'Giá tiền phải lớn hơn 1000'),
        timeApprox: yup.number().typeError('Thời gian ước tính phải là một số').required('Thời gian ước tính không được để trống').positive('Thời gian ước tính phải là một số dương').integer('Thời gian ước tính phải là một số nguyên'),
        typeJob: yup.string().required('Vui lòng chọn đơn vị'),
        categoryId: yup.string().required('Vui lòng chọn loại dịch vụ'),
    });

    const { register, handleSubmit, setValue, formState: { errors }, getValues } = useForm({
        resolver: yupResolver(schema)
    });

    useEffect(() => {
        if (show) {
            if (jobData) {
                setValue("name", jobData.name);
                setValue("price", jobData.price);
                setValue("timeApprox", jobData.timeApprox);
                setValue("typeJob", jobData.typeJob);
                setValue("categoryId", jobData.category.id);
                setImageUrl(jobData.urlImage);
            }
        }
    }, [show, jobData, setValue]);

    const handleFileInputChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setImageUrl(reader.result);
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const onSubmit = async (data) => {
        data = {
            ...data,
            // urlImage: imageUrl
        };
    
        try {
            const updatedJob = await fetchUpdateJob(jobData.id, data);
            if (updatedJob) {
                onUpdateJob(updatedJob);
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
                            {errors.name && <span className="text-danger">{errors.name.message}</span>}
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
                                            onChange={handleFileInputChange}
                                        />
                                    </span>
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="imageLink"
                                    readOnly
                                    value={imageUrl}
                                />
                                
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label htmlFor="price" className="form-label">Giá tiền</label>
                                <input type="number" className="form-control" id="price" {...register("price")} />
                                {errors.price && <span className="text-danger">{errors.price.message}</span>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="timeApprox" className="form-label">Thời gian ước tính</label>
                                <input type="number" className="form-control" id="timeApprox" {...register("timeApprox")} />
                                {errors.timeApprox && <span className="text-danger">{errors.timeApprox.message}</span>}
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label htmlFor="typeJob" className="form-label">Đơn vị</label>
                                <select className="form-control" id="typeJob" {...register("typeJob")}>
                                    <option value="Quantity">Quantity</option>
                                    <option value="Size">Size</option>
                                </select>
                                {errors.typeJob && <span className="text-danger">{errors.typeJob.message}</span>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="category" className="form-label">Loại dịch vụ</label>
                                <select className="form-control" id="category" {...register("categoryId")}>
                                    <option value="">Chọn loại dịch vụ</option>
                                    {categories.map(category => (
                                        <option key={category.id} value={category.id}>{category.name}</option>
                                    ))}
                                </select>
                                {errors.categoryId && <span className="text-danger">{errors.categoryId.message}</span>}
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
    );
};

export default ModalEditJob;
