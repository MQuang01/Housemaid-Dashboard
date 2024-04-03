import LayoutManagerOrder from "../components/layouts/LayoutManagerOrder";
import MenuOrder from "../components/menu/MenuOrder";


function DashboardOrder() {
    return (
        <div className="App">
            <div className="layout-wrapper layout-content-navbar">
                <div className="layout-container">
                    <MenuOrder />
                    <LayoutManagerOrder />
                </div>
            </div>
        </div>

    );
}
export default DashboardOrder;