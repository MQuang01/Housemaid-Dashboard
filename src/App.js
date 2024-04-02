import './App.css';
import Dashboard from "./components/pages/Dashboard";
import {Suspense} from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import DashboardCustomer from "./components/pages/DasboardUser";
import DashboardEmployee from "./components/pages/DashboardEmployee";
import DashboardJob from "./components/pages/DashboardJob";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DashboardCategory from "./components/pages/DashboardCategory";
import DashboardHistoryOrder from './components/pages/DashboardHistoryOrder';
import DashboardOrder from './components/pages/DashboardOrder';


function App() {
  return (
      <>
        <BrowserRouter>
          {/*<AuthProvider>*/}
          <Suspense>
            <Routes>
              <Route path='/' element={<Dashboard/>} />
                <Route path='/customer' element={<DashboardCustomer />} />
                <Route path='/employee' element={<DashboardEmployee />} />
                <Route path='/job' element={<DashboardJob />} />
                <Route path='/category' element={<DashboardCategory/>} />
                <Route path='/history' element={<DashboardHistoryOrder/>} />
                <Route path='/order' element={<DashboardOrder/>} />
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
