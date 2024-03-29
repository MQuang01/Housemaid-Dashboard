import MenuUser from "../menu/MenuUser";
import LayoutCategory from "../layouts/LayoutCategory";
function DashboardCategory(){
    return(
        <div className="App">
            <div className="layout-wrapper layout-content-navbar">
                <div className="layout-container">
                    <MenuUser/>
                    <LayoutCategory/>
                </div>
            </div>
        </div>
    )
}

export default DashboardCategory;