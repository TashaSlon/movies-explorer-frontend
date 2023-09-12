import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { api } from '../../utils/MainApi';
import { useState } from 'react';

const SavedMovies = (props) => {
    const [isResult, setIsResult] = useState(false);
    const [savedMovies, setSavedMovies] = useState(JSON.parse(localStorage.getItem('savedMovies')));
    const list = JSON.parse(localStorage.getItem('searchResultsForSaved'));
    localStorage.setItem('formValueForSaved', JSON.stringify({keyword: '', shortFillms: true }));

    function handleCardDisLike(id) {
        api.dislikeMovie(id)
        .then((movie) => {
            const result = savedMovies.filter((item) => item._id !== movie._id);
            localStorage.setItem('savedMovies', JSON.stringify(result));
            setSavedMovies(result);
        })
        .catch(err => console.log(`Ошибка.....: ${err}`))
    };

    function showResult() {
        setIsResult(!isResult);
    }

    return (
        <>
            <Header loggedIn={props.loggedIn} signOut={props.signOut}/>
            <main className="saved-movies">
                <SearchForm
                    list={savedMovies}
                    showResult={showResult}
                    page='saved-movies'/>
                { list.length === 0 ? 
                     <div className="movies__zero">Ничего не найдено</div>
                    : <MoviesCardList list={savedMovies} page='saved-movies' onCardDislike={handleCardDisLike} />
                }
            </main>
            <Footer />
        </>
    );
};
export default SavedMovies;