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
                                        <Link to="/profile" className="btn btn__account">Аккаунт</Link>
                                        <button className="btn btn__header-menu" onClick={openSidebar}></button>
                                        <div className="header__sidebar">
                                            <img className="header__cross" src={Cross} alt="Закрыть" onClick={closeSidebar}></img>
                                            <nav className="header__sidebar-nav">
                                                <Link to="/" className="link link__sidebar">Главная</Link>
                                                <Link to="/movies" className="link link__sidebar">Фильмы</Link>
                                                <Link to="/saved-movies" className="link link__sidebar">Сохраненные фильмы</Link>
                                            </nav>
                                            <Link to="/profile" className="btn btn__sidebar-account">Аккаунт</Link>
                                        </div>
                                    </>)
                        } else {
                            return <div className='header__button-block'>
                                <Link to="/sign-up" className="link link__header">Регистрация</Link>
                                <Link to="/sign-in" className="btn btn__header">Войти</Link>
                            </div>
                        }
                })()}
        </section>
        
    );
};
export default Header;