const baseUrl = 'https://api.newsprj.students.nomoreparties.space';

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

  saveArticle() {
    return fetch(`${baseUrl}/articles`, {
      method: 'POST',
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
