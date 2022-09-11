class Api {
  constructor(url, headers) {
    this._url = url;
    this._headers = headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getUserInfo() {
    return fetch(this._url + "/users/me", {
      headers: this._headers,
    }).then(this._checkResponse);
  }

  setUserInfo({ name, about }) {
    return fetch(this._url + "/users/me", {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then(this._checkResponse);
  }

  setAvatar(avatarUrl) {
    console.log(avatarUrl)
    return fetch(this._url + `/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatarUrl,
      }),
    }).then(this._checkResponse);
  }

  addCard(cardInfo) {
    return fetch(this._url + "/cards", {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(cardInfo),
    }).then(this._checkResponse);
  }

  deleteCard(id) {
    return fetch(this._url + "/cards/" + id, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  likeCard(id) {
    return fetch(this._url + `/cards/${id}/likes`, {
      method: "PUT",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  dislikeCard(id) {
    return fetch(this._url + `/cards/${id}/likes`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  changeLikeCardStatus(id, isLiked) {
    let resp = null;
    if (isLiked) {
      resp = this.dislikeCard(id);
    } else {
      resp = this.likeCard(id);
    }
    return resp;
  }

  getCards() {
    return fetch(this._url + `/cards`, {
      headers: this._headers,
    }).then(this._checkResponse);
  }
}

const api = new Api("https://mesto.nomoreparties.co/v1/cohort-43", {
  authorization: "2f9c82fe-9e77-4bc3-9e57-b3177cfe4c33",
  "Content-Type": "application/json",
});

export default api;
