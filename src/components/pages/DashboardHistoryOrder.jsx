import LayoutHistoryOrder from "../layouts/LayoutHistoryOrder";
import MenuHistoryOrder from "../menu/MenuHistoryOrder";

function DashboardHistoryOrder() {
    return (
        <div className="App">
            <div className="layout-wrapper layout-content-navbar">
                <div className="layout-container">
                    <MenuHistoryOrder />
                   <LayoutHistoryOrder />
                </div>
            </div>
        </div>

    );
}
export default DashboardHistoryOrder;