import React from "react";
import {
  pathToArticles,
  pathToNewArticles,
  pathToScience,
  pathToMusic,
  pathToLogin,
  pathToRegistration, pathToUpdateArticles, pathToOneArticle, pathToUpdateMusic, pathToSpecificArticles, pathToDoList
} from './routes_const'
import Science from "../pages/Science/Science";
import ArticlesContainer from "../pages/Articles/Articles/ArticlesContainer";
import UpdateArticleContainer from "../pages/Articles/UpdateArticle/UpdateArticleContainer";
import CreateArticleContainer from "../pages/Articles/CreateArticle/CreateArticleContainer";
import LoginContainer from "../pages/Login/LoginContainer";
import RegistrationContainer from "../pages/Registration/RegistrationContainer";
import OneArticleContainer from "../pages/Articles/OneArticlePage/OneArticleContainer";
import MusicContainer from "../pages/Music/MusicPage/MusicContainer";
import UpdateMusicContainer from "../pages/Music/UpdateMusic/UpdateMusicContainer";
import ToDoListContainer from "../pages/ToDoList/ToDoListContainer";

export const adminRoutes = []

export const userRoutes = [
  {
    path: pathToNewArticles,
    component: <CreateArticleContainer/>,
    title: 'New Articles'
  },
  {
    path: pathToUpdateArticles,
    component: <UpdateArticleContainer/>,
    title: 'Update Article'
  },
  {
    path: pathToUpdateMusic,
    component: <UpdateMusicContainer/>,
    title: 'Update Music'
  },
  {
    path: pathToDoList,
    component: <ToDoListContainer/>,
    title: 'To Do List'
  }
]

export const allRoutes = [
  {
    path: pathToArticles,
    component: <ArticlesContainer/>,
    title: 'Articles'
  },
  {
    path: pathToSpecificArticles,
    component: <ArticlesContainer/>,
    title: 'Specific Articles'
  },
  {
    path: pathToOneArticle,
    component: <OneArticleContainer/>,
    title: 'Article'
  },
  {
    path: pathToMusic,
    component: <MusicContainer/>,
    title: 'Music'
  },
  // {
  //   path: pathToScience,
  //   component: <Science/>,
  //   title: 'Science'
  // }
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