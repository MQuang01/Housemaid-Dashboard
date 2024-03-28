import MenuJob from "../menu/MenuJob";
import LayoutJob from "../layouts/LayoutJob";


function DashboardJob() {
    return (
        <div className="App">
            <div className="layout-wrapper layout-content-navbar">
                <div className="layout-container">
                    <MenuJob/>
                    <LayoutJob/>
                </div>
            </div>
        </div>

    );
}
export default DashboardJob;