import { useEffect, useState } from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';

const MoviesCardList = (props) => {
    const list = props.list;

    const getParams = () => {
        const width = document.documentElement.clientWidth;
        const startParams = (width <= 767) 
                        ? {maxCards: 5, addCards: 2}
                        : (width <= 1279) 
                            ? {maxCards: 8, addCards: 2}
                            : {maxCards: 12, addCards: 3};

        return startParams;
    }
    
    window.addEventListener('resize', function(event) {
        setParams(getParams());
    }, true);

    const [params, setParams] = useState(getParams());
    let cards = list.length < params.maxCards ? list.length : params.maxCards;

    const getFilmList = films => {
        let content = [];

        for (let i = 0; i < cards; i++) {
          content.push(<MoviesCard movie={films[i]} page={props.page} handleResult={props.handleResult}/>);
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