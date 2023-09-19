import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { useState } from 'react';

const SavedMovies = (props) => {
    const savedMovies = JSON.parse(localStorage.getItem('savedMovies'));
    const [searchResults, setSearchResults] = useState(savedMovies);
    console.log(searchResults);

    function handleResult(result) {
        setSearchResults(result);
    }

    function handleResultForLike(id) { 
        const savedMovies = JSON.parse(localStorage.getItem('savedMovies'));
        const resultSave = savedMovies.filter((item) => item._id !== id);
        localStorage.setItem('savedMovies', JSON.stringify(resultSave));
        const result = searchResults.filter((item) => item._id !== id);
        console.log(result);
        setSearchResults(result);
    }

    return (
        <>
            <Header loggedIn={props.loggedIn} signOut={props.signOut}/>
            <main className="saved-movies">
                <SearchForm
                    page='saved-movies'
                    handleResult={handleResult}/>
                {searchResults === null 
                    ? <div></div>
                    : searchResults.length === 0 ? 
                        <div className="movies__zero">Ничего не найдено</div>
                        : <MoviesCardList list={searchResults} page='saved-movies' handleResult={handleResult} params='' cards={searchResults.length} handleResultForLike={handleResultForLike}/>
                }
            </main>
            <Footer />
        </>
    );
};
export default SavedMovies;