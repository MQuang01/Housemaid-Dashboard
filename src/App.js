import Dashboard from "./screens/Dashboard";
import {Suspense} from "react";
import {BrowserRouter, Route, Routes, useNavigate} from "react-router-dom";
import DashboardCustomer from "./screens/DasboardUser";
import DashboardEmployee from "./screens/DashboardEmployee";
import DashboardJob from "./screens/DashboardJob";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DashboardCategory from "./screens/DashboardCategory";
import DashboardHistoryOrder from './screens/DashboardHistoryOrder';

import DashboardOrder from "./screens/DashboardOrder";
import LoginAdmin from "./screens/Login/LoginAdmin";
import {AuthProvider, useAuth} from "./context/AuthContext";


function App() {

  return (
      <>
        <BrowserRouter>
          <AuthProvider>
          <Suspense>
            <Routes>
              <Route path="/admin" element={<LoginAdmin />} />
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
          </AuthProvider>
        </BrowserRouter >
        {/*<ToastContainer />*/}
        <ToastContainer />
      </>
  );
}

export default App;
