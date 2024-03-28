import MenuDashboard from "../menu/MenuDashboard";
import LayoutPage from "../layouts/LayoutPage";


function Dashboard() {
    return (
        <div className="App">
            <div className="layout-wrapper layout-content-navbar">
                <div className="layout-container">
                <MenuDashboard/>
                    <LayoutPage/>
                </div>
            </div>
        </div>

    );
}
export default Dashboard;