import Logo from '../Logo/Logo';
import { Link } from 'react-router-dom';

const Header = (props) => {
    
    return (
        <section className="header">
            <Logo />
            { (() => {
                        if (props.loggedIn) {
                            return <Link to="/sign-in" onClick={props.signOut} className="header__button">Выйти</Link>
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