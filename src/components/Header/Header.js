import Logo from '../Logo/Logo';
import Cross from '../../images/Cross.svg';
import { Link } from 'react-router-dom';

const Header = (props) => {
    function openSidebar() {
        const sidebar = document.querySelector('.header__sidebar');
        sidebar.classList.add('header__sidebar_active');
    }

    function closeSidebar() {
        const sidebar = document.querySelector('.header__sidebar');
        sidebar.classList.remove('header__sidebar_active');
    }

    return (
        
        <section className="header">
            <Logo />
            { (() => {
                        if (props.loggedIn) {
                            return (<>
                                        <nav className="header__nav">
                                            <Link to="/movies" className="link">Фильмы</Link>
                                            <Link to="/saved-movies" className="link">Сохраненные фильмы</Link>
                                        </nav>
                                        <Link to="/profile" className="header__account">Аккаунт</Link>
                                        <button className="btn header__btn-menu" onClick={openSidebar}></button>
                                        <div className="header__sidebar">
                                            <img className="header__cross" src={Cross} alt="Закрыть" onClick={closeSidebar}></img>
                                            <nav className="header__sidebar-nav">
                                                <Link to="/" className="link header__sidebar-link">Главная</Link>
                                                <Link to="/movies" className="link header__sidebar-link">Фильмы</Link>
                                                <Link to="/saved-movies" className="link header__sidebar-link">Сохраненные фильмы</Link>
                                            </nav>
                                            <Link to="/profile" className="btn header__sidebar-account">Аккаунт</Link>
                                        </div>
                                    </>)
                        } else {
                            return <div className='header__button-block'>
                                <Link to="/sign-up" className="link header__link">Регистрация</Link>
                                <Link to="/sign-in" className="btn header__btn">Войти</Link>
                            </div>
                        }
                })()}
        </section>
        
    );
};
export default Header;