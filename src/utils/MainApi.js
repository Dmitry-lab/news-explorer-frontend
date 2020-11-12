const baseUrl = 'https://api.newsprj.students.nomoreparties.space';

class MainApi {
  constructor(options) {
    this._url = options.baseUrl;
    this._headers = { 'Content-Type': 'application/json' };
  }

  register(name, email, password) {
    return fetch(`${this._url}/signup`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({ name, email, password })
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
