import Nav from "../navbar/Nav";
import Footer from "../footer/Footer";
import React, { useState, useEffect } from 'react';
import Pagination from "../pagination/Pagination";
import {fetchCustomersPaging} from "../../service/UserService";

const LayoutPage = () => {
    const [loading,setLoading] = useState(false);
    const [user, setUser] = useState([]);
    const [dataPage, setDataPage] = useState(
        {
            page: 0,
            totalPage: 0
        }
    );

    function fetchDataPage(newDataPage) {
        setDataPage(newDataPage);
    }


    useEffect(() => {
        fetchCustomersPaging(dataPage.page).then((data) => {
            setUser(data.content);
            setDataPage(
                {
                    ...dataPage,
                    totalPage: data.totalPages
                }
            );
        })
    }, [dataPage, dataPage.page]);

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
                <Nav/>
                <div className="content-wrapper">
                    <div className="container-xxl flex-grow-1 container-p-y">
                        <h4 className="fw-bold py-3 mb-4"><span className="text-muted fw-light">Dữ liêu /</span> User
                            Tables</h4>
                        <div className="card">
                            <h5 className="card-header">User Basic</h5>
                            <div className="table-responsive text-nowrap">
                                <table className="table">
                                    <thead>
                                    <tr>
                                        <th>STT</th>
                                        <th>Full Name</th>
                                        <th>Email</th>
                                        <th>Address</th>
                                        <th>Phone</th>
                                        <th>Dob</th>
                                        <th>Gender</th>
                                        <th>Actions</th>
                                    </tr>
                                    </thead>
                                    <tbody className="table-border-bottom-0">
                                    {user.map((user, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td><i className="fa-lg text-danger "></i> <strong>{user.fullName}</strong></td>
                                            <td>{user.email}</td>
                                            <td>{user.address}</td>
                                            <td>{user.phone}</td>
                                            <td>{user.dob}</td>
                                            <td>{user.gender}</td>
                                        <td>
                                            <div className="dropdown">
                                                <button type="button" className="btn p-0 dropdown-toggle hide-arrow"
                                                        data-bs-toggle="dropdown">
                                                    <i className="bx bx-dots-vertical-rounded"></i>
                                                </button>
                                                <div className="dropdown-menu">
                                                    <a className="dropdown-item" href="javascript:void(0);"
                                                    ><i className="bx bx-edit-alt me-1"></i> Edit</a
                                                    >
                                                    <a className="dropdown-item" href="javascript:void(0);"
                                                    ><i className="bx bx-trash me-1"></i> Delete</a
                                                    >
                                                </div>
                                            </div>
                                        </td>
                                        </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <Pagination dataPage={dataPage} setDataPage={fetchDataPage} loading={loading} setLoading={setLoading}/>
                            </div>
                        </div>

                    </div>
                    <Footer/>
                    <div className="content-backdrop fade"></div>
                </div>

            </div>
        </>
    )
}
export default LayoutPage;