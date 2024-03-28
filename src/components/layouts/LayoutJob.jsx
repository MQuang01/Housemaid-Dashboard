import Nav from "../navbar/Nav";
import Footer from "../footer/Footer";
import React, { useState, useEffect } from 'react';
import Pagination from "../pagination/Pagination";
import { fetchJobsPaging } from "../../service/JobService";
import ModalCreateJob from "../modal/ModalCreateJob";

const LayoutJob = () => {
    const [loading, setLoading] = useState(false);
    const [job, setJob] = useState([]);
    const [dataPage, setDataPage] = useState(
        {
            page: 0,
            totalPage: 0
        }
    );
    const defaultImageUrl = "https://bom.so/KozLmH"

    const [show, setShow] = useState(false);

    const handleShowCreateModal = () => {
        console.log("aaaaa");
        setShow(true);
    };

    


    function fetchDataPage(newDataPage) {
        setDataPage(newDataPage);
    }

    useEffect(() => {
        fetchJobsPaging(dataPage.page).then((data) => {
            setJob(data.content);
            setDataPage(
                {
                    ...dataPage,
                    totalPage: data.totalPages
                }
            );
        })
    }, [dataPage, dataPage.page]);


    return (
        <>
            <div className="layout-page">
                <Nav />
                <div className="content-wrapper">
                    <div className="container-xxl flex-grow-1 container-p-y">
                        <h4 className="fw-bold py-3 mb-2"><span className="text-muted fw-light">Dữ liệu /</span> Thống kê khách hàng</h4>
                        <div className="card">
                            <div className="card-header">
                                <div className="d-flex justify-content-between align-items-center">
                                    <button className="btn btn-primary btn-lm" onClick={handleShowCreateModal}>Tạo công việc</button>
                                </div>
                            </div>
                            <div className="table-responsive text-nowrap">
                                <table className="table table-light table-hover">
                                    <thead>
                                        <tr>
                                            <th>STT</th>
                                            <th>Tên công việc</th>
                                            <th>Ảnh</th>
                                            <th style={{ textAlign: 'right' }}>Giá tiền</th>
                                            <th style={{ textAlign: 'right' }}>Thời gian ước tính</th>
                                            <th>Loại dịch vụ</th>
                                            <th>Thao tác</th>
                                        </tr>
                                    </thead>
                                    <tbody className="table-border-bottom-0">
                                        {job.map((job, index) => (
                                            <tr key={job.id}>
                                                <td>{index + 1}</td>
                                                <td><i className="fa-lg text-danger "></i> <strong>{job.name}</strong></td>
                                                <td>{job.urlImage ? (
                                                    <img src={job.urlImage} height="40px" width="40px" />
                                                ) : (
                                                    <img src={defaultImageUrl} height="40px" width="40px" />
                                                )}</td>
                                                <td style={{ textAlign: 'right' }}>{job.price.toLocaleString('vi-VN')} VNĐ</td>

                                                <td style={{ textAlign: 'right' }}>{job.timeApprox}</td>
                                                <td>{job.cate}</td>
                                                <td>
                                                    <div className="dropdown">
                                                        <button type="button" className="btn p-0 dropdown-toggle hide-arrow"
                                                            data-bs-toggle="dropdown">
                                                            <i className="fas fa-ellipsis-v"></i>
                                                        </button>
                                                        <div className="dropdown-menu">
                                                            <a className="dropdown-item" href="javascript:void(0);"
                                                            ><i className="fa fa-edit me-1"></i> Edit</a
                                                            >
                                                            <a className="dropdown-item" href="javascript:void(0);"
                                                            ><i className="fa fa-trash me-1"></i> Delete</a
                                                            >
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <div className="card-footer d-flex justify-content-center">
                                    <Pagination dataPage={dataPage} setDataPage={fetchDataPage} loading={loading} setLoading={setLoading} />
                                </div>
                                <ModalCreateJob show={show} handleClose={() => setShow(false)}/>

                            </div>
                        </div>

                    </div>
                    <Footer />
                    <div className="content-backdrop fade"></div>
                </div>
            </div>
        </>
    )
}
export default LayoutJob;