import React from "react";
import {
  pathToArticles,
  pathToNewArticles,
  pathToScience,
  pathToMusic,
  pathToLogin,
  pathToRegistration, pathToUpdateArticles
} from './routes_const'
import Music from "../pages/Music/Music";
import Science from "../pages/Science/Science";
import Login from "../pages/Login/Login";
import Registration from "../pages/Registration/Registration";
import ArticlesContainer from "../pages/Articles/ArticlesContainer";
import UpdateArticleContainer from "../pages/Articles/UpdateArticleContainer";
import CreateArticleContainer from "../pages/Articles/CreateArticleContainer";

export const adminRoutes = [
  {
    path: pathToNewArticles,
    component: <CreateArticleContainer/>,
    title: 'New Articles'
  },
  {
    path: pathToUpdateArticles,
    component: <UpdateArticleContainer/>,
    title: 'Update Article'
  }
]

export const userRoutes = [
  {
    path: pathToArticles,
    component: <ArticlesContainer/>,
    title: 'Articles'
  },
  {
    path: pathToMusic,
    component: <Music/>,
    title: 'Music'
  },
  {
    path: pathToScience,
    component: <Science/>,
    title: 'Science'
  }
]

export const authRoutes = [
  {
    path: pathToLogin,
    component: <Login/>,
    title: 'Login'
  },
  {
    path: pathToRegistration,
    component: <Registration/>,
    title: 'Registration'
  }
]