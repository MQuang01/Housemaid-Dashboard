import { useState } from "react";

const Menu = ({ active }) => {
    return (
        <>
            <aside id="layout-menu" className="layout-menu menu-vertical menu bg-menu-theme">
                <div className="app-brand demo mb-3">
                    <a className="app-brand-link">
                        <h4 className="text-primary mb-0 display-5 d-flex align-items-center">
                            House<span className="text-white">Maid</span>
                            <i className="fa fa-broom text-primary ms-2" style={{ fontSize: '2rem' }}></i>
                        </h4>
                    </a>
                </div>

                <div className="menu-inner-shadow"></div>

                <ul className="menu-inner py-1">

                    <li className={`menu-item ${active === 'dashboard' ? "active" : ""}`}>
                        <a href="/manager" className="menu-link ">
                            <i className="menu-icon tf-icons fa fa-home"></i>
                            <div data-i18n="Analytics">Dashboard</div>
                        </a>
                    </li>

                    <li className="menu-header small text-uppercase">
                        <span className="menu-header-text">Pages</span>
                    </li>
                    <li 
                        className={`menu-item ${active === 'customer' ? "active" : ""}`}
                    >
                        <a href="/manager/customers" className="menu-link">
                            <i className="menu-icon tf-icons fa fa-table"></i>
                            <div data-i18n="Tables">Khách hàng</div>
                        </a>
                    </li>
                    <li className={`menu-item ${active === 'employee' ? "active" : ""}`}>
                        <a href="/manager/employee" className="menu-link">
                            <i className="menu-icon tf-icons fa fa-table"></i>
                            <div data-i18n="Tables">Nhân viên</div>
                        </a>
                    </li>
                    <li class={`menu-item ${active === 'job' ? "active" : ""}`}>
                        <a href="/manager/jobs" class="menu-link">
                            <i class="menu-icon tf-icons fa fa-table"></i>
                            <div data-i18n="Boxicons">Dịch vụ</div>
                        </a>
                    </li>
                    <li className={`menu-item ${active === 'category' ? "active" : ""}`}>
                        <a href="/manager/categories" className="menu-link">
                            <i className="menu-icon tf-icons fa fa-table"></i>
                            <div data-i18n="Boxicons">Danh mục</div>
                        </a>
                    </li>
                    <li className={`menu-item ${active === 'historyOrder' ? "active" : ""}`}>
                        <a href="/manager/orders" className="menu-link">
                            <i className="menu-icon tf-icons fa fa-table"></i>
                            <div data-i18n="Boxicons">Lịch sử đơn hàng</div>
                        </a>
                    </li>
                    <li className={`menu-item ${active === 'order' ? "active" : ""}`}>
                        <a href="/manager/orders" className="menu-link">
                            <i className="menu-icon tf-icons fa fa-table"></i>
                            <div data-i18n="Boxicons">Quản lý hóa đơn</div>
                        </a>
                    </li>

                    <li className="menu-header small text-uppercase"><span class="menu-header-text">Misc</span></li>
                    <li className={`menu-item`}>
                        <a
                            href="#"
                            className="menu-link"
                        >
                            <i class="menu-icon tf-icons fa fa-power-off"></i>
                            <div data-i18n="Documentation">Đăng xuất</div>
                        </a>
                    </li>
                </ul>
            </aside>
        </>
    )
}
export default Menu;