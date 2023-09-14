import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import { useEffect, useState } from 'react';

const SavedMovies = (props) => {
    const savedMovies = JSON.parse(localStorage.getItem('savedMovies'));
    const [searchResults, setSearchResults] = useState(savedMovies);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
        }, 2000);
    }, []);

    function handleResult(result) {
        setSearchResults(result);
    }

    return (
        <>
            <Header loggedIn={props.loggedIn} signOut={props.signOut}/>
            <main className="saved-movies">
                <SearchForm
                    list={savedMovies}
                    page='saved-movies'
                    handleResult={handleResult}/>
                {loading 
                ? <Preloader />
                : searchResults.length === 0 ? 
                     <div className="movies__zero">Ничего не найдено</div>
                    : <MoviesCardList list={searchResults} page='saved-movies' handleResult={handleResult} />
                }
            </main>
            <Footer />
        </>
    );
};
export default SavedMovies;