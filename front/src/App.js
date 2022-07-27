import React from "react";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Footer from "./components/Footer/Footer";
import HomePage from "./pages/HomePage/HomePage";
import {adminRoutes, authRoutes, userRoutes} from "./routes/routes";
import NotFound from "./pages/Not found/NotFound";
import NavbarContainer from "./components/Navbar/NavbarContainer";

const App = ({isUserAuth, isLoading}) => {
  debugger
  // const isAuth = false
  return (
    <>
      {isLoading ? <div>Loading...</div> : <Router>
        <NavbarContainer/>
        <main>
          <Routes>
            <Route exact path='/' element={<HomePage/>}/>
            {isUserAuth && adminRoutes.map(route => {
              return <Route key={route.path} path={route.path} element={route.component}/>
            })}
            {userRoutes.map(route => {
              return <Route key={route.path} path={route.path} element={route.component}/>
            })}
            {!isUserAuth && authRoutes.map(route => {
              return <Route key={route.path} path={route.path} element={route.component}/>
            })}
            <Route path='/*' element={<NotFound/>}/>
          </Routes>
        </main>
        <Footer/>
      </Router>}
    </>
  );
}

export default App;
