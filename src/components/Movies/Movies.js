import { useState } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';

const Movies = (props) => {
    const [searchResults, setSearchResults] = useState(JSON.parse(localStorage.getItem('searchResults')));
    const [loading, setLoading] = useState(false);

    function handleResult(results) {
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
                        : <MoviesCardList list={searchResults} page='movies' handleResult={handleResult}/>
                }
            </main>
            <Footer />
        </>
    );
};
export default Movies;