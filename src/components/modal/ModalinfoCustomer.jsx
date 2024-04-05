import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Modal, ModalBody, ModalHeader, ModalTitle, ModalFooter } from 'react-bootstrap';
import { fetchUpdateEmployee } from "../../service/EmployeeService";

import { toast } from 'react-toastify';

const ModalinfoCustomer = ({ show, handleClose, employeeData, onUpdateEmployee }) => {
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState(''); // State để lưu trữ đường link hình ảnh


    const schema = yup.object().shape({
        fullName: yup.string().required('Tên công việc không được để trống'),
        // price: yup.number().typeError('Giá tiền phải là một số').required('Giá tiền không được để trống').positive('Giá tiền phải là một số dương').moreThan(1000, 'Giá tiền phải lớn hơn 1000'),
        // timeApprox: yup.number().typeError('Thời gian ước tính phải là một số').required('Thời gian ước tính không được để trống').positive('Thời gian ước tính phải là một số dương').integer('Thời gian ước tính phải là một số nguyên'),
        // typeJob: yup.string().required('Vui lòng chọn đơn vị'),
        // categoryId: yup.string().required('Vui lòng chọn loại dịch vụ'),
    });

    const { register, handleSubmit, setValue, formState: { errors }, getValues } = useForm({
        resolver: yupResolver(schema)
    });

    useEffect(() => {
        if (show) {
            if (employeeData) {
                console.log("employeeData:",employeeData)
                setValue("fullName", employeeData.fullName);
                setValue("email", employeeData.email);
                setValue("address", employeeData.address);
                setValue("phone", employeeData.phone);
                setValue("dob", employeeData.dob);
                setValue("gender", employeeData.gender);
                setValue("shift", employeeData.shift);
                // setValue("username", employeeData.username);
                // setValue("oldPassword", employeeData.password);
                // setValue("roles", employeeData.typeUser);
                setImageUrl(employeeData.urlImage);
            }
        }
    }, [show, employeeData, setValue]);

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
        };

        try {
            const updatedEmployee = await fetchUpdateEmployee(employeeData.id, data);

            if (updatedEmployee) {
                onUpdateEmployee(updatedEmployee);
                handleClose();
                toast.success("Cập nhật nhân viên thành công");
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
                <ModalTitle>Kiểm tra thông tin khách hàng</ModalTitle>
            </ModalHeader>
            <ModalBody>
                <form >
                    <div className="row mb-3">
                        <div className="col-md-12">
                            <label htmlFor="fullName" className="form-label">Tên đầy đủ:</label>
                            <input type="text" className="form-control" id="fullName" {...register("fullName")}  readOnly/>
                            {errors.fullName && <span className="text-danger">{errors.fullName.message}</span>}
                        </div>
                    </div>
                    {/*<div className="row mb-3">*/}
                    {/*    <label htmlFor="serviceImage" className="form-label">Hình Ảnh:</label>*/}
                    {/*    <div className="input-group gap-1">*/}
                    {/*        <label className="input-group-btn">*/}
                    {/*                <span className="btn btn-primary">*/}
                    {/*                    Tải ảnh<input*/}
                    {/*                    type="file"*/}
                    {/*                    style={{ display: "none" }}*/}
                    {/*                    id="fileInput"*/}
                    {/*                    // name={name}*/}
                    {/*                    // ref={ref}*/}
                    {/*                    accept="image/*"*/}
                    {/*                    onChange={handleFileInputChange}*/}
                    {/*                />*/}
                    {/*                </span>*/}
                    {/*        </label>*/}
                    {/*        <input*/}
                    {/*            type="text"*/}
                    {/*            className="form-control"*/}
                    {/*            id="imageLink"*/}
                    {/*            value={imageUrl}*/}
                    {/*            readOnly*/}
                    {/*        />*/}

                    {/*    </div>*/}
                    {/*    /!*{errors.serviceImage && <span className="text-danger">{errors.serviceImage.message}</span>}*!/*/}
                    {/*</div>*/}



                    <div className="row mb-3">
                        <div className="col-md-6">
                            <label htmlFor="email" className="form-label">Email:</label>
                            <input type="text" className="form-control" id="email" {...register("email")} readOnly />
                            {errors.email && <span className="text-danger">{errors.email.message}</span>}
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="address" className="form-label">Địa chỉ:</label>
                            <input type="text" className="form-control" id="address" {...register("address")} readOnly/>
                            {errors.address && <span className="text-danger">{errors.address.message}</span>}
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-md-6">
                            <label htmlFor="phone" className="form-label">Số điện thoại:</label>
                            <input type="text" className="form-control" id="phone" {...register("phone")} readOnly/>
                            {errors.phone && <span className="text-danger">{errors.phone.message}</span>}
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="dob" className="form-label">Năm sinh (mm/dd/yyyy):</label>
                            <input type="date" className="form-control" id="dob" {...register("dob")} readOnly/>
                            {errors.dob && <span className="text-danger">{errors.dob.message}</span>}
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-md-6">
                            <label htmlFor="gender" className="form-label">Giới tính</label>

                            <select className="form-select" id="gender" {...register("gender")} disabled>
                                <option value="">Chọn giới tính</option>
                                <option key="1" value="MALE" selected={getValues("gender") === "1"}>
                                    Nam
                                </option>
                                <option key="2" value="FEMALE" selected={getValues("gender") === "2"}>
                                    Nữ
                                </option>
                                <option key="3" value="OTHER" selected={getValues("gender") === "3"}>
                                    Khác
                                </option>

                            </select>
                            {errors.gender && <span className="text-danger">{errors.gender.message}</span>}
                        </div>

                    </div>

                    <div className="row mb-3">

                        {/*<div className="col-md-6">*/}
                        {/*    <label htmlFor="username" className="form-label">Tên tài khoản:</label>*/}
                        {/*    <input type="text" className="form-control" id="username" {...register("username")} />*/}
                        {/*    {errors.username && <span className="text-danger">{errors.username.message}</span>}*/}
                        {/*</div>*/}
                        {/*<div className="col-md-6">*/}
                        {/*    <label htmlFor="roles" className="form-label">Loại tài khoản:</label>*/}
                        {/*    <input type="text" className="form-control" id="roles" {...register("roles")} />*/}
                        {/*</div>*/}
                    </div>


                    {imageUrl && <img src={imageUrl} alt="Preview" className="img-fluid mb-3 modal-image" style={{ width: '120px', height: '120px' }} />}
                </form>

            </ModalBody>
            <ModalFooter>
                <Button variant="secondary" onClick={handleClose}>
                    Đóng
                </Button>
                {/*<Button variant="primary" type="submit" onClick={handleSubmit(onSubmit)}>*/}
                {/*    Lưu*/}
                {/*</Button>*/}
            </ModalFooter>
        </Modal>
    );
};

export default ModalinfoCustomer;