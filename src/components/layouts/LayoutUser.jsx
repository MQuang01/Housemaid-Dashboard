import Nav from "../navbar/Nav";
import Footer from "../footer/Footer";
import React, { useState, useEffect } from 'react';
import Pagination from "../pagination/Pagination";
import { fetchCustomersPaging } from "../../service/UserService";

const LayoutPage = () => {
    const [loading, setLoading] = useState(false);
    const [customer, setCustomer] = useState([]);
    const [dataPage, setDataPage] = useState(
        {
            page: 0,
            totalPage: 0
        }
    );
    const defaultImageUrl = "https://bom.so/KozLmH"
        
    

    function fetchDataPage(newDataPage) {
        setDataPage(newDataPage);
    }


    useEffect(() => {
        fetchCustomersPaging(dataPage.page).then((data) => {
            setCustomer(data.content);
            setDataPage(
                {
                    ...dataPage,
                    totalPage: data.totalPages
                }
            );
        })
    }, []);

    console.log(customer)

    // useEffect(() => {
    //     // Gọi API để lấy dữ liệu và cập nhật state
    //     fetch('URL_API')
    //         .then(response => response.json())
    //         .then(data => setUsers(data))
    //         .catch(error => console.log(error));
    // }, []);
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
                                    <button className="btn btn-primary btn-lm">Tạo khách hàng</button>
                                </div>
                            </div>

                            <div className="table-responsive text-nowrap">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>STT</th>
                                            <th>Họ và Tên</th>
                                            <th>Ảnh</th>
                                            <th>Email</th>
                                            <th>Địa chỉ</th>
                                            <th>SĐT</th>
                                            <th>Ngày sinh</th>
                                            <th>Giới tính</th>
                                            <th>Thao tác</th>
                                        </tr>
                                    </thead>
                                    <tbody className="table-border-bottom-0">
                                        {customer.map((c, index) => (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td><i className="fa-lg text-danger "></i> <strong>{c.fullName}</strong></td>
                                                <td>{c.fileUrl ? (
                                                    <img src={c.fileUrl} height="40px" width="40px" />
                                                ) : (
                                                    <img src={defaultImageUrl} height="40px" width="40px" />
                                                )}</td>
                                                <td>{c.email}</td>
                                                <td>{c.address}</td>
                                                <td>{c.phone}</td>
                                                <td>{c.dob}</td>
                                                <td>{c.gender}</td>
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
export default LayoutPage;