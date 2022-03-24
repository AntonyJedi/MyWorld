import React from "react";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Footer from "./components/Footer/Footer";
import HomePage from "./pages/HomePage/HomePage";
import {adminRoutes, authRoutes, userRoutes} from "./routes/routes";
import NotFound from "./pages/Not found/NotFound";
import NavbarContainer from "./components/Navbar/NavbarContainer";

const App = () => {
  const isAuth = false
  return (
    <Router>
      <NavbarContainer/>
      <main>
        <Routes>
          <Route exact path='/' element={<HomePage/>}/>
          {isAuth && adminRoutes.map(route => {
            return <Route key={route.path} path={route.path} element={route.component} />
          })}
          {userRoutes.map(route => {
            return <Route key={route.path} path={route.path} element={route.component} />
          })}
          {!isAuth && authRoutes.map(route => {
            return <Route key={route.path} path={route.path} element={route.component} />
          })}
          <Route path='/*' element={<NotFound/>}/>
        </Routes>
      </main>
      <Footer/>
    </Router>
  );
}

export default App;
