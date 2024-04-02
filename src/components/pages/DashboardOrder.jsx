import LayoutOrder from "../layouts/LayoutOrder";
import MenuOrder from "../menu/MenuOrder";


function DashboardOrder() {
    return (
        <div className="App">
            <div className="layout-wrapper layout-content-navbar">
                <div className="layout-container">
                    <MenuOrder />
                    <LayoutOrder/>
                </div>
            </div>
        </div>

    );
}
export default DashboardOrder;