const MOVIE_URL = 'https://api.nomoreparties.co/beatfilm-movies';

function getJson(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

export const getMovies = () => {
  return fetch(`${MOVIE_URL}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(getJson);
};