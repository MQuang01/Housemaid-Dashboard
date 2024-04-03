import LayoutCategory from "../components/layouts/LayoutCategory";
import Menu from "../components/menu/Menu";
function DashboardCategory(){
    return(
        <div className="App">
            <div className="layout-wrapper layout-content-navbar">
                <div className="layout-container">
                    <Menu active={"category"}/>
                    <LayoutCategory/>
                </div>
            </div>
        </div>
    )
}

export default DashboardCategory;