import React from "react";
import {
  pathToArticles,
  pathToNewArticles,
  pathToScience,
  pathToMusic,
  pathToLogin,
  pathToRegistration, pathToUpdateArticles, pathToOneArticle, pathToUpdateMusic
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

export const adminRoutes = [
  {
    path: pathToUpdateArticles,
    component: <UpdateArticleContainer/>,
    title: 'Update Article'
  },
  {
    path: pathToUpdateMusic,
    component: <UpdateMusicContainer/>,
    title: 'Update Music'
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
    path: pathToOneArticle,
    component: <OneArticleContainer/>,
    title: 'Article'
  },
  {
    path: pathToMusic,
    component: <MusicContainer/>,
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