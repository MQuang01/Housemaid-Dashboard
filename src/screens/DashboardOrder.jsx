import LayoutManagerOrder from "../components/layouts/LayoutManagerOrder";
import Menu from "../components/menu/Menu";


function DashboardOrder() {
    return (
        <div className="App">
            <div className="layout-wrapper layout-content-navbar">
                <div className="layout-container">
                    <Menu active={"order"}/>
                    <LayoutManagerOrder />
                </div>
            </div>
        </div>

    );
}
export default DashboardOrder;