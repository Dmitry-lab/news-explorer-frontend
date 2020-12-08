const baseUrl = 'https://api.newsprj.students.nomoreparties.space';
//const baseUrl = 'http://localhost:4000';

class MainApi {
  constructor(options) {
    this._url = options.baseUrl;
  }

  register(name, email, password) {
    return fetch(`${baseUrl}/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    })
      .then((res) => {
        if (res.ok)
          return res.json();
        else
          return Promise.reject(res.status)
      })
  }

  authorize(email, password) {
    return fetch(`${baseUrl}/signin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })
      .then((res) => {
        if (res.ok)
          return res.json();
        else
          return Promise.reject(res.status)
      })
  }

  getUserInfo() {
    return fetch(`${baseUrl}/users/me`, {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}`}
    })
      .then((res) => {
        if (res.ok)
          return res.json();
        else
          return Promise.reject(res.status)
      })
  }

  saveArticle(atributes) {
    return fetch(`${baseUrl}/articles`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(atributes)
    })
    .then((res) => {
      if (res.ok)
        return res.json();
      else
        return Promise.reject(res.status)
    })
  }

  getArticles() {
    return fetch(`${baseUrl}/articles`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then((res) => {
      if (res.ok)
        return res.json();
      else
        if (res.status === 404)
          return Promise.resolve({ data: [] })
        else
          return Promise.reject(res.status)

    })
  }

  deleteArticle(id) {
    return fetch(`${baseUrl}/articles/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}`}
    })
      .then((res) => {
        if (res.ok)
          return res.json();
        else
          return Promise.reject(res.status)
      })
  }
}

const currentMainApi = new MainApi({ baseUrl });

export default currentMainApi;
