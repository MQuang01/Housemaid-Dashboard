import LayoutManagerOrder from "../layouts/LayoutManagerOrder";
import MenuHistoryOrder from "../menu/MenuHistoryOrder";

function DashboardHistoryOrder() {
    return (
        <div className="App">
            <div className="layout-wrapper layout-content-navbar">
                <div className="layout-container">
                    <MenuHistoryOrder />
                    <LayoutManagerOrder />
                </div>
            </div>
        </div>

    );
}
export default DashboardHistoryOrder;