import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Modal, ModalBody, ModalHeader, ModalTitle, ModalFooter } from 'react-bootstrap';
import { fetchAddJob, fetchAddJobFormData } from "../../service/JobService";
import { toast } from 'react-toastify';
import LoadingModal from '../loading/LoadingModal';
import { fetchCategory } from '../../service/JobService';


const ModalCreateJob = ({ show, handleClose, onJobCreate }) => {
    const [imageUrl, setImageUrl] = useState(null);
    const [isImageSelected, setIsImageSelected] = useState(false); // Thêm biến trạng thái để kiểm tra xem ảnh đã được chọn hay chưa
    const [imageLink, setImageLink] = useState(''); // Thêm trường dữ liệu để lưu trữ link ảnh được chọn

    const [categories, setCategories] = useState([]); // State lưu trữ danh sách loại dịch vụ
    const [units, setUnits] = useState([]); // State lưu trữ danh sách đơn vị
    const [loading, setLoading] = useState(false);

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
        serviceName: yup.string().required('Tên dịch vụ không được để trống'),
        servicePrice: yup.number().typeError('Giá tiền phải là một số').required('Giá tiền không được để trống').positive('Giá tiền phải là một số dương').moreThan(1000, 'Giá tiền phải lớn hơn 1000'),
        serviceImage: yup.array().typeError('Ảnh không được để trống').of(yup.mixed()),
        timeApprox: yup.number().typeError('Thời gian ước tính phải là một số').required('Thời gian ước tính không được để trống').positive('Thời gian ước tính phải là một số dương').integer('Thời gian ước tính phải là một số nguyên'),
        category: yup.string().required('Vui lòng chọn loại dịch vụ'),
        unit: yup.string().required('Vui lòng chọn đơn vị'),

    });

    const { register, handleSubmit, reset, setValue, getValues, formState: { errors }, clearErrors } = useForm({
        resolver: yupResolver(schema)
    });

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setValue("serviceImage", [file]);
            const imageUrl = URL.createObjectURL(file);
            setImageUrl(imageUrl);
            setImageLink(imageUrl); // Cập nhật trường dữ liệu imageLink
            clearErrors("serviceImage");
            setIsImageSelected(true);
        }
    };
    const handleImageChangeOnBlur = (e) => {
        if (getValues().serviceImage.length == 0) {
            setIsImageSelected(false);
        }
        if (!imageUrl) {
            // Nếu không có ảnh được chọn, đặt giá trị của trường "serviceImage" thành null
            setValue("serviceImage", null);
        }

    }

    const onSubmit = async (data) => {
        try {
            // Gọi API để thêm công việc mới vào cơ sở dữ liệu
            setLoading(true);

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
            setImageLink('');
            setLoading(false); // Hide loading animation
            toast.success("Thêm mới thành công");
        } catch (error) {
            console.error('Error adding job: ', error);
            setLoading(false); // Hide loading animation even in case of error
            toast.error("Thêm mới thất bại");
        }
    };
    const { onChange, name, ref, onBlur } = { ...register("serviceImage") };

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <ModalHeader closeButton>
                    <ModalTitle>Tạo công việc</ModalTitle>
                </ModalHeader>
                <ModalBody>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="row mb-3">
                            <div className="col-md-12">
                                <label htmlFor="serviceName" className="form-label">Tên công việc:</label>
                                <input type="text" className="form-control" id="serviceName" {...register("serviceName")} />
                                {errors.serviceName && <span className="text-danger">{errors.serviceName.message}</span>}
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label htmlFor="serviceImage" className="form-label">Hình Ảnh:</label>
                            <div className="input-group gap-1">
                                <label className="input-group-btn">
                                    <span className="btn btn-primary">
                                        Tải ảnh<input
                                            type="file"
                                            style={{ display: "none" }}
                                            id="fileInput"
                                            name={name}
                                            ref={ref}
                                            accept="image/*"
                                            onChange={handleImageChange}
                                        />
                                    </span>
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="imageLink"
                                    value={imageLink}
                                    readOnly
                                />

                            </div>
                            {errors.serviceImage && <span className="text-danger">{errors.serviceImage.message}</span>}
                        </div>



                        <div className="row mb-3">
                            <div className="col-md-6">
                                <label htmlFor="servicePrice" className="form-label">Giá tiền:</label>
                                <input type="number" className="form-control" id="servicePrice" {...register("servicePrice")} />
                                {errors.servicePrice && <span className="text-danger">{errors.servicePrice.message}</span>}
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="timeApprox" className="form-label">Thời gian ước tính:</label>
                                <input type="number" className="form-control" id="timeApprox" {...register("timeApprox")} />
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
                                    {/* Lặp qua danh sách loại dịch vụ từ API và render các option */}
                                    {categories.map(category => (
                                        <option key={category.id} value={category.id} selected={getValues("category") === category.id}>
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                                {errors.category && <span className="text-danger">{errors.category.message}</span>}
                            </div>
                        </div>
                        {imageUrl && <img src={imageUrl} alt="Preview" className="img-fluid mb-3 modal-image" style={{ width: '120px', height: '120px' }} />}
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
            <LoadingModal loading={loading} /> {/* Render loading animation */}

        </>

    );
};

export default ModalCreateJob;
