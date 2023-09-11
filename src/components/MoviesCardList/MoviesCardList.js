import MoviesCard from '../MoviesCard/MoviesCard';

const MoviesCardList = (props) => {
    const list = props.list;

    const getFilmList = films => {
        let content = [];
        for (let i = 0; i < films.length; i++) {
          content.push(<MoviesCard movie={films[i]} page={props.page}/>);
        }
        return content;
    };

    return (
        <ul className={(props.page === 'movies') ? "movies-list" : "movies-list saved-movies__list"}>
            { getFilmList(list) }
        </ul>
    );
};
export default MoviesCardList;