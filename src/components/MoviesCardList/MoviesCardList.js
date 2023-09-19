import MoviesCard from '../MoviesCard/MoviesCard';

const MoviesCardList = ({ list, page, handleResult, params, getAdditionalCards, cards, handleResultForLike }) => {
    const getFilmList = films => {
        let content = [];

        console.log(cards);
        for (let i = 0; i < cards; i++) {
          content.push(<MoviesCard movie={films[i]} page={page} handleResult={handleResult} handleResultForLike={handleResultForLike}/>);
        }
        return content;
    };

    return (
        <>
            <ul className={(page === 'movies') ? "movies-list" : "movies-list saved-movies__list"}>
                { getFilmList(list) }
            </ul>
            { (list.length > params.maxCards) && (page === 'movies') ? <button className='movies__btn btn' onClick={getAdditionalCards}>Ещё</button> : ''}
        </>
    );
};
export default MoviesCardList;