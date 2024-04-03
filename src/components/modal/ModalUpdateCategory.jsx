import React, { useState,useEffect } from 'react';
import { useForm } from "react-hook-form";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Modal, ModalBody, ModalHeader, ModalTitle, ModalFooter } from 'react-bootstrap';
import {  fetchUpdateCategory } from "../../service/CategoryService";
import { toast } from 'react-toastify';

const ModalUpdateCategory = ({ show, handleClose, categoryData, onCategoryUpdate }) => {

    const [category, setCategory] = useState([]);
    const [imageUrl, setImageUrl] = useState('');

    const schema = yup.object().shape({
        name: yup.string().required('Tên dịch vụ không được để trống'),
        // serviceImage: yup.mixed().required('Ảnh không được để trống'),
    });
    const { register, handleSubmit, reset,setValue,getValues, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });


    useEffect(() => {
        if (show) {
            if (categoryData) {
                setValue("name", categoryData.name);

                setImageUrl(categoryData.urlImage);
            }
        }
    }, [show, categoryData, setValue]);
    
    const handleImageChange = (event) => {
        // const file = event.target.files[0];
        // if (file) {
        //     setValue("serviceImage", [file]);
        //     const imageUrl = URL.createObjectURL(file);
        //     setImageUrl(imageUrl);
        // }
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setImageUrl(reader.result);
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const handleImageChangeOnBlur = () => {
        console.log("blur event");
        if(getValues().serviceImage.length == 0){
            console.log("aaaa")
            return;
        }
    }

    const onSubmit = async (data) => {
        // console.log("data",data);
        // try {
        //     let fileSelected = getValues().serviceImage[0];
        //     let frmData = {
        //         name: data.serviceName,
        //         avatar: fileSelected
        //     }
        //     const response = await fetchUpdateCategory(frmData);
        //     // console.log('Job added:', response);
        //     // Gọi hàm callback truyền từ LayoutJob để cập nhật danh sách công việc
        //     // onCategoryUpdate(response);
        //     handleClose(); // Đóng modal sau khi thêm công việc thành công
        //     // Reset form sau khi thêm công việc thành công
        //     reset();
        //     setImageUrl(null);
        // } catch (error) {
        //     console.error('Error adding job: ', error);
        // }
        console.log("data",data);

        data = {
            ...data,
            // urlImage: imageUrl
        };
        try {
            console.log("vao update")
            const updatedCategory = await fetchUpdateCategory(categoryData.id, data);
            if (updatedCategory) {
                onCategoryUpdate(updatedCategory);
                handleClose();
                toast.success("Cập nhật  thành công");
            } else {
                toast.error("Cập nhật thất bại: Không nhận được dữ liệu cập nhật từ máy chủ");
            }
        } catch (error) {
            console.error('Error updating job: ', error);
            toast.error("Cập nhật thất bại: " + error.message);
        }
    };
    // const { onChange, name, ref,onBlur} = {...register("serviceImage")};

    return (
        <Modal show={show} onHide={handleClose}>
            <ModalHeader closeButton>
                <ModalTitle>Sửa dịch vụ</ModalTitle>
            </ModalHeader>
            <ModalBody>
                <form onSubmit={handleSubmit(onSubmit)}>
                    
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Tên loại dịch vụ:</label>
                        <input type="text" className="form-control" id="name" {...register("name")} />
                        {errors.name && <span className="text-danger">{errors.name.message}</span>}
                    </div>

                    {/*<div className="mb-3">*/}
                    {/*    <label htmlFor="serviceImage" className="form-label">Chọn ảnh:</label>*/}
                    {/*    <input type="file" className="form-control" id="serviceImage" {...register("serviceImage")}*/}
                    {/*           onChange={handleImageChange}  />*/}
                    {/*    {errors.serviceImage && <span className="text-danger">{errors.serviceImage.message}</span>}*/}
                    {/*</div>*/}
                    {/*{imageUrl && <img src={imageUrl} alt="Preview" className="img-fluid mb-3 modal-image" style={{ width: '120px', height: '120px' }} />}*/}
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
                                            onChange={handleImageChange}
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

                </form>
            </ModalBody>
            <ModalFooter>
                <Button variant="secondary" onClick={handleClose}>
                    Đóng
                </Button>
                <Button variant="primary" type="submit" onClick={handleSubmit(onSubmit)}>
                    Lưu thay đổi
                </Button>
            </ModalFooter>
        </Modal>
    );
};

export default ModalUpdateCategory;
