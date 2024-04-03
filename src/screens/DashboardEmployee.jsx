
import LayoutEmployee from "../components/layouts/LayoutEmployee";
import Menu from "../components/menu/Menu";


function DashboardEmployee() {
    return (
        <div className="App">
            <div className="layout-wrapper layout-content-navbar">
                <div className="layout-container">
                    <Menu active={"employee"}/>
                    <LayoutEmployee/>
                </div>
            </div>
        </div>

    );
}
export default DashboardEmployee;