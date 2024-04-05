import React from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from "react-bootstrap";
import { formatMoney } from "../../until/FormatMoney";


const ModelDetailOrder = ({
  show,
  handleClose,
  data,
  handleUpdateStatusOrder,
  isReset,
}) => {
  
  return (
    <>
      <Modal show={show} onHide={handleClose} size="lg">
        <ModalHeader closeButton>
          <ModalTitle>Chi tiết đơn hàng</ModalTitle>
        </ModalHeader>
        <ModalBody>
          <div className="col-xl-12">
            <h6 className="text-muted" onClick={() => console.log("data", data)}>THÔNG TIN</h6>
            <div className="nav-align-top mb-4">
              <ul className="nav nav-tabs nav-fill" role="tablist">
                <li className="nav-item">
                  <button
                    type="button"
                    className="nav-link active"
                    role="tab"
                    data-bs-toggle="tab"
                    data-bs-target="#navs-justified-customer"
                    aria-controls="navs-justified-customer"
                    aria-selected="true"
                  >
                    <i class="tf-icons bx bx-home"></i> KHÁCH HÀNG
                  </button>
                </li>
                <li class="nav-item">
                  <button
                    type="button"
                    class="nav-link"
                    role="tab"
                    data-bs-toggle="tab"
                    data-bs-target="#navs-justified-order-detail"
                    aria-controls="navs-justified-order-detail"
                    aria-selected="false"
                  >
                    <i class="tf-icons bx bx-user"></i>
                    ĐƠN HÀNG
                  </button>
                </li>
                <li class="nav-item">
                  <button
                    type="button"
                    class="nav-link"
                    role="tab"
                    data-bs-toggle="tab"
                    data-bs-target="#navs-justified-employee"
                    aria-controls="navs-justified-employee"
                    aria-selected="false"
                  >
                    <i class="tf-icons bx bx-user"></i>
                    Nhân viên
                  </button>
                </li>
              </ul>
              <div class="tab-content">
                <div
                  class="tab-pane fade show active"
                  id="navs-justified-customer"
                  role="tabpanel"
                >
                  <div class="row">
                    <label class="col-md-3 col-form-label fw-bold">
                      Họ và tên
                    </label>
                    <div class="col-md-9">
                      <p className="form-control">{data?.user?.fullName}</p>
                    </div>
                  </div>
                  <div class="row">
                    <label class="col-md-3 col-form-label fw-bold">Email</label>
                    <div class="col-md-9">
                      <p className="form-control">{data?.user?.email}</p>
                    </div>
                  </div>
                  <div class="row">
                    <label class="col-md-3 col-form-label fw-bold">
                      Số điện thoại
                    </label>
                    <div class="col-md-9">
                      <p className="form-control">{data?.user?.phone}</p>
                    </div>
                  </div>
                  <div class="row">
                    <label class="col-md-3 col-form-label fw-bold">
                      Giới tính
                    </label>
                    <div class="col-md-9">
                      <p className="form-control">
                        {data?.user?.gender === "MALE" && "Nam"}
                        {data?.user?.gender === "FEMALE" && "Nữ"}
                        {data?.user?.gender === "OTHER" && "Khác"}
                      </p>
                    </div>
                  </div>
                </div>
                <div
                  class="tab-pane fade"
                  id="navs-justified-order-detail"
                  role="tabpanel"
                >
                  <div className="row g-2">
                    <div class="col-md-6">
                      <div class="row">
                        <div class="col-md-6">
                          <p className="fw-bold">Số lượng giúp việc:</p>
                        </div>
                        <div class="col-md-6">
                          <p>{data?.listEmployee.length} người</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row g-2">
                    <div class="col-md-6">
                      <div class="row">
                        <div class="col-md-6">
                          <p className="fw-bold">Danh mục:</p>
                        </div>
                        <div class="col-md-6">
                          <p>{data?.categoryName}</p>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="row">
                        <div class="col-md-6">
                          <p className="fw-bold">Tổng dịch vụ:</p>
                        </div>
                        <div class="col-md-6">
                          <p>{data?.listOrderDetail.length}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-3">
                      <p className="fw-bold">Địa chỉ làm việc:</p>
                    </div>
                    <div class="col-md-9 ">
                      <p>&nbsp;{data?.address}</p>
                    </div>
                  </div>

                  <div class="row g-2">
                    <div class="col-md-6">
                      <div class="row">
                        <div class="col-md-6">
                          <p className="fw-bold">Tổng thời gian:</p>
                        </div>
                        <div class="col-md-6 ">
                          <p>{data?.totalTimeApprox} phút</p>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="row">
                        <div class="col-md-6">
                          <p className="fw-bold">Tổng tiền thanh toán:</p>
                        </div>
                        <div class="col-md-6 ">
                          <p>{formatMoney(data?.totalPrice)}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <table class="table">
                      <thead>
                        <tr>
                          <th scope="col">STT</th>
                          <th scope="col">Tên dịch vụ</th>
                          <th scope="col">Số lượng</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data?.listOrderDetail.map((orderDetail, index) => (
                          <tr key={orderDetail.id}>
                            <td>{index + 1}</td>
                            <td>{orderDetail.job.name}</td>
                            <td>
                              {orderDetail.quantity}{" "}
                              {orderDetail.house_size === null
                                ? "sản phẩm"
                                : "m2"}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div
                  class="tab-pane fade"
                  id="navs-justified-employee"
                  role="tabpanel"
                >
                  <div class="row">
                    <table class="table">
                      <thead>
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">Hình ảnh</th>
                          <th scope="col">Họ và tên</th>
                          <th scope="col">Email</th>
                          <th scope="col">Điện thoại</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data?.listEmployee.map((employee, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td><img src={employee.urlImage} alt="employee.png" className="w-75"/></td>
                            <td>{employee.fullName}</td>
                            <td>{employee.email}</td>
                            <td>{employee.phone}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          {isReset === "reset" ? (
              <Button
                variant="secondary"
                className="btn-label-primary"
                onClick={handleClose}
              >
                Đóng
              </Button>
          ) : (
            <>
              <Button
                variant="success"
                className="btn btn-label-success"
                onClick={() => {
                  const isConfirmed = window.confirm(
                    "Bạn muốn chấp nhận hóa đơn có mã: " +
                      data.currentlyCode +
                      " này không?"
                  );
                  if (isConfirmed) {
                    handleUpdateStatusOrder(data.id, "PROCESS");
                  }
                }}
              >
                Chấp nhận đơn hàng
              </Button>
              <Button
                variant="danger"
                className="btn btn-label-danger"
                onClick={() => {
                  const isConfirmed = window.confirm(
                    "Bạn muốn hủy hóa đơn có mã: " +
                      data.currentlyCode +
                      " này không?"
                  );
                  if (isConfirmed) {
                    handleUpdateStatusOrder(data.id, "CANCEL");
                  }
                }}
              >
                Hủy đơn hàng
              </Button>
              <Button
                variant="secondary"
                className="btn-label-primary"
                onClick={handleClose}
              >
                Đóng
              </Button>
            </>
          )}
        </ModalFooter>
      </Modal>
    </>
  );
};

export default ModelDetailOrder;
