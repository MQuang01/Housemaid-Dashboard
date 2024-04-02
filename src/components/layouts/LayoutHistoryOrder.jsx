import Nav from "../navbar/Nav";
import Footer from "../footer/Footer";
import React, { useState, useEffect } from 'react';
import Pagination from "../pagination/Pagination";
import { fetchJobsPaging, fetchDeleteJob } from "../../service/JobService";
import ModalCreateJob from "../modal/ModalCreateJob";
import { fetchAddJob } from "../../service/JobService";
import { toast } from 'react-toastify';
import ModalEditJob from "../modal/ModalEditJob";


const LayoutHistoryOrder = () => {
    const [loading, setLoading] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [jobToDeleteId, setJobToDeleteId] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editingJobId, setEditingJobId] = useState(null);
    const [selectedJob, setSelectedJob] = useState(null);
    // Khởi tạo state cho từ khóa tìm kiếm và kết quả tìm kiếm
    const [searchKeyword, setSearchKeyword] = useState('');
    const [searchResults, setSearchResults] = useState([]);


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
            const response = await fetchJobsPaging(dataPage.page);
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
                        <h4 className="fw-bold py-3 mb-2"><span className="text-muted fw-light">Dữ liệu /</span> Lịch sử đơn hàng</h4>

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
                            
                            <div className="table-responsive text-nowrap">
                                <table className="table table-light table-hover">
                                    <thead>
                                        <tr>
                                            <th>STT</th>
                                            <th>Tên khách hàng</th>
                                            <th >Mã đơn</th>       
                                            <th >Tổng giá tiền</th>
                                            <th>Trạng thái</th>
                                            <th>Ngày tạo</th>
                                        </tr>
                                    </thead>
                                    <tbody className="table-border-bottom-0">
                                      
                                        
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
export default LayoutHistoryOrder;