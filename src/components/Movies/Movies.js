import { useState, useEffect } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';

const Movies = (props) => {
    const [searchResults, setSearchResults] = useState(JSON.parse(localStorage.getItem('searchResults')));
    const [loading, setLoading] = useState(false);

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
            handleResult(searchResults);
        }, 500);
    });

    let cardsCount = params.maxCards;
    if (searchResults !== null) {
        cardsCount = ((searchResults.length < params.maxCards)||(props.page === 'saved-movies')) 
                    ? searchResults.length 
                    : params.maxCards;
    };

    const getAdditionalCards = () => {
        cardsCount += params.addCards;
        setParams({maxCards: params.maxCards + params.addCards, addCards: params.addCards}); 
    };

    function handleResult() {
        setParams(getParams());
        const content = JSON.parse(localStorage.getItem('searchResults')); 
        setSearchResults(content);
    }

    function handleResultForLike(id) {
        const savedMovies = JSON.parse(localStorage.getItem('savedMovies'));
        const result = savedMovies.filter((item) => item._id !== id);
        localStorage.setItem('savedMovies', JSON.stringify(result));
        const content = JSON.parse(localStorage.getItem('searchResults')); 
        setSearchResults(content);
    }

    return (
        <>
            <Header loggedIn={props.loggedIn} signOut={props.signOut}/>
            <main className="movies">
                <SearchForm
                setLoading={setLoading}
                page='movies'
                handleResult={handleResult}/>

                {loading 
                ? <Preloader />
                : searchResults === null 
                    ? <div></div>
                    : searchResults.length === 0 ? 
                        <div className="movies__zero">Ничего не найдено</div>
                        : <MoviesCardList list={searchResults} page='movies' handleResult={handleResult} params={params} getAdditionalCards={getAdditionalCards} cards={cardsCount} handleResultForLike={handleResultForLike}/>
                }
            </main>
            <Footer />
        </>
    );
};
export default Movies;