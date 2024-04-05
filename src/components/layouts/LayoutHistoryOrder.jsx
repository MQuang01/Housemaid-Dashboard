import Footer from "../footer/Footer";
import React, { useEffect, useState } from "react";
import LoadingModal from "../loading/LoadingModal";
import { fetchDataOrder, updateStatusOrder } from "../../service/OrderService";
import { toast } from "react-toastify";
import ModelDetailOrder from "../modal/ModelDetailOrder";
import { formatMoney } from "../../until/FormatMoney";
import Pagination from "../pagination/Pagination";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css';

const LayoutHistoryOrder = () => {
  // const options =  {
  //   title: 'Title',
  //   message: 'Message',
  //   buttons: [
  //     {
  //       label: 'Yes',
  //       onClick: () => alert('Click Yes')
  //     },
  //     {
  //       label: 'No',
  //     }
  //   ],
  //   closeOnEscape: true,
  //   closeOnClickOutside: true,
  //   keyCodeForClose: [8, 32],
  //   willUnmount: () => {},
  //   afterClose: () => {},
  //   onClickOutside: () => {},
  //   onKeypress: () => {},
  //   onKeypressEscape: () => {},
  //   overlayClassName: "overlay-custom-class-name"
  // };
  
  

  const [loading, setLoading] = useState(false);
  const [dataOrders, setDataOrders] = useState([]);
  const [showDetaiOrderModal, setShowDetaiOrderModal] = useState(false);
  const [orderDetail, setOrderDetail] = useState(null);

  const handleUpdateStatusOrder = async (id, status) => {
    setLoading(true);
    try {
      // Gọi API để cập nhật trạng thái đơn hàng
      await updateStatusOrder(id, status);
      
      // Tạo một bản sao của dataOrders mà không bao gồm đơn hàng có id đã được cập nhật
      const updatedDataOrders = dataOrders.filter(order => order.id !== id);
  
      // Cập nhật lại state dataOrders với mảng đã cập nhật
      setDataOrders(updatedDataOrders);
  
      // Hiển thị thông báo thành công
      toast.success(`Đã cập nhật trạng thái đơn hàng thành công`);
    } catch (error) {
      // Xử lý lỗi nếu có
      toast.error("Sửa trạng thái đơn hàng bị lỗi: " + error.message);
    } finally {
      setLoading(false);
    }
  };
  
  //Show detail order by id
  const handleShowDetailOrderClick = (id) => {
    // Tìm đơn hàng với id tương ứng
    const order = dataOrders.find((data) => data.id === id);
    if (order) {
      // Kiểm tra nếu đơn hàng tồn tại
      setOrderDetail(order); // Cập nhật thông tin đơn hàng
      setShowDetaiOrderModal(true); // Hiển thị modal
    }
  };

  const fetchData = async () => {
    try {
      const data = await fetchDataOrder();
      const filteredOrdersStatusWaiting = data.filter(
        (item) => item.status !== "WAITING"
      );
      setDataOrders(filteredOrdersStatusWaiting);
    } catch (error) {
      toast.error("Lấy data Order thất bại, error: " + error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    setLoading(true);
    fetchData();
  }, []);

  const [searchKey, setSearchKey] = useState("");
  const [sortKey, setSortKey] = useState("status");
  const [sortOrder, setSortOrder] = useState("desc");
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [dataPage, setDataPage] = useState({
    page: 0,
    totalPage: 0,
  });
  const pageSize = 10; // Kích thước của mỗi trang

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const handleSearchChange = (e) => {
    setSearchKey(e.target.value);
  };

  useEffect(() => {
    let filteredOrders = [...dataOrders];

    if (searchKey.trim() !== "") {
      filteredOrders = filteredOrders.filter(
        (order) =>
          order.currentlyCode.toLowerCase().includes(searchKey.toLowerCase()) ||
          order.address.toLowerCase().includes(searchKey.toLowerCase()) ||
          order.categoryName.toLowerCase().includes(searchKey.toLowerCase())
      );
    }

    if (sortKey.trim() !== "") {
      filteredOrders.sort((a, b) => {
        let comparison = 0;
        if (a[sortKey] < b[sortKey]) {
          comparison = -1;
        } else if (a[sortKey] > b[sortKey]) {
          comparison = 1;
        }
        return sortOrder === "asc" ? comparison : comparison * -1;
      });
    }
    // Tính toán số trang và cập nhật dataPage
    const totalPage = Math.ceil(filteredOrders.length / pageSize);
    setDataPage((prevDataPage) => ({
      ...prevDataPage,
      page: dataPage.page,
      totalPage,
    }));

    // Chia mảng thành các trang và lưu vào filteredOrders
    const startIndex = dataPage.page * pageSize;
    const endIndex = startIndex + pageSize;
    const slicedOrders = filteredOrders.slice(startIndex, endIndex);
    setFilteredOrders(slicedOrders);
  }, [dataOrders, searchKey, sortKey, sortOrder, pageSize, dataPage.page]); // Thêm dataPage.page vào dependencies để hiệu ứng được cập nhật khi thay đổi trang

  return (
    <>
      <LoadingModal loading={loading} />
      <div className="layout-page">
        <div className="content-wrapper">
          <div className="container-xxl flex-grow-1 container-p-y">
            <h4 className="fw-bold py-3 mb-2">

              <span className="text-muted fw-light">Dữ liệu /</span>Lịch sử hóa đơn
            </h4>

            <div className="d-flex justify-content-between align-items-center mb-4">
              <input
                type="text"
                className="form-control"
                placeholder="Tìm kiếm theo mã code, danh mục, địa chỉ..."
                onChange={handleSearchChange}
                defaultValue={searchKey}
                name={"search"}
              />
            </div>
            <div className="card">
              <div className="table-responsive text-nowrap">
                <table className="table table-light table-hover">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th
                        onClick={() => {
                          setSortKey("currentlyCode");
                          toggleSortOrder();
                        }}
                      >
                        Mã đơn{" "}
                        {sortKey === "currentlyCode" &&
                          (sortOrder === "asc" ? (
                            <i class="fa-solid fa-sort-up"></i>
                          ) : (
                            <i class="fa-solid fa-sort-down"></i>
                          ))}
                      </th>
                      <th
                        onClick={() => {
                          setSortKey("categoryName");
                          toggleSortOrder();
                        }}
                      >
                        Danh mục{" "}
                        {sortKey === "categoryName" &&
                          (sortOrder === "asc" ? (
                            <i class="fa-solid fa-sort-up"></i>
                          ) : (
                            <i class="fa-solid fa-sort-down"></i>
                          ))}
                      </th>
                      <th
                        onClick={() => {
                          setSortKey("address");
                          toggleSortOrder();
                        }}
                      >
                        Địa chỉ làm việc{" "}
                        {sortKey === "address" &&
                          (sortOrder === "asc" ? (
                            <i class="fa-solid fa-sort-up"></i>
                          ) : (
                            <i class="fa-solid fa-sort-down"></i>
                          ))}
                      </th>
                      <th
                        onClick={() => {
                          setSortKey("totalPrice");
                          toggleSortOrder();
                        }}
                      >
                        Tổng giá tiền{" "}
                        {sortKey === "totalPrice" &&
                          (sortOrder === "asc" ? (
                            <i class="fa-solid fa-sort-up"></i>
                          ) : (
                            <i class="fa-solid fa-sort-down"></i>
                          ))}
                      </th>
                      <th
                        onClick={() => {
                          setSortKey("workDay");
                          toggleSortOrder();
                        }}
                      >
                        Ngày giờ làm việc{" "}
                        {sortKey === "workDay" &&
                          (sortOrder === "asc" ? (
                            <i class="fa-solid fa-sort-up"></i>
                          ) : (
                            <i class="fa-solid fa-sort-down"></i>
                          ))}
                      </th>
                      <th onClick={() => {
                          setSortKey("status");
                          toggleSortOrder();
                        }}>Trạng thái đơn{" "}
                        {sortKey === "status" &&
                          (sortOrder === "asc" ? (
                            <i class="fa-solid fa-sort-up"></i>
                          ) : (
                            <i class="fa-solid fa-sort-down"></i>
                          ))}</th>
                      <th>Lựa chọn</th>
                    </tr>
                  </thead>
                  <tbody className="table-border-bottom-0 ">
                    {filteredOrders.map((item, index) => (
                      <tr key={item.id}>
                        <td>{index + 1}</td>
                        <td>{item.currentlyCode}</td>
                        <td>{item.categoryName}</td>
                        <td style={{wordWrap: "break-word"}}>{item.address}</td>
                        <td>{formatMoney(item.totalPrice)}</td>
                        <td>
                          {item.workDay} : {item.timeStart} giờ
                        </td>
                        <td>
                            {item.status === "PROCESS" && "Chờ kết quả"}
                            {item.status === "COMPLETE" && "Hoàn thành"}
                            {item.status === "CANCEL" && "Hủy"}
                        </td>
                        <td>
                            <button
                              onClick={() =>
                                handleShowDetailOrderClick(item.id)
                              }
                              className="btn btn-outline-info me-2"
                              title="Xem chi tiết hóa đơn"
                            >
                              <i className={"fa-solid fa-eye"}></i>
                            </button>
                            {(item.status === "PROCESS") && (
                                <button
                                    variant="outline-success"
                                    onClick={() => {confirmAlert({
                                      title: 'Thông báo',
                                      message: `Bạn muốn xác nhận đơn đặt dịch vụ có mã: ${item.currentlyCode} về lại trạng thái "Đã hoàn thành" phải không?`,
                                      buttons: [
                                        {
                                          label: 'Đúng',
                                          onClick: () => handleUpdateStatusOrder(item.id ,"COMPLETE")
                                        },
                                        {
                                          label: 'Không',
                                        }
                                      ],
                                    })}}
                                    className="btn btn-outline-warning me-2"
                                    title="Hóa đơn hoàn thành"
                                    >
                                    <i class="fa-solid fa-check"></i>
                                </button>  
                            )}
                                 
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="card-footer d-flex justify-content-center">
                  <Pagination
                    dataPage={dataPage}
                    setDataPage={setDataPage}
                    loading={loading}
                    setLoading={setLoading}
                  />
                </div>
                <ModelDetailOrder
                  show={showDetaiOrderModal}
                  data={orderDetail}
                  isReset={"reset"}
                  handleClose={() => setShowDetaiOrderModal(false)}
                  handleUpdateStatusOrder={handleUpdateStatusOrder}
                />
              </div>
            </div>
          </div>
          <Footer />
          <div className="content-backdrop fade"></div>
        </div>
      </div>
    </>
  );
};
export default LayoutHistoryOrder;
