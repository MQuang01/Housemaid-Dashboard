import LayoutPage from "../components/layouts/LayoutPage";
import Menu from "../components/menu/Menu";


function Dashboard() {
    return (
        <div className="App">
            <div className="layout-wrapper layout-content-navbar">
                <div className="layout-container">
                    <Menu active={"dashboard"}/>
                    <LayoutPage/>
                </div>
            </div>
        </div>

    );
}
export default Dashboard;