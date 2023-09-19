import { errors } from './errors.js';

class Api {
    constructor(baseUrl) {
      this._baseUrl = baseUrl;
    }
  
    _getHeaders() {
      return {
        "Accept": "application/json",
        "Content-Type": "application/json",
      };
    }
  
    _getJson(res) {
      let message = '';
      if (res.ok) {
        return res.json();
      }
      message = errors(res.status);
      return Promise.reject(message);
    }
  
    getUserInfo() {
      return fetch(`${this._baseUrl}/users/me`, {
        method: 'GET',
        headers: this._getHeaders(),
        credentials: 'include' })
      .then(this._getJson);
    }
  
    setUserInfo(name, email) {
      return fetch(`${this._baseUrl}/users/me`, {
        method: 'PATCH',
        headers: this._getHeaders(),
        credentials: 'include',
        body: JSON.stringify({
          name: name,
          email: email
        })
      })
      .then(this._getJson);
    }

    logout() {
      return fetch(`${this._baseUrl}/signout`, {
        headers: this._getHeaders(),
        credentials: 'include',
        method: 'GET'
      })
      .then(this._getJson);
    };
  
    getMovies() {
      return fetch(`${this._baseUrl}/movies`, {
        method: 'GET',
        headers: this._getHeaders(),
        credentials: 'include' })
      .then(this._getJson);
    }

    likeMovie(props) {
      const bodyReq = {
        country: props.country,
        director: props.director,
        duration: props.duration,
        year: props.year,
        description: props.description,
        image: props.image,
        trailerLink: props.trailerLink,
        nameRU: props.nameRU,
        nameEN: props.nameEN,
        thumbnail: props.thumbnail,
        movieId: String(props.movieId),
      };
      return fetch(`${this._baseUrl}/movies`, {
        method: 'POST',
        headers: this._getHeaders(),
        credentials: 'include',
        body: JSON.stringify(bodyReq)
      })
      .then(this._getJson);
    }

    dislikeMovie(id) {
      return fetch(`${this._baseUrl}/movies/${id}`, {
        method: 'DELETE',
        headers: this._getHeaders(),
        credentials: 'include'
      })
      .then(this._getJson);
    }
}
  
  const BASE_URL = process.env.NODE_ENV === 'production' ? 'https://api.plyusnina.nomoreparties.sbs' : 'http://localhost:3000';
  
  export const api = new Api(BASE_URL);
  export {BASE_URL};
  