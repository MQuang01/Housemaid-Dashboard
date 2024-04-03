import LayoutManagerOrder from "../components/layouts/LayoutManagerOrder";
import Menu from "../components/menu/Menu";

function DashboardHistoryOrder() {
    return (
        <div className="App">
            <div className="layout-wrapper layout-content-navbar">
                <div className="layout-container">
                    <Menu active={"historyDashboard"}/>
                    <LayoutManagerOrder />
                </div>
            </div>
        </div>

    );
}
export default DashboardHistoryOrder;