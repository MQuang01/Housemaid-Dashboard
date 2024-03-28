import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Modal, ModalBody, ModalHeader, ModalTitle, ModalFooter } from 'react-bootstrap';

const ModalCreateJob = ({ show, handleClose }) => {
   
    const [imageUrl, setImageUrl] = useState(null);
    const schema = yup.object().shape({
        serviceName: yup.string().required('Tên dịch vụ không được để trống'),
        servicePrice: yup.number().typeError('Giá tiền phải là một số').required('Giá tiền không được để trống').positive('Giá tiền phải là một số dương').integer('Giá tiền phải là một số nguyên'),
        serviceImage: yup.mixed().required('Ảnh không được để trống'),
        timeApprox: yup.number().typeError('Thời gian ước tính phải là một số').required('Thời gian ước tính không được để trống').positive('Thời gian ước tính phải là một số dương').integer('Thời gian ước tính phải là một số nguyên')
    });
    
    

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setImageUrl(imageUrl);
        }
    };

    const onSubmit = (data) => {
        console.log(data);
        handleClose();
    };

    
    return (
        <Modal show={show} onHide={handleClose}>
            <ModalHeader closeButton>
                <ModalTitle>Tạo dịch vụ</ModalTitle>
            </ModalHeader>
            <ModalBody>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-3">
                        <label htmlFor="serviceName" className="form-label">Tên dịch vụ:</label>
                        <input type="text" className="form-control" id="serviceName" {...register("serviceName")} />
                        {errors.serviceName && <span className="text-danger">{errors.serviceName.message}</span>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="servicePrice" className="form-label">Giá tiền:</label>
                        <input type="text" className="form-control" id="servicePrice" {...register("servicePrice")} />
                        {errors.servicePrice && <span className="text-danger">{errors.servicePrice.message}</span>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="serviceImage" className="form-label">Chọn ảnh:</label>
                        <input type="file" className="form-control" id="serviceImage" accept="image/*" {...register("serviceImage")} onChange={handleImageChange} />
                        {errors.serviceImage && <span className="text-danger">{errors.serviceImage.message}</span>}
                    </div>
                    {imageUrl && <img src={imageUrl} alt="Preview" className="img-fluid mb-3 modal-image" style={{ width: '120px', height: '120px' }} />}
                    <div className="mb-3">
                        <label htmlFor="timeApprox" className="form-label">Thời gian ước tính:</label>
                        <input type="text" className="form-control" id="timeApprox" {...register("timeApprox")} />
                        {errors.timeApprox && <span className="text-danger">{errors.timeApprox.message}</span>}
                    </div>
                </form>
            </ModalBody>
            <ModalFooter>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" type="submit" onClick={handleSubmit(onSubmit)}>
                    Save changes
                </Button>
            </ModalFooter>
        </Modal>
    );
};

export default ModalCreateJob;
