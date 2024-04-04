import LayoutJob from "../components/layouts/LayoutJob";
import Menu from "../components/menu/Menu";


function DashboardJob() {
    return (
        <div className="App">
            <div className="layout-wrapper layout-content-navbar">
                <div className="layout-container">
                    <Menu active={"job"}/>
                    <LayoutJob/>
                </div>
            </div>
        </div>

    );
}
export default DashboardJob;