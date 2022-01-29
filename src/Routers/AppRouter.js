import { Routes, Route, BrowserRouter} from "react-router-dom";
import AppBar from "../components/AppBar/AppBar";
import Login from "../components/Login/Login";
import LandingPage from "../components/LandingPage/LandingPage";
import Registry from "../components/Registry/Registry";
import Footer from "../components/Footer/Footer";
import BoxSx from "../components/BoxSx/BoxSx";
import SelfTriage from "../components/SelfTriage/SelfTriage";
import Subcategories from "../components/Subcategories/Subcategories";
import Agendamiento from "../components/Agendamiento/Agendamiento";
import RecuperarPasword from "../components/Login/RecuperarPassword";

import * as React from "react";

//import {aux} from "";


export const AppRouter = () => {
    return (
        <div className="page-container">
            <div className="content-wrap">
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<div><AppBar data={0}/><BoxSx /></div>} />
                        <Route path="/Registry" element={<div><AppBar data={0}/><Registry /></div>} />
                        <Route path="/Login" element={<div><AppBar data={0} /><Login /></div>} />
                        <Route path="/LandingPage" element={<div><AppBar data={1} /><LandingPage /></div>} />
                        <Route path="/SelfTriage" element={<div><AppBar data={1}/><SelfTriage/></div>}/>
                        <Route path="/SelfTriage/:categoryName" element={<div><AppBar data={1}/><Subcategories/></div>}/>
                        <Route path="/Agendamiento" element={<div><AppBar data={1}/><Agendamiento/></div>}/>
                        <Route path="/Recover" element={<div><AppBar data={0}/><RecuperarPasword/></div>}/>                
                    </Routes>
                </BrowserRouter>
            </div>
            <Footer/>
        </div>  
        
    )
}
