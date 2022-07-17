import axios from "axios";

const baseApiURL = 'http://localhost:5000/api/';

const AXIOS = axios.create({
  withCredentials: true,
  baseURL: baseApiURL
});

AXIOS.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
  return config
})

export const articlesAPI = {
  getAllArticles: () => {
    return AXIOS.get(baseApiURL + 'articles')
  },
  getOneArticle: id => {
    return AXIOS.get(baseApiURL + `articles/${id}`)
  },
  deleteOneArticle: id => {
    return AXIOS.delete(baseApiURL + `articles/${id}`)
  },
  createNewArticle: form => {
    return AXIOS.post(baseApiURL + 'articles', form)
  },
  updateArticle: (form, id) => {
    return AXIOS.put(baseApiURL + `articles/${id}`, form)
  }
}

export const quotesAPI = {
  getAllQuotes: () => {
    return AXIOS.get(baseApiURL)
  }
}

export const authAPI = {
  registration: async (name, email, password) => {
    return AXIOS.post(baseApiURL + `auth/registration`, {name, email, password})
  },
  login: async (email, password) => {
    return AXIOS.post(baseApiURL + `auth/login`, {email, password})
  },
  logout: async () => {
    return AXIOS.post(baseApiURL + `auth/logout`)
  }
}