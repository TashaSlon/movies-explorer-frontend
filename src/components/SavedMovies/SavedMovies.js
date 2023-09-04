import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

const SavedMovies = (props) => {

    const list = [
        {
            id: 1,
            image: 'https://api.nomoreparties.co/uploads/thumbnail_552242179_1280x720_66bc43b289.jpeg',
            name: 'Pulp: фильм о жизни, смерти и супермаркетах',
            time: '1ч 30м',
        },
        {
            id: 2,
            image: 'https://api.nomoreparties.co/uploads/thumbnail_orig_bc3e53efa8.jpeg',
            name: 'Еще',
            time: '1ч 36м',
        },
        {
            id: 3,
            image: 'https://api.nomoreparties.co/uploads/thumbnail_zagruzhennoe_2_c709860078.jpeg',
            name: 'Панк-певица',
            time: '1ч 21м',
        }
    ];

    return (
        <>
            <Header loggedIn={props.loggedIn} signOut={props.signOut}/>
            <main>
                <SearchForm cinemaCheckbox = {props.cinemaCheckbox}
                onCheckboxClick={props.onCheckboxClick}/>
                <MoviesCardList list={list} page='saved-movies'/>
            </main>
            <Footer />
        </>
    );
};
export default SavedMovies;