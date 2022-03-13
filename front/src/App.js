import React from "react";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import HomePage from "./pages/HomePage/HomePage";
import ArticlesContainer from "./pages/Articles/ArticlesContainer";
import CreateArticleContainer from "./pages/Articles/CreateArticleContainer";
import UpdateArticleContainer from "./pages/Articles/UpdateArticleContainer";

const App = () => {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route exact path='/' element={<HomePage/>}/>
        <Route path='/articles' element={<ArticlesContainer/>}/>
        <Route path='/newpost' element={<CreateArticleContainer/>}/>
        <Route path='/update/:id' element={<UpdateArticleContainer/>}/>
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
