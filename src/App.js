import Dashboard from "./screens/Dashboard";
import {Suspense} from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import DashboardCustomer from "./screens/DasboardUser";
import DashboardEmployee from "./screens/DashboardEmployee";
import DashboardJob from "./screens/DashboardJob";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DashboardCategory from "./screens/DashboardCategory";
import DashboardHistoryOrder from './screens/DashboardHistoryOrder';

import DashboardOrder from "./screens/DashboardOrder";


function App() {
  return (
      <>
        <BrowserRouter>
          {/*<AuthProvider>*/}
          <Suspense>
            <Routes>
              <Route path='/dashboard' >
                <Route path="" element={<Dashboard/>} />
                <Route path='customers' element={<DashboardCustomer />} />
                <Route path='employee' element={<DashboardEmployee />} />
                <Route path='jobs' element={<DashboardJob />} />
                <Route path='categories' element={<DashboardCategory/>} />
                <Route path='histories-order' element={<DashboardHistoryOrder/>} />
                <Route path='orders' element={<DashboardOrder />} />
              </Route>
            </Routes>
          </Suspense>
          {/*</AuthProvider>*/}
        </BrowserRouter >
        {/*<ToastContainer />*/}
        <ToastContainer />
      </>
  );
}

export default App;
