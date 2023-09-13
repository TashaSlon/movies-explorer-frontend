import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { useState } from 'react';

const SavedMovies = (props) => {
    const savedMovies = JSON.parse(localStorage.getItem('savedMovies'));
    const [searchResults, setSearchResults] = useState(savedMovies);

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
                { searchResults.length === 0 ? 
                     <div className="movies__zero">Ничего не найдено</div>
                    : <MoviesCardList list={searchResults} page='saved-movies' handleResult={handleResult} />
                }
            </main>
            <Footer />
        </>
    );
};
export default SavedMovies;