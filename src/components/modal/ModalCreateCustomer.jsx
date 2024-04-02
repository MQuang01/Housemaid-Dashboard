import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Modal, ModalBody, ModalHeader, ModalTitle, ModalFooter } from 'react-bootstrap';
import { fetchAddCustomerFormData } from "../../service/UserService";
import { toast } from 'react-toastify';
import LoadingModal from '../loading/LoadingModal';


const ModalCreateCustomer = ({ show, handleClose, onCustomerCreate }) => {
    const [imageUrl, setImageUrl] = useState(null);
    const [isImageSelected, setIsImageSelected] = useState(false); // Thêm biến trạng thái để kiểm tra xem ảnh đã được chọn hay chưa
    const [imageLink, setImageLink] = useState(''); // Thêm trường dữ liệu để lưu trữ link ảnh được chọn

    const [units, setUnits] = useState([]); // State lưu trữ danh sách đơn vị
    const [loading, setLoading] = useState(false);
    const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);
    const [isShowPassword, setIsShowPassword] = useState(false);



    const schema = yup.object().shape({
        fullName: yup.string()
            .required("Yêu cầu nhập Họ và Tên")
            .matches(/^[a-zA-Z\s]+$/, "Họ và tên chỉ được chứa chữ cái và khoảng trắng")
            .min(3, "Họ và tên ít nhất 3 ký tự")
            .max(50, "Họ và tên không được vượt quá 50 ký tự"),
        serviceImage: yup.array().typeError('Ảnh không được để trống').of(yup.mixed()),
        email: yup.string()
            .email("VD : example@example.com")
            .required("Yêu cầu nhập email"),
        address: yup.string()
            .required("Yêu cầu nhập địa chỉ")
            .min(10, "Địa chỉ ít nhất 10 ký tự")
            .max(100, "Địa chỉ không được vượt quá 100 ký tự"),
        phone: yup.string()
            .required("Yêu cầu nhập SĐT")
            // .matches(/((09|03|07|08|05)+([0-9]{8}))/, "SĐT phải đúng định dạng")
            .matches(/(09|03|07|08|05)/, "SĐT phải đúng định dạng (ví dụ: 0912345678)")
            .min(10, "SĐT phải có ít nhất 10 số")
            .max(11, "SĐT không được vượt quá 11 số"),
        gender: yup.string().required('Vui lòng chọn giới tính'),
        dob: yup.date()
            .typeError("Yêu cầu nhập ngày sinh")
            .required("Yêu cầu nhập ngày sinh")
            .max(new Date(), "Ngày phải nhỏ hơn ngày hiện tại"),
        username: yup.string().required("Yêu cầu nhập tài khoản")
            .min(4, "Tài khoản ít nhất 4 ký tự")
            .max(20, "Tài khoản không được vượt quá 16 ký tự")
            .matches(/^\w+$/, "Tài khoản chỉ được chứa chữ cái, số và dấu gạch dưới"),
        password: yup.string().required("Yêu cầu nhập mật khẩu")
            .min(6, "Mật khẩu ít nhất 6 kí tự"),
        confirmPassword: yup.string().required("Yêu cầu xác nhận mật khẩu")
            .oneOf([yup.ref("password")], "Mật khẩu không khớp")
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

    const onClose = async () => {
        // Reset form sau khi thêm công việc thành công
        reset();
        handleClose(); // Đóng modal sau khi thêm công việc thành công
    }
    const onSubmit = async (data) => {
        try {
            const currentDate = new Date();
            // Lưu ngày tháng năm vào biến
            const month = currentDate.getMonth() + 1; // Tháng bắt đầu từ 0
            const day = currentDate.getDate();
            const currentDateVariable = `${currentDate.getFullYear()}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;
            // Gọi API để thêm công việc mới vào cơ sở dữ liệu
            // setLoading(true);

            let fileSelected = getValues().serviceImage[0];
            let frmData = {

                fullName: data.fullName,
                email: data.email,
                address: data.address,
                phone: data.phone,
                dob: data.dob,
                gender: data.gender,
                username: data.username,
                password: data.password,
                typeUser: "CUSTOMER",
                avatar: fileSelected
            }
            const response = await fetchAddCustomerFormData(frmData);
            console.log('customer added:', frmData);
            // Gọi hàm callback truyền từ LayoutJob để cập nhật danh sách công việc
            onCustomerCreate(response);
            handleClose(); // Đóng modal sau khi thêm công việc thành công
            // Reset form sau khi thêm công việc thành công
            reset();
            setImageUrl(null);
            setImageLink('');
            // setLoading(false); // Hide loading animation
            toast.success("Thêm mới thành công");
        } catch (error) {
            console.error('Error adding job: ', error);
            // setLoading(false); // Hide loading animation even in case of error
            toast.error("Thêm mới thất bại");
        }
    };
    const { onChange, name, ref, onBlur } = { ...register("serviceImage") };

    return (
        <>
            <Modal show={show} onHide={onClose}>
                <ModalHeader closeButton>
                    <ModalTitle>Tạo khách hàng</ModalTitle>
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

                            </select>
                            {errors.gender && <span className="text-danger">{errors.gender.message}</span>}
                        </div>
                        <div className="row mb-3">
                            <div className="col-md-6">
                                <label htmlFor="username" className="form-label">Tên tài khoản:</label>
                                <input type="text" className="form-control" id="username" {...register("username")} />
                                {errors.username && <span className="text-danger">{errors.username.message}</span>}
                            </div>

                        </div>

                        <div className="row mb-3">

                            <div className="col-md-6">
                                <label htmlFor="password" className="form-label">Mật khẩu:</label>
                                <div className="position-relative">
                                    <input
                                        type={`${isShowPassword ? "text" : "password"}`}
                                        className="form-control pr-5" // Thêm padding bên phải để tạo không gian cho biểu tượng
                                        id="password"
                                        {...register("password")}
                                    />
                                    <i
                                        id="eye-pw"
                                        className={`fa position-absolute end-0 top-50 translate-middle-y pe-3 ${isShowPassword ? "fa-eye-slash" : "fa-eye"}`}
                                        style={{ cursor: 'pointer' }} // Thêm style cho icon
                                        onClick={() => setIsShowPassword(prevState => !prevState)}
                                    ></i>
                                </div>
                                {errors.password && <span className="text-danger">{errors.password.message}</span>}
                            </div>

                            <div className="col-md-6" style={{marginTop:'7px'}}>
                                <div className="form-group has-validation">
                                    <div className="form-group" id="form-confirm-password">
                                        <label className="ms-1 title-input">Xác nhạn mật khẩu</label>
                                        <div className="position-relative">
                                            <input
                                                type={`${isShowConfirmPassword ? "text" : "password"}`}
                                                id="confirm-pw"
                                                // className={`form-control ${errors?.confirmPassword?.message ? "is-invalid" : ""}`}
                                                className="form-control pr-5" // Thêm padding bên phải để tạo không gian cho biểu tượng

                                                {...register("confirmPassword")}
                                                placeholder="Nhập lại mật khau"
                                            />
                                            <i
                                                id="eye-confirm-pw"
                                                className={`fa position-absolute end-0 top-50 translate-middle-y ms-2 pe-3 ${isShowConfirmPassword ? "fa-eye-slash" : "fa-eye"}`}
                                                style={{ cursor: 'pointer' }}
                                                onClick={() => setIsShowConfirmPassword(prevState => !prevState) }
                                            ></i>
                                        </div>
                                    </div>
                                    {errors.confirmPassword && <span className="text-danger">{errors.confirmPassword.message}</span>}
                                </div>
                            </div>
                        </div>


                        {imageUrl && <img src={imageUrl} alt="Preview" className="img-fluid mb-3 modal-image" style={{ width: '120px', height: '120px' }} />}
                    </form>
                </ModalBody>
                <ModalFooter>
                    <Button variant="secondary" onClick={onClose}>
                        Đóng
                    </Button>
                    <Button variant="primary" type="submit" onClick={handleSubmit(onSubmit)}>
                        Tạo
                    </Button>
                </ModalFooter>
            </Modal>
            {/*<LoadingModal loading={loading} /> /!* Render loading animation *!/*/}

        </>

    );
};

export default ModalCreateCustomer;
