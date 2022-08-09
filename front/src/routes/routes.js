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
import ArticlesContainer from "../pages/Articles/ArticlesContainer";
import UpdateArticleContainer from "../pages/Articles/UpdateArticleContainer";
import CreateArticleContainer from "../pages/Articles/CreateArticleContainer";
import LoginContainer from "../pages/Login/LoginContainer";
import RegistrationContainer from "../pages/Registration/RegistrationContainer";

export const adminRoutes = [
  {
    path: pathToUpdateArticles,
    component: <UpdateArticleContainer/>,
    title: 'Update Article'
  }
]

export const userRoutes = [
  {
    path: pathToNewArticles,
    component: <CreateArticleContainer/>,
    title: 'New Articles'
  }
]

export const allRoutes = [
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
    component: <LoginContainer/>,
    title: 'Login'
  },
  {
    path: pathToRegistration,
    component: <RegistrationContainer/>,
    title: 'Registration'
  }
]