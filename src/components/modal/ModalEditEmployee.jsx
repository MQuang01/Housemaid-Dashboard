import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Modal, ModalBody, ModalHeader, ModalTitle, ModalFooter } from 'react-bootstrap';
import { fetchUpdateEmployee } from "../../service/EmployeeService";

import { toast } from 'react-toastify';

const ModalEditEmployee = ({ show, handleClose, employeeData, onUpdateEmployee }) => {
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState(''); // State để lưu trữ đường link hình ảnh
    const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);
    const [isShowPassword, setIsShowPassword] = useState(false);

    const schema = yup.object().shape({
        fullName: yup.string().required('Tên công việc không được để trống'),
        email: yup.string()
            .email("VD : example@example.com")
            .required("Yêu cầu nhập email"),
        address: yup.string()
            .required("Yêu cầu nhập địa chỉ")
            .max(100, "Địa chỉ không được vượt quá 100 ký tự"),
        phone: yup.string()
            .required("Yêu cầu nhập SĐT")
            .matches(/(09|03|07|08|05)/, "SĐT phải đúng định dạng (ví dụ: 0912345678)")
            .min(10, "SĐT phải có ít nhất 10 số")
            .max(11, "SĐT không được vượt quá 11 số"),
        gender: yup.string().required('Vui lòng chọn giới tính'),
        shift: yup.string().required('Vui lòng chọn ca làm'),
        // dob: yup.date()
        //     .typeError("Yêu cầu nhập ngày sinh")
        //     .required("Yêu cầu nhập ngày sinh")
        //     .max(new Date(), "Ngày phải nhỏ hơn ngày hiện tại")
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
        console.log("dữ liệu cần cập nhật data",data)

        data = {
            ...data,
            "typeUser":"EMPLOYEE",
            // "roles": [
            //     {
            //         "role": "ADMIN"
            //     }
            // ]
            // urlImage: imageUrl
        };

        try {
            console.log("Kiêm tra dữ liệu trước khi cập nhật",data)

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
                <ModalTitle>Sửa nhân viên</ModalTitle>
            </ModalHeader>
            <ModalBody>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="row mb-3">
                        <div className="col-md-12">
                            <label htmlFor="fullName" className="form-label">Tên đầy đủ:</label>
                            <input type="text" className="form-control" id="fullName" {...register("fullName")} />
                            {errors.fullName && <span className="text-danger">{errors.fullName.message}</span>}
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
                                        // name={name}
                                        // ref={ref}
                                        accept="image/*"
                                        onChange={handleFileInputChange}
                                    />
                                    </span>
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="imageLink"
                                value={imageUrl}
                                readOnly
                            />

                        </div>
                        {/*{errors.serviceImage && <span className="text-danger">{errors.serviceImage.message}</span>}*/}
                    </div>



                    <div className="row mb-3">
                        <div className="col-md-6">
                            <label htmlFor="email" className="form-label">Email:</label>
                            <input type="text" className="form-control" id="email" {...register("email")} />
                            {errors.email && <span className="text-danger">{errors.email.message}</span>}
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="address" className="form-label">Địa chỉ:</label>
                            <input type="text" className="form-control" id="address" {...register("address")} />
                            {errors.address && <span className="text-danger">{errors.address.message}</span>}
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-md-6">
                            <label htmlFor="phone" className="form-label">Số điện thoại:</label>
                            <input type="text" className="form-control" id="phone" {...register("phone")} />
                            {errors.phone && <span className="text-danger">{errors.phone.message}</span>}
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="dob" className="form-label">Ngày tháng năm sinh:</label>
                            <input type="date" className="form-control" id="dob" {...register("dob")} />
                            {errors.dob && <span className="text-danger">{errors.dob.message}</span>}
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-md-6">
                            <label htmlFor="gender" className="form-label">Giới tính</label>
                            <select className="form-select" id="gender" {...register("gender")}>
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
                        <div className="col-md-6">
                            <label htmlFor="shift" className="form-label">Chọn ca làm</label>
                            <select className="form-select" id="shift" {...register("shift")}>
                                <option value={'SHIFT_1'} selected={getValues("shift") === "SHIFT_1"}>Ca 1</option>
                                <option value={'SHIFT_2'} selected={getValues("shift") === "SHIFT_2"}>Ca 2</option>
                                <option value={'SHIFT_3'} selected={getValues("shift") === "SHIFT_3"}>Ca 3</option>

                            </select>
                            {errors.shiftType && <span className="text-danger">{errors.shiftType.message}</span>}
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
                <Button variant="primary" type="submit" onClick={handleSubmit(onSubmit)}>
                    Lưu
                </Button>
            </ModalFooter>
        </Modal>
    );
};

export default ModalEditEmployee;