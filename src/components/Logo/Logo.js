import {Link} from 'react-router-dom';
import logo from '../../images/logo.svg';

const Logo = () => {
    return (
        <div className="logo">
            <Link to="/" className="logo__block">
                <img src={logo} className="logo__image" alt="Логотип" />
            </Link>
        </div>
        );
};
export default Logo;