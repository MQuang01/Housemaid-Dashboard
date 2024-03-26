const MenuUser = () => {
    return(
        <>
            <aside id="layout-menu" className="layout-menu menu-vertical menu bg-menu-theme">
                <div className="app-brand demo">
                    <a  className="app-brand-link">

                        <h1 className="text-primary mb-0 display-5">House<span className="text-black">Maid</span><i className="bx bx-broom text-primary ms-2"></i></h1>
                    </a>

                    <a href="javascript:void(0);"
                       className="layout-menu-toggle menu-link text-large ms-auto d-block d-xl-none">
                        <i className="bx bx-chevron-left bx-sm align-middle"></i>
                    </a>
                </div>

                <div className="menu-inner-shadow"></div>

                <ul className="menu-inner py-1">

                    <li className="menu-item">
                        <a href="/" className="menu-link">
                            <i className="menu-icon tf-icons bx bx-home-circle"></i>
                            <div data-i18n="Analytics">Dashboard</div>
                        </a>
                    </li>




                    <li className="menu-header small text-uppercase">
                        <span className="menu-header-text">Pages</span>
                    </li>
                    <li className="menu-item active">
                        <a href="/client" className="menu-link">
                            <i className="menu-icon tf-icons bx bx-table"></i>
                            <div data-i18n="Tables">User</div>
                        </a>
                    </li>


                    <li className="menu-header small text-uppercase"><span class="menu-header-text">Misc</span></li>
                    <li className="menu-item">
                        <a
                            href="https://github.com/themeselection/sneat-html-admin-template-free/issues"
                            target="_blank"
                            className="menu-link"
                        >
                            <i class="menu-icon tf-icons bx bx-support"></i>
                            <div data-i18n="Support">Support</div>
                        </a>
                    </li>
                    <li className="menu-item">
                        <a
                            href="https://themeselection.com/demo/sneat-bootstrap-html-admin-template/documentation/"
                            target="_blank"
                            className="menu-link"
                        >
                            <i class="menu-icon tf-icons bx bx-file"></i>
                            <div data-i18n="Documentation">Documentation</div>
                        </a>
                    </li>
                </ul>
            </aside>
        </>
    )
}
export default MenuUser;