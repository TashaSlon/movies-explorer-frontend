import { useEffect, useState } from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';

const MoviesCardList = (props) => {
    const list = (props.page === 'movies') ? props.list : JSON.parse(localStorage.getItem('savedMovies'));
    console.log(list);
    const width = document.documentElement.clientWidth;
    const startParams = (width < 768) 
                        ? {maxCards: 5, addCards: 2}
                        : (width < 1280) 
                            ? {maxCards: 8, addCards: 2}
                            : {maxCards: 12, addCards: 3};

    const [params, setParams] = useState(startParams);
    
    let cards = list.length < params.maxCards ? list.length : params.maxCards;

    useEffect(() => {
        setParams(startParams);
    }, [list]);

    const getFilmList = films => {
        let content = [];

        for (let i = 0; i < cards; i++) {
          content.push(<MoviesCard movie={films[i]} page={props.page} onCardLike={props.onCardLike} onCardDislike={props.onCardDislike}/>);
        }
        return content;
    };

    const getAdditionalCards = () => {
        cards += params.addCards;
        setParams({maxCards: params.maxCards + params.addCards, addCards: params.addCards}); 
    };

    return (
        <>
            <ul className={(props.page === 'movies') ? "movies-list" : "movies-list saved-movies__list"}>
                { getFilmList(list) }
            </ul>
            { list.length > params.maxCards ? <button className='movies__btn btn' onClick={getAdditionalCards}>Ещё</button> : ''}
        </>
    );
};
export default MoviesCardList;