import LayoutHistoryOrder from "../components/layouts/LayoutHistoryOrder";
import Menu from "../components/menu/Menu";

function DashboardHistoryOrder() {
    return (
        <div className="App">
            <div className="layout-wrapper layout-content-navbar">
                <div className="layout-container">
                    <Menu active={"histories-order"}/>
                    <LayoutHistoryOrder />
                </div>
            </div>
        </div>

    );
}
export default DashboardHistoryOrder;