import { useEffect, useState } from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';

const MoviesCardList = (props) => {
    const list = props.list;

    const getParams = () => {
        const width = document.documentElement.clientWidth;
        const startParams = (width <= 649) 
                        ? {maxCards: 5, addCards: 2}
                        : (width <= 1137) 
                            ? {maxCards: 8, addCards: 2}
                            : (width > 1137) 
                                ? {maxCards: 12, addCards: 3}
                                : {maxCards: 12, addCards: 3};

        return startParams;
    }

    const [params, setParams] = useState(getParams());

    let timeout;

    window.addEventListener('resize', () => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            setParams(getParams());
            
        }, 500);
    });

    useEffect(() => {
        props.handleResult(list);
    }, [params]);
    

    let cards = (list.length < params.maxCards)||(props.page === 'saved-movies') ? list.length : params.maxCards;

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
            { (list.length > params.maxCards) && (props.page === 'movies') ? <button className='movies__btn btn' onClick={getAdditionalCards}>Ещё</button> : ''}
        </>
    );
};
export default MoviesCardList;