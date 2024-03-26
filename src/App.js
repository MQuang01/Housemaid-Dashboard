import logo from './logo.svg';
import './App.css';
import Dashboard from "./components/Pages/Dashboard";
import {Suspense} from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import DasboardClient from "./components/Pages/DasboardUser";

function App() {
  return (
      <>
        <BrowserRouter>
          {/*<AuthProvider>*/}
          <Suspense>
            <Routes>
              <Route path='/' element={<Dashboard/>} />
                <Route path='/client' element={<DasboardClient />} />
            </Routes>
          </Suspense>
          {/*</AuthProvider>*/}
        </BrowserRouter >
        {/*<ToastContainer />*/}
      </>
  );
}

export default App;
