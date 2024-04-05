import { useAuth } from "../../context/AuthContext";

const Menu = ({ active }) => {
    const { logout } = useAuth();

    const handleLogout = () => {
        logout();
        window.location.href = "/admin";
        // localStorage.clear();
        sessionStorage.removeItem('accessToken');
    }

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

                    {/*<li className={`menu-item ${active === 'dashboard' ? "active" : ""}`}>*/}
                    {/*    <a href="/dashboard" className="menu-link ">*/}
                    {/*        <i className="menu-icon tf-icons fa fa-home"></i>*/}
                    {/*        <div data-i18n="Analytics">Dashboard</div>*/}
                    {/*    </a>*/}
                    {/*</li>*/}

                    <li className={`menu-item ${active === 'order' ? "active" : ""}`}>
                        <a href="/dashboard/orders" className="menu-link">
                            <i className="menu-icon tf-icons fa fa-table"></i>
                            <div data-i18n="Boxicons">Quản lý hóa đơn</div>
                        </a>
                    </li>
                    <li className={`menu-item ${active === 'histories-order' ? "active" : ""}`}>
                        <a href="/dashboard/histories-order" className="menu-link">
                            <i className="menu-icon tf-icons fa fa-table"></i>
                            <div data-i18n="Boxicons">Lịch sử đơn hàng</div>
                        </a>
                    </li>

                    <li 
                        className={`menu-item ${active === 'customer' ? "active" : ""}`}
                    >
                        <a href="/dashboard/customers" className="menu-link">
                            <i className="menu-icon tf-icons fa fa-table"></i>
                            <div data-i18n="Tables">Khách hàng</div>
                        </a>
                    </li>
                    <li className={`menu-item ${active === 'employee' ? "active" : ""}`}>
                        <a href="/dashboard/employee" className="menu-link">
                            <i className="menu-icon tf-icons fa fa-table"></i>
                            <div data-i18n="Tables">Nhân viên</div>
                        </a>
                    </li>
                
                    <li className={`menu-item ${active === 'category' ? "active" : ""}`}>
                        <a href="/dashboard/categories" className="menu-link">
                            <i className="menu-icon tf-icons fa fa-table"></i>
                            <div data-i18n="Boxicons">Danh mục</div>
                        </a>
                    </li>


                    <li className="menu-header small text-uppercase"><span class="menu-header-text">Misc</span></li>
                    <li className={`menu-item`}>
                        <button  
                            onClick={handleLogout}
                            className="menu-link"
                        >
                            <i class="menu-icon tf-icons fa fa-power-off"></i>
                            <div data-i18n="Documentation">Đăng xuất</div>
                        </button>
                    </li>
                </ul>
            </aside>
        </>
    )
}
export default Menu;