import axios from "axios";

export const baseApi = 'http://localhost:5010/';

export const baseApiURL = 'http://localhost:5010/api/';

const AXIOS = axios.create({
  withCredentials: true,
  baseURL: baseApiURL
});

AXIOS.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
  return config
})

export const articlesAPI = {
  getAllArticles: category => {
    if (category) {
      return AXIOS.get(baseApiURL + `articles/?category=${category}`)
    } else {
      return AXIOS.get(baseApiURL + 'articles')
    }
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
  },
  getAllCategory: () => {
    return AXIOS.get(baseApiURL + 'categories')
  },
  newCategory: newCategory => {
    return AXIOS.post(baseApiURL + 'categories/new', newCategory)
  },
  likeOneArticle: (id, user, add) => {
    return AXIOS.put(baseApiURL + `articles/like/${id}`, {user, add})
  },
  deleteOneCategory: id => {
    return AXIOS.delete(baseApiURL + `categories/${id}`)
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
  likeOneSong: (id, user, add) => {
    return AXIOS.put(baseApiURL + `music/like/${id}`, {user, add})
  },
  deleteOneSong: id => {
    return AXIOS.delete(baseApiURL + `music/${id}`)
  }
}

export const notesAPI = {
  getAllNotes: userName => {
    return AXIOS.get(baseApiURL + `notes/${userName}`)
  },
  createNewNote: note => {
    return AXIOS.post(baseApiURL + `notes`, note)
  },
  updateOneNote: id => {
    return AXIOS.put(baseApiURL + `notes/${id}`)
  },
  deleteOneNote: id => {
    return AXIOS.delete(baseApiURL + `notes/${id}`)
  }
}

export const quotesAPI = {
  getAllQuotes: () => {
    return AXIOS.get(baseApiURL)
  }
}

export const authAPI = {
  registration: (name, email, password, about, job, mood, interests) => {
    return AXIOS.post(baseApiURL + `auth/registration`, {name, email, password, about, job, mood, interests})
  },
  login: (email, password) => {
    return AXIOS.post(baseApiURL + `auth/login`, {email, password})
  },
  logout: () => {
    return AXIOS.post(baseApiURL + `auth/logout`)
  }
}

export const usersAPI = {
  getUsers: () => {
    return AXIOS.get(baseApiURL + `auth/users`)
  },
  updateUser: (user) => {
    const {nickName, email, about, job, currectMood, interests, friends} = user
    return AXIOS.post(baseApiURL + `auth/user/update`, {nickName, email, about, job, currectMood, interests, friends})
  }
}

export const postsAPI = {
  getAllPosts: () => {
    return AXIOS.get(baseApiURL + `posts`)
  },
  createPost: post => {
    return AXIOS.post(baseApiURL + 'posts', {post})
  },
  editPost: text => {
    return AXIOS.put(baseApiURL + 'posts', {text})
  },
  deletePost: id => {
    return AXIOS.delete(baseApiURL + `posts/${id}`)
  }
}