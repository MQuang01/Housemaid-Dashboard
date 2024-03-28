import logo from './logo.svg';
import './App.css';
import Dashboard from "./components/pages/Dashboard";
import {Suspense} from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import DashboardCustomer from "./components/pages/DasboardUser";
import DashboardJob from "./components/pages/DashboardJob";
function App() {
  return (
      <>
        <BrowserRouter>
          {/*<AuthProvider>*/}
          <Suspense>
            <Routes>
              <Route path='/' element={<Dashboard/>} />
                <Route path='/customer' element={<DashboardCustomer />} />
                <Route path='/job' element={<DashboardJob />} />

            </Routes>
          </Suspense>
          {/*</AuthProvider>*/}
        </BrowserRouter >
        {/*<ToastContainer />*/}
      </>
  );
}

export default App;
