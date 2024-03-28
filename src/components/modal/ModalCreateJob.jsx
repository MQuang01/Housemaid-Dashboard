import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Modal, ModalBody, ModalHeader, ModalTitle, ModalFooter } from 'react-bootstrap';
import { fetchAddJob, fetchAddJobFormData } from "../../service/JobService";



const ModalCreateJob = ({ show, handleClose, onJobCreate  }) => {
    const [imageUrl, setImageUrl] = useState(null);
    const [categories, setCategories] = useState([]); // State lưu trữ danh sách loại dịch vụ
    const [units, setUnits] = useState([]); // State lưu trữ danh sách đơn vị

    useEffect(() => {
        // Gọi API để lấy danh sách loại dịch vụ và đơn vị
        // fetchCategories();
        // fetchUnits();
    }, []);
    // Hàm xử lý sự kiện khi submit form
   

    const schema = yup.object().shape({
        serviceName: yup.string().required('Tên dịch vụ không được để trống'),
        servicePrice: yup.number().typeError('Giá tiền phải là một số').required('Giá tiền không được để trống').positive('Giá tiền phải là một số dương').moreThan(1000, 'Giá tiền phải lớn hơn 1000'),
        serviceImage: yup.array().typeError('Ảnh không được để trống').of(yup.mixed()),
        timeApprox: yup.number().typeError('Thời gian ước tính phải là một số').required('Thời gian ước tính không được để trống').positive('Thời gian ước tính phải là một số dương').integer('Thời gian ước tính phải là một số nguyên'),
        category: yup.string().required('Vui lòng chọn loại dịch vụ'),
        unit: yup.string().required('Vui lòng chọn đơn vị'),
        
    });
    
    const { register, handleSubmit, reset,setValue,getValues, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const handleImageChange = (event) => {

        const file = event.target.files[0];
        if (file) {
            setValue("serviceImage", [file]);
            const imageUrl = URL.createObjectURL(file);
            setImageUrl(imageUrl);
        }
        

    };
    console.log("getValues().serviceImage",getValues().serviceImage);
    const handleImageChangeOnBlur = (e)=>{

        console.log("blur event");
        if(getValues().serviceImage.length == 0){
            console.log("aaaa")
            return;
        }
    }
    console.log("bbbb",errors);
    const onSubmit = async (data) => {
        console.log("data",data);
        try {
            // Gọi API để thêm công việc mới vào cơ sở dữ liệu

           
            let fileSelected = getValues().serviceImage[0];
            let frmData = {
                name: data.serviceName,
                price: data.servicePrice,
                timeApprox: data.timeApprox,
                categoryId: data.category,
                typeJob: data.unit,
                avatar: fileSelected
            }
            const response = await fetchAddJobFormData(frmData);
            console.log('Job added:', response);
            // Gọi hàm callback truyền từ LayoutJob để cập nhật danh sách công việc
            onJobCreate(response);
            handleClose(); // Đóng modal sau khi thêm công việc thành công
            // Reset form sau khi thêm công việc thành công
            reset();
            setImageUrl(null);
        } catch (error) {
            console.error('Error adding job: ', error);
        }
    };
    const { onChange, name, ref,onBlur} = {...register("serviceImage")};
    
    return (
        <Modal show={show} onHide={handleClose}>
            <ModalHeader closeButton>
                <ModalTitle>Tạo dịch vụ</ModalTitle>
            </ModalHeader>
            <ModalBody>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="row mb-3">
                        <div className="col-md-12">
                            <label htmlFor="serviceName" className="form-label">Tên dịch vụ:</label>
                            <input type="text" className="form-control" id="serviceName" {...register("serviceName")} />
                            {errors.serviceName && <span className="text-danger">{errors.serviceName.message}</span>}
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-md-12">
                            <label htmlFor="serviceImage" className="form-label">Chọn ảnh:</label>
                            <input type="file" className="form-control" onBlur={handleImageChangeOnBlur} name={name} ref = {ref}  id="serviceImage" accept="image/*"  
                            onChange={handleImageChange}
                             />
                            {errors.serviceImage && <span className="text-danger">{errors.serviceImage.message}</span>}
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-md-6">
                            <label htmlFor="servicePrice" className="form-label">Giá tiền:</label>
                            <input type="text" className="form-control" id="servicePrice" {...register("servicePrice")} />
                            {errors.servicePrice && <span className="text-danger">{errors.servicePrice.message}</span>}
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="timeApprox" className="form-label">Thời gian ước tính:</label>
                            <input type="text" className="form-control" id="timeApprox" {...register("timeApprox")} />
                            {errors.timeApprox && <span className="text-danger">{errors.timeApprox.message}</span>}
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-md-6">
                            <label htmlFor="unit" className="form-label">Đơn vị:</label>
                            <select className="form-select" id="unit" {...register("unit")}>
                                <option value="">Chọn đơn vị</option>
                                <option value={'JOB_QUANTITY'}>Số lượng</option>
                                <option value={'JOB_SIZE'}>Kích thước</option>

                            </select>
                            {errors.unit && <span className="text-danger">{errors.unit.message}</span>}
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="category" className="form-label">Loại dịch vụ:</label>
                            <select className="form-select" id="category" {...register("category")}>
                                <option value="">Chọn loại dịch vụ</option>
                                {/* {categories.map(category => (
                                    <option key={category.id} value={category.id}>{category.name}</option>
                                ))} */}
                                <option value={'2'}>Vệ sinh nhà cửa</option>
                                <option value={'3'}>Nấu ăn</option>
                            </select>
                            {errors.category && <span className="text-danger">{errors.category.message}</span>}
                        </div>
                    </div>
                    {imageUrl && <img src={imageUrl} alt="Preview" className="img-fluid mb-3 modal-image"  style={{ width: '120px', height: '120px' }} />}
                </form>
            </ModalBody>
            <ModalFooter>
                <Button variant="secondary" onClick={handleClose}>
                    Đóng
                </Button>
                <Button variant="primary" type="submit" onClick={handleSubmit(onSubmit)}>
                    Tạo
                </Button>
            </ModalFooter>
        </Modal>
    );
};

export default ModalCreateJob;
