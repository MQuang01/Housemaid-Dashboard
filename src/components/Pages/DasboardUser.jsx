

import MenuUser from "../menu/MenuUser";
import LayoutClient from "../layouts/LayoutUser";


function Dashboard() {
    return (
        <div className="App">
            <div className="layout-wrapper layout-content-navbar">
                <div className="layout-container">
                    <MenuUser/>
                    <LayoutClient/>
                </div>
            </div>
        </div>

    );
}
export default Dashboard;