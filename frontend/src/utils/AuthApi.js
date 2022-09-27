class AuthApi {
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

    signup(data) {
        return fetch(this._url + "/signup", {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify(data)
        }).then(this._checkResponse);
    }

    signin(data) {
        return fetch(this._url + "/signin", {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify(data)
        }).then(this._checkResponse);
    }

    checkToken(jwt) {
        return fetch(this._url + "/users/me", {
            method: "GET",
            headers: {...this._headers, Authorization: `Bearer ${jwt}`},
          }).then(this._checkResponse)
    }
}

const authApi = new AuthApi("https:\\api.aglyvin.students.nomorepartiesxyz.ru", {"Content-Type": "application/json", 'Accept': 'application/json'});

export default authApi;