import Footer from "../footer/Footer";
import React, { useState, useEffect } from 'react';
import Pagination from "../pagination/Pagination";
import { fetchJobsPaging, fetchDeleteJob } from "../../service/JobService";
import ModalCreateJob from "../modal/ModalCreateJob";
import { fetchAddJob } from "../../service/JobService";
import { toast } from 'react-toastify';
import ModalEditJob from "../modal/ModalEditJob";
import { fetchSortBy } from "../../service/JobService";


const LayoutJob = () => {
    const [loading, setLoading] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [jobToDeleteId, setJobToDeleteId] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editingJobId, setEditingJobId] = useState(null);
    const [selectedJob, setSelectedJob] = useState(null);
    // Khởi tạo state cho từ khóa tìm kiếm và kết quả tìm kiếm
    const [searchKeyword, setSearchKeyword] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const [sortBy, setSortBy] = useState(null); // Cột hiện đang được sắp xếp
    const [sortDirection, setSortDirection] = useState('asc'); // Hướng sắp xếp: 'asc' hoặc 'desc'

    const handleSort = (column) => {
        let sortedData;
        if (column === 'price') {
            // Sắp xếp theo giá tiền
            sortedData = [...job];
            sortedData.sort((a, b) => {
                if (sortDirection === 'asc') {
                    return a.price - b.price;
                } else {
                    return b.price - a.price;
                }
            });
        } else {
            // Sắp xếp theo các cột khác
            sortedData = [...job];
            sortedData.sort((a, b) => {
                const valueA = a[column].toLowerCase();
                const valueB = b[column].toLowerCase();
                if (sortDirection === 'asc') {
                    return valueA.localeCompare(valueB);
                } else {
                    return valueB.localeCompare(valueA);
                }
            });
        }

        // Cập nhật state với dữ liệu đã sắp xếp
        setJob(sortedData);
        setSortBy(column);
        setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    };


    const handleShowEditModal = (jobId) => {
        // Tìm công việc tương ứng với id được chọn
        const jobToEdit = job.find(job => job.id === jobId);
        // Nếu tồn tại công việc, cập nhật state selectedJob
        if (jobToEdit) {
            setSelectedJob(jobToEdit);
            setShowEditModal(true);
        }
    };
    // Hàm xử lý sự kiện nhập từ khóa tìm kiếm
    const handleSearch = (e) => {
        setSearchKeyword(e.target.value);
    };



    const [job, setJob] = useState([]);
    const [dataPage, setDataPage] = useState(
        {
            page: 0,
            totalPage: 0
        }
    );



    const handleShowConfirmModal = (jobId) => {
        setShowConfirmModal(true);
        setJobToDeleteId(jobId);
    };

    const defaultImageUrl = "https://bom.so/KozLmH"

    const [show, setShow] = useState(false);

    const handleShowCreateModal = () => {
        setShow(true);
    };

    // Hàm cập nhật danh sách công việc sau khi thêm mới
    const handleJobCreate = async (newJob) => {
        try {
            // Gọi lại API để fetch danh sách công việc mới từ cơ sở dữ liệu
            const response = await fetchJobsPaging(dataPage.page);
            // Cập nhật state job với danh sách công việc mới
            setJob(response.content);
        } catch (error) {
            console.error('Error updating job list after creation: ', error);
        }
    };

    const handleJobUpdate = (updatedJob) => {
        // Tìm vị trí của công việc đã được cập nhật trong mảng job và thay thế nó bằng dữ liệu đã cập nhật
        const updatedJobIndex = job.findIndex(j => j.id === updatedJob.id);
        const updatedJobList = [...job];
        updatedJobList[updatedJobIndex] = updatedJob;
        setJob(updatedJobList);
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
    }, []);

    useEffect(() => {
        // Thực hiện tìm kiếm khi searchKeyword thay đổi
        const filteredJobs = job.filter((job) => {
            // Kiểm tra xem tên công việc hoặc category có chứa từ khóa tìm kiếm không
            return job.name.toLowerCase().includes(searchKeyword.toLowerCase()) ||
                job.category.name.toLowerCase().includes(searchKeyword.toLowerCase());
        });
        // Cập nhật kết quả tìm kiếm
        setSearchResults(filteredJobs);
    }, [searchKeyword]);

    const startIndex = dataPage.page * 10 + 1;
    const endIndex = Math.min(startIndex + 9, dataPage.totalPage);

    // Hàm cập nhật danh sách công việc sau khi thêm mới hoặc xóa
    const updateJobList = async () => {
        try {
            let response;
            if (sortBy === 'price') {
                // Nếu đang sắp xếp theo giá tiền, gọi fetchSortBy với giá trị của cột hiện tại và hướng sắp xếp
                response = await fetchSortBy(sortDirection);
            } else {
                // Nếu không, gọi fetchJobsPaging để lấy danh sách công việc mặc định
                response = await fetchJobsPaging(dataPage.page);
            }
            setJob(response.content);
            setDataPage({
                ...dataPage,
                totalPage: response.totalPages
            });
        } catch (error) {
            console.error('Error updating job list: ', error);
        }
    };


    useEffect(() => {
        updateJobList();
    }, [dataPage.page]);

    // Hàm xóa công việc
    const handleDeleteJob = async (jobId) => {
        try {
            await fetchDeleteJob(jobId); // Gọi hàm xóa dữ liệu từ API
            await updateJobList(); // Cập nhật lại danh sách công việc sau khi xóa
        } catch (error) {
            console.error('Error deleting job: ', error);
        }
    };

    const handleDeleteConfirmation = async () => {
        try {
            await fetchDeleteJob(jobToDeleteId); // Gọi hàm xóa công việc từ API
            updateJobList(); // Cập nhật lại danh sách công việc sau khi xóa
            toast.success("Xóa công việc thành công"); // Hiển thị toast thông báo xóa thành công
        } catch (error) {
            console.error('Error deleting job: ', error);
            toast.error("Xóa công việc thất bại"); // Hiển thị toast thông báo xóa thất bại
        }
        setShowConfirmModal(false); // Ẩn modal xác nhận xóa sau khi xử lý xong
    };

    const handleCloseConfirmModal = () => {
        setShowConfirmModal(false); // Ẩn modal xác nhận xóa nếu người dùng hủy bỏ
    };

    return (
        <>
            <div className="layout-page">

                <div className="content-wrapper">
                    <div className="container-xxl flex-grow-1 container-p-y">
                        <h4 className="fw-bold py-3 mb-2"><span className="text-muted fw-light">Dữ liệu /</span> Quản lý dịch vụ</h4>

                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Tìm kiếm..."
                                value={searchKeyword}
                                onChange={handleSearch}
                            />
                        </div>
                        <div className="card">
                            <div className="card-header">
                                <div className="d-flex justify-content-between align-items-center">
                                    <button className="btn btn-primary btn-lm" onClick={handleShowCreateModal}>Tạo dịch vụ</button>
                                </div>
                            </div>
                            <div className="table-responsive text-nowrap">
                                <table className="table table-light table-hover">
                                    <thead>
                                        <tr>
                                            <th>STT</th>
                                            <th>Ảnh</th>
                                            <th>Tên dịch vụ</th>
                                            <th style={{ textAlign: 'right' }} onClick={() => handleSort('price')} className={sortBy === 'price' ? 'sorted' : ''}>
                                                Giá tiền {sortBy === 'price' && sortDirection === 'asc' && <i className="fa fa-caret-up"></i>}
                                                {sortBy === 'price' && sortDirection === 'desc' && <i className="fa fa-caret-down"></i>}
                                            </th>
                                            <th style={{ textAlign: 'right' }}>Thời gian ước tính</th>
                                            <th style={{ textAlign: 'right' }} onClick={() => handleSort('typeJob')} className={sortBy === 'typeJob' ? 'sorted' : ''}>
                                                Đơn vị {sortBy === 'typeJob' && sortDirection === 'asc' && <i className="fa fa-caret-up"></i>}
                                                {sortBy === 'typeJob' && sortDirection === 'desc' && <i className="fa fa-caret-down"></i>}
                                            </th>
                                            <th style={{ textAlign: 'right' }}>Danh mục</th>

                                            <th>Thao tác</th>
                                        </tr>
                                    </thead>
                                    <tbody className="table-border-bottom-0">
                                        {/* Kiểm tra xem có kết quả tìm kiếm không */}
                                        {searchResults.length > 0 ? (
                                            // Nếu có kết quả tìm kiếm, hiển thị dữ liệu tìm kiếm
                                            searchResults.map((job, index) => (
                                                <tr key={job.id}>
                                                    <td>{startIndex + index}</td>
                                                    <td>{job.urlImage ? (
                                                        <img src={job.urlImage} height="40px" width="40px" />
                                                    ) : (
                                                        <img src={defaultImageUrl} height="40px" width="40px" />
                                                    )}</td>
                                                    <td><i className="fa-lg text-danger "></i> <strong>{job.name}</strong></td>
                                                    <td key={job.id} style={{ textAlign: 'right' }}>
                                                        {job.price.toLocaleString('vi-VN')} VNĐ
                                                    </td>
                                                    <td style={{ textAlign: 'right' }}>~ {job.timeApprox} phút / đơn vị</td>
                                                    <td style={{ textAlign: 'right' }}>{job.typeJob}</td>
                                                    <td style={{ textAlign: 'right' }}>{job.category.name}</td>
                                                    <td>
                                                        <div className="d-flex gap-3">
                                                            <button
                                                                type="button"
                                                                className="btn btn-link p-0 me-2"
                                                                style={{ fontSize: '18px', padding: '10px', color: '#56DDA1',borderColor: '56DDA1',width: ' 30px' }}
                                                                onClick={() => handleShowEditModal(job.id)} // Truyền id của công việc vào hàm handleShowEditModal
                                                            >
                                                                <i className="fa fa-edit"></i>
                                                            </button>
                                                            <button type="button" className="btn btn-link p-0"
                                                                style={{ fontSize: '18px', color: '#D65F4E', borderColor: '#D65F4E',width: ' 30px' }}
                                                                onClick={() => handleShowConfirmModal(job.id)}>
                                                                <i className="fa fa-trash"></i>
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            // Nếu không có kết quả tìm kiếm, hiển thị toàn bộ dữ liệu
                                            job.map((job, index) => (
                                                <tr key={job.id}>
                                                    <td>{startIndex + index}</td>
                                                    <td>{job.urlImage ? (
                                                        <img src={job.urlImage} height="40px" width="40px" />
                                                    ) : (
                                                        <img src={defaultImageUrl} height="40px" width="40px" />
                                                    )}</td>
                                                    <td><i className="fa-lg text-danger "></i> <strong>{job.name}</strong></td>
                                                    <td key={job.id} style={{ textAlign: 'right' }}>
                                                        {job.price.toLocaleString('vi-VN')} VNĐ
                                                    </td>
                                                    <td style={{ textAlign: 'right' }}>~ {job.timeApprox} phút / đơn vị</td>
                                                    <td style={{ textAlign: 'right' }}>{job.typeJob}</td>
                                                    <td style={{ textAlign: 'right' }}>{job.category.name}</td>
                                                    <td>
                                                        <div className="d-flex gap-3">
                                                            <button
                                                                type="button"
                                                                className="btn btn-link p-0 me-2"
                                                                style={{ fontSize: '18px', padding: '10px', color: '#56DDA1', borderColor: '#56DDA1',width: ' 30px' }}
                                                                onClick={() => handleShowEditModal(job.id)}
                                                                title="Chỉnh Sửa"
                                                            >
                                                                <i className="fa fa-edit"></i>
                                                            </button>
                                                            <button
                                                                type="button"
                                                                className="btn btn-link p-0"
                                                                style={{ fontSize: '18px', color: '#D65F4E', borderColor: '#D65F4E',width: ' 30px' }}
                                                                onClick={() => handleShowConfirmModal(job.id)}
                                                                title="Xóa"
                                                            >
                                                                <i className="fa fa-trash"></i>
                                                            </button>
                                                        </div>
                                                    </td>

                                                </tr>
                                            ))
                                        )}
                                    </tbody>

                                </table>
                                <div className="card-footer d-flex justify-content-center">
                                    <Pagination dataPage={dataPage} setDataPage={fetchDataPage} loading={loading} setLoading={setLoading} />
                                </div>
                                <ModalCreateJob show={show} handleClose={() => setShow(false)} onJobCreate={handleJobCreate} />
                                <ModalEditJob
                                    show={showEditModal}
                                    handleClose={() => setShowEditModal(false)}
                                    jobData={selectedJob} // Truyền thông tin của công việc đã chọn
                                    onUpdateJob={updateJobList} // Truyền hàm cập nhật danh sách công việc sau khi sửa
                                />
                                {/* Modal để xác nhận xóa công việc */}
                                {showConfirmModal &&
                                    <div className="modal fade show" tabIndex="-1" role="dialog" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                                        <div className="modal-dialog" role="document">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h5 className="modal-title">Xác nhận xóa công việc</h5>

                                                </div>
                                                <div className="modal-body">
                                                    Bạn có chắc chắn muốn xóa công việc này?
                                                </div>
                                                <div className="modal-footer">
                                                    <button type="button" className="btn btn-secondary" onClick={handleCloseConfirmModal}>Hủy bỏ</button>
                                                    <button type="button" className="btn btn-primary" onClick={handleDeleteConfirmation}>Xác nhận</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                }
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