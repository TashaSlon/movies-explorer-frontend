import { useEffect, useState } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import { api } from '../../utils/MainApi';

const Movies = (props) => {
    const [isResult, setIsResult] = useState(false);

    const [savedMovies, setSavedMovies] = useState(JSON.parse(localStorage.getItem('savedMovies')));
    const fullList = JSON.parse(localStorage.getItem('fullList'));
    const list = JSON.parse(localStorage.getItem('searchResults'));

    function handleCardLike(id) {

        const resultFilter = fullList.find((item) => {
            return item.id === id
        });

        api.likeMovie(resultFilter)
        .then((newCard) => {
            const savedMovies = JSON.parse(localStorage.getItem('savedMovies'));
            savedMovies.push(newCard);
            setSavedMovies(savedMovies);
            localStorage.setItem('savedMovies', JSON.stringify(savedMovies));
        })
        .catch(err => console.log(`Ошибка.....: ${err}`))
    }

    function showResult() {
        setIsResult(!isResult);
    }

    return (
        <>
            <Header loggedIn={props.loggedIn} signOut={props.signOut}/>
            <main className="movies">
                <SearchForm
                list={fullList}
                showResult={showResult}
                page='movies'/>
                { list.length === 0 ? 
                     <div className="movies__zero">Ничего не найдено</div>
                     : <MoviesCardList list={list} page='movies' onCardLike={handleCardLike}/>
                }
            </main>
            <Footer />
        </>
    );
};
export default Movies;