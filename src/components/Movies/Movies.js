import { useEffect, useState } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';

const Movies = (props) => {
    const search = JSON.parse(localStorage.getItem('searchResults'));
    const fullList = JSON.parse(localStorage.getItem('fullList'));
    const [searchResults, setSearchResults] = useState((search.length === 0) ? fullList : search);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
        }, 2000);
    }, []);

    function handleResult() {
        setSearchResults(JSON.parse(localStorage.getItem('searchResults')));
    }

    return (
        <>
            <Header loggedIn={props.loggedIn} signOut={props.signOut}/>
            <main className="movies">
                <SearchForm
                list={fullList}
                page='movies'
                handleResult={handleResult}/>

                {loading 
                ? <Preloader />
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