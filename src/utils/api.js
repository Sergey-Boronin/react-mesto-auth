class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _getResponseData(response) {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(new Error(`Ошибка: ${response.status}`));
  }

  getUserData() {
    return fetch(`${this._baseUrl}users/me`, {
      headers: this._headers,
    }).then(this._getResponseData);
  }

  updateUserData(info) {
    return fetch(`${this._baseUrl}users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: info.name,
        about: info.about,
      }),
    }).then(this._getResponseData);
  }

  updateUserAvatar(data) {
    return fetch(`${this._baseUrl}users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    }).then(this._getResponseData);
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}cards`, {
      headers: this._headers,
    }).then(this._getResponseData);
  }

  addNewCard(data) {
    return fetch(`${this._baseUrl}cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then(this._getResponseData);
  }

  removeCard(id) {
    return fetch(`${this._baseUrl}cards/${id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._getResponseData);
  }

  _like(id) {
    return fetch(`${this._baseUrl}cards/likes/${id}`, {
      method: "PUT",
      headers: this._headers,
    }).then(this._getResponseData);
  }

  _unlike(id) {
    return fetch(`${this._baseUrl}cards/likes/${id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._getResponseData);
  }

  changeLikeStatus(id, isLiked) {
    if (isLiked) {
      return this._like(id);
    } else {
      return this._unlike(id);
    }
  }
}

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-19/",
  headers: {
    authorization: "6bac334c-d144-4b45-9ca7-72887d27cd10",
    "Content-Type": "application/json",
  },
});

export default api;
