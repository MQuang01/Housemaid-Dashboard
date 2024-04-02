

import MenuEmployees from "../menu/MenuEmployees";
import LayoutEmployee from "../layouts/LayoutEmployee";


function DashboardEmployee() {
    return (
        <div className="App">
            <div className="layout-wrapper layout-content-navbar">
                <div className="layout-container">
                    <MenuEmployees/>
                    <LayoutEmployee/>
                </div>
            </div>
        </div>

    );
}
export default DashboardEmployee;