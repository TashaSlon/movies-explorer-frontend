import { Link } from 'react-router-dom';

const MoviesCard = (props) => {
    console.log(props.movie);
    const savedMovies = JSON.parse(localStorage.getItem('savedMovies'));
    const MOVIE_URL = 'https://api.nomoreparties.co/';
    const id = (props.page === 'saved-movies') ? props.movie.movieId : props.movie.id;
    const name = props.movie.nameRU;
    const image = MOVIE_URL + (props.page === 'saved-movies'? props.movie.image : props.movie.image.url);
    const trailer = props.movie.trailerLink;

    
    const getDuration = (duration) => {
        const hours = Math.floor(duration / 60);
        const minutes = duration % 60;
  
        return `${(hours > 0) ? hours+'ч ' : ''}${minutes}м`;
      };
    const duration = getDuration(props.movie.duration);
    const isSaved = savedMovies.find(item => String(id) === item.movieId);
    const saved = isSaved === undefined ? false : true;

    function handleLike() {
        props.onCardLike(id);
    }

    function handleDislike() {
        props.onCardDislike(props.movie._id);
    }
    
    return (
        <li className="movies-card" key={id}>
            <Link to={trailer} className="movies-card__link" target="_blank">
                <img src={image} className="movies-card__image" alt={name} />
            </Link>
            {(props.page === 'saved-movies')
                 ? <button className="btn movies-card__cross" onClick={handleDislike}></button>
                 : saved ? <div className="movies-card__saved"></div> 
                 : <button className="btn movies-card__save" onClick={handleLike}>Сохранить</button>}
            <div className="movies-card__info">
                <h3 className="movies-card__name">{name}</h3>
                <p className="movies-card__time">{duration}</p>
            </div>
        </li>
    );
};
export default MoviesCard;