import axios from "axios";

const baseApiURL = 'http://localhost:5000/api/';

const AXIOS = axios.create({
  baseURL: baseApiURL
});

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