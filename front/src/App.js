import React from "react";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Footer from "./components/Footer/Footer";
import HomePage from "./pages/HomePage/HomePage";
import {adminRoutes, allRoutes, authRoutes, userRoutes} from "./routes/routes";
import NotFound from "./pages/Not found/NotFound";
import NavbarContainer from "./components/Navbar/NavbarContainer";
import Loader from "./components/Loader/Loader";
import SideBarMobile from "./components/SideBarMobile/SideBarMobile";

const App = ({isUserAuth, isLoading, isUserAdmin}) => {
  return (
    <>
      {isLoading ? <Loader/> : <Router>
        <NavbarContainer/>
        <main className='main_container'>
          <Routes>
            <Route exact path='/' element={<HomePage/>}/>
            {isUserAuth && userRoutes.map(route => {
              return <Route key={route.path} path={route.path} element={route.component}/>
            })}
            {allRoutes.map(route => {
              return <Route key={route.path} path={route.path} element={route.component}/>
            })}
            {!isUserAuth && authRoutes.map(route => {
              return <Route key={route.path} path={route.path} element={route.component}/>
            })}
            {isUserAdmin && adminRoutes.map(route => {
              return <Route key={route.path} path={route.path} element={route.component}/>
            })}
            <Route path='/*' element={<NotFound/>}/>
          </Routes>
        </main>
        <Footer/>
        <SideBarMobile isAuth={isUserAuth}/>
      </Router>}
    </>
  );
}

export default App;
