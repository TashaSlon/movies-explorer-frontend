import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

const Movies = (props) => {
    const list = [
        {
            image: 'https://api.nomoreparties.co/uploads/thumbnail_552242179_1280x720_66bc43b289.jpeg',
            name: 'Pulp: фильм о жизни, смерти и супермаркетах',
            time: '1ч 30м',
            saved: true,
        },
        {
            image: 'https://api.nomoreparties.co/uploads/thumbnail_Super_Duper_Alice_Cooper_2014_8b1641fbaf.jpeg',
            name: 'Супер-пупер Элис Купер',
            time: '1ч 38м',
            saved: false,
        },
        {
            image: 'https://api.nomoreparties.co/uploads/thumbnail_orig_bc3e53efa8.jpeg',
            name: 'Еще',
            time: '1ч 36м',
            saved: true,
        },
        {
            image: 'https://api.nomoreparties.co/uploads/thumbnail_zagruzhennoe_1_1817cd23a2.jpeg',
            name: 'The National: Приняты за незнакомцев',
            time: '1ч 15м',
            saved: false,
        },
        {
            image: 'https://api.nomoreparties.co/uploads/thumbnail_zagruzhennoe_2_c709860078.jpeg',
            name: 'Панк-певица',
            time: '1ч 21м',
            saved: true,
        }
    ];

    return (
        <>
            <Header loggedIn={props.loggedIn} signOut={props.signOut}/>
            <main>
                <SearchForm 
                cinemaCheckbox = {props.cinemaCheckbox}
                onCheckboxClick={props.onCheckboxClick}/>
                <MoviesCardList list={list} page='movies'/>
                <button className='movies__btn btn'>Ещё</button>
            </main>
            <Footer />
        </>
    );
};
export default Movies;