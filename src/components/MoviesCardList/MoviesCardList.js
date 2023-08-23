import MoviesCard from '../MoviesCard/MoviesCard';

const MoviesCardList = (props) => {
    const list = props.list;

    const getFilmList = films => {
        let content = [];
        for (let i = 0; i < films.length; i++) {
          content.push(<MoviesCard movie={films[i]}/>);
        }
        return content;
    };

    return (
        <section className="movies-list">
            { getFilmList(list) }
        </section>
    );
};
export default MoviesCardList;