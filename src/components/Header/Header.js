import logo from '../../images/logo.svg';
import { Link } from 'react-router-dom';

const Header = (props) => {
    
    return (
        <section className="header">
            <img src={logo} className="logo" alt="Логотип" />
            { (() => {
                        if (props.loggedIn) {
                            return <Link to="/sign-in" onClick={props.signOut} className="header__button">Выйти</Link>
                        } else {
                            return <div className='header__button-block'>
                                <Link to="/sign-up" className="header__link">Регистрация</Link>
                                <Link to="/sign-in" className="header__button">Войти</Link>
                            </div>
                        }
                })()}
        </section>
    );
};
export default Header;