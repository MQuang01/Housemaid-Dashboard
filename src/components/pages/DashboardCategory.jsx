import MenuCategory from "../menu/MenuCategory";
import LayoutCategory from "../layouts/LayoutCategory";
function DashboardCategory(){
    return(
        <div className="App">
            <div className="layout-wrapper layout-content-navbar">
                <div className="layout-container">
                    <MenuCategory/>
                    <LayoutCategory/>
                </div>
            </div>
        </div>
    )
}

export default DashboardCategory;