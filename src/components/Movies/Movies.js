import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import word from '../../images/33_word.jpg';
import years from '../../images/100years.jpg';
import benkcy from '../../images/Benkcy.jpg';
import baskia from '../../images/Baskia.jpg';
import run from '../../images/Run.jpg';


const Movies = (props) => {
    console.log(word);

    const list = [
        {
            image: {word},
            name: '33 слова о дизайне',
            time: '1ч 17м',
        },
        {
            image: {years},
            name: 'Киноальманах «100 лет дизайна»',
            time: '1ч 17м',
        },
        {
            image: {benkcy},
            name: 'В погоне за Бенкси',
            time: '1ч 17м',
        },
        {
            image: {baskia},
            name: 'Баския: Взрыв реальности',
            time: '1ч 17м',
        },
        {
            image: {run},
            name: 'Бег это свобода',
            time: '1ч 17м',
        }
    ];

    return (
        <>
            <Header loggedIn={props.loggedIn} signOut={props.signOut}/>
            <main className="content">
                <SearchForm />
                <MoviesCardList list={list}/>
                <button className='movies__btn'>Ещё</button>
            </main>
            <Footer />
        </>
    );
};
export default Movies;