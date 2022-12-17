import axios from "axios";

export const baseApiURL = 'http://localhost:5000/api/';

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

export const musicAPI = {
  getAllSongs: () => {
    return AXIOS.get(baseApiURL + `music/all`)
  },
  getSongsByCategory: category => {
    return AXIOS.get(baseApiURL + `music/${category}`)
  },
  createNewSong: song => {
    return AXIOS.post(baseApiURL + `music/new`, song)
  },
  updateOneSong: (id, updatedSong) => {
    return AXIOS.put(baseApiURL + `music/${id}`, updatedSong)
  },
  deleteOneSong: id => {
    return AXIOS.delete(baseApiURL + `music/${id}`)
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

export const usersAPI = {
  getUsers: () => {
    return AXIOS.get(baseApiURL + `auth/users`)
  }
}