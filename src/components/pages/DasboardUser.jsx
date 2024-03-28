

import MenuUser from "../menu/MenuUser";
import LayoutCustomer from "../layouts/LayoutUser";


function DashboardUser() {
    return (
        <div className="App">
            <div className="layout-wrapper layout-content-navbar">
                <div className="layout-container">
                    <MenuUser/>
                    <LayoutCustomer/>
                </div>
            </div>
        </div>

    );
}
export default DashboardUser;