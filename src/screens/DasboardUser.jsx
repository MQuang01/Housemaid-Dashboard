import LayoutCustomer from "../components/layouts/LayoutUser";
import Menu from "../components/menu/Menu";


function DashboardUser() {
    return (
        <div className="App">
            <div className="layout-wrapper layout-content-navbar">
                <div className="layout-container">
                    <Menu active={"customer"}/>
                    <LayoutCustomer/>
                </div>
            </div>
        </div>

    );
}
export default DashboardUser;