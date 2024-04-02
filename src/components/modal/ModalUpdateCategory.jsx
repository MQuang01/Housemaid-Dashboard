import React, { useState,useEffect } from 'react';
import { useForm } from "react-hook-form";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Modal, ModalBody, ModalHeader, ModalTitle, ModalFooter } from 'react-bootstrap';
import {  getCategoryById } from "../../service/CategoryService";

const ModalUpdateCategory = ({ showUpdate, handleClose, categoryData, id }) => {

    const [category, setCategory] = useState([]);
    useEffect(() => {
        getCategoryById(id).then((data) => setCategory(data));
    }, []);

    const [imageUrl, setImageUrl] = useState(null);

    useEffect(() => {
    }, []);

    const schema = yup.object().shape({
        serviceName: yup.string().required('Tên dịch vụ không được để trống'),
        serviceImage: yup.mixed().required('Ảnh không được để trống'),
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

    const handleImageChangeOnBlur = () => {
        console.log("blur event");
        if(getValues().serviceImage.length == 0){
            console.log("aaaa")
            return;
        }
    }

    const onSubmit = async (data) => {
        console.log("data",data);
        try {
            let fileSelected = getValues().serviceImage[0];
            let frmData = {
                name: data.serviceName,
                avatar: fileSelected
            }
            // const response = await fetchAddCategoryFormData(frmData);
            // console.log('Job added:', response);
            // Gọi hàm callback truyền từ LayoutJob để cập nhật danh sách công việc
            // onCategoryUpdate(response);
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
        <Modal showUpdate={showUpdate} onHide={handleClose}>
            <ModalHeader closeButton>
                <ModalTitle>Sửa dịch vụ</ModalTitle>
            </ModalHeader>
            <ModalBody>
                <form onSubmit={handleSubmit(onSubmit)}>

                    {/*<h1>{category.name}</h1>*/}
                    {/*{category.map((object) => (*/}
                    {/*    <h1>{object.name}</h1>*/}

                    {/*))}*/}
                    {/*<img src={category.fileInfo.url} height="40px" width="40px" />*/}


                    <div className="mb-3">
                        <label htmlFor="serviceName" className="form-label">Tên loại dịch vụ:</label>
                        <input type="text" className="form-control" id="serviceName" {...register("serviceName")} />
                        {errors.serviceName && <span className="text-danger">{errors.serviceName.message}</span>}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="serviceImage" className="form-label">Chọn ảnh:</label>
                        <input type="file" className="form-control" id="serviceImage" name={name} ref = {ref} accept="image/*" {...register("serviceImage")}
                               onChange={handleImageChange}  onBlur={handleImageChangeOnBlur}/>
                        {errors.serviceImage && <span className="text-danger">{errors.serviceImage.message}</span>}
                    </div>
                    {imageUrl && <img src={imageUrl} alt="Preview" className="img-fluid mb-3 modal-image" style={{ width: '120px', height: '120px' }} />}

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