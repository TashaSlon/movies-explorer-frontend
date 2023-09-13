import { Link } from 'react-router-dom';
import { api } from '../../utils/MainApi';

const MoviesCard = (props) => {
    const {country,
        director,
        duration,
        year,
        description,
        trailerLink,
        nameRU,
        nameEN} = props.movie;
    const savedMovies = JSON.parse(localStorage.getItem('savedMovies'));
    const MOVIE_URL = 'https://api.nomoreparties.co/';
    const id = (props.page === 'saved-movies') ? props.movie.movieId : props.movie.id;
    const image = (props.page === 'saved-movies')? props.movie.image : props.movie.image.url;
    const imageURL = MOVIE_URL + image;
    
    const getDuration = (duration) => {
        const hours = Math.floor(duration / 60);
        const minutes = duration % 60;
  
        return `${(hours > 0) ? hours+'ч ' : ''}${minutes}м`;
      };
    const durationString = getDuration(duration);
    const isSaved = savedMovies.find(item => String(id) === item.movieId);
    const saved = isSaved === undefined ? false : true;

    function handleCardLike() {
        const movie = {
            country,
            director,
            duration,
            year,
            description,
            image: image,
            trailerLink,
            nameRU,
            nameEN,
            movieId: id,
        };
        
        api.likeMovie(movie)
        .then((newCard) => {
            savedMovies.push(newCard);
            localStorage.setItem('savedMovies', JSON.stringify(savedMovies));
            props.handleResult();

        })
        .catch(err => console.log(`Ошибка.....: ${err}`))
    }

    function handleCardDisLike() {
        const film = savedMovies.find((item) => item.movieId === String(id));
        api.dislikeMovie(film._id)
        .then((movie) => {
            const result = savedMovies.filter((item) => item._id !== movie._id);
            localStorage.setItem('savedMovies', JSON.stringify(result));
            console.log(savedMovies);
            console.log(JSON.parse(localStorage.getItem('savedMovies')));
            props.handleResult(result);
        })
        .catch(err => console.log(`Ошибка.....: ${err}`))
    };
    
    return (
        <li className="movies-card" key={id}>
            <Link to={trailerLink} className="movies-card__link" target="_blank">
                <img src={imageURL} className="movies-card__image" alt={nameRU} />
            </Link>
            {(props.page === 'saved-movies')
                 ? <button className="btn movies-card__cross" onClick={handleCardDisLike}></button>
                 : saved ? <div className="movies-card__saved" onClick={handleCardDisLike}></div> 
                 : <button className="btn movies-card__save" onClick={handleCardLike}>Сохранить</button>}
            <div className="movies-card__info">
                <h3 className="movies-card__name">{nameRU}</h3>
                <p className="movies-card__time">{durationString}</p>
            </div>
        </li>
    );
};
export default MoviesCard;