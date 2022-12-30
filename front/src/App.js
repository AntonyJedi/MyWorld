import React from "react";
import {Routes, Route, useLocation} from 'react-router-dom'
import Footer from "./components/Footer/Footer";
import {adminRoutes, allRoutes, authRoutes, userRoutes} from "./routes/routes";
import NotFound from "./pages/Not found/NotFound";
import NavbarContainer from "./components/Navbar/NavbarContainer";
import Loader from "./components/Loader/Loader";
import SideBarMobile from "./components/SideBarMobile/SideBarMobile";
import {AnimatePresence} from "framer-motion"
import AlertComponent from "./components/Alert/AlertComponent";
import HomePageContainer from "./pages/HomePage/HomePageContainer";

const App = ({isUserAuth, isLoading, isUserAdmin, makeOut}) => {
  const location = useLocation()
  return (
    <>
      {isLoading ? <Loader/> : <>
        <NavbarContainer/>
        <main className='main_container'>
          <AlertComponent/>
          <AnimatePresence exitBeforeEnter={true}>
            <Routes location={location} key={location.pathname}>
              <Route exact path='/' element={<HomePageContainer/>}/>
              {isUserAuth && userRoutes.map(route => {
                return <Route key={route.path} path={route.path} element={route.component}/>
              })}
              {allRoutes.map(route => {
                return <Route key={route.path} path={route.path} element={route.component}/>
              })}
              {authRoutes.map(route => {
                return <Route key={route.path} path={route.path} element={route.component}/>
              })}
              {isUserAdmin && adminRoutes.map(route => {
                return <Route key={route.path} path={route.path} element={route.component}/>
              })}
              <Route path='/*' element={<NotFound/>}/>
            </Routes>
          </AnimatePresence>
        </main>
        <Footer/>
        <SideBarMobile isAuth={isUserAuth} makeOut={makeOut} />
      </>}
    </>
  );
}

export default App;
