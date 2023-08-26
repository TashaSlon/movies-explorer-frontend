import {Link} from 'react-router-dom';
import logo from '../../images/logo.svg';

const Logo = () => {
    return (
        <>
            <Link to="/">
                <img src={logo} className="logo" alt="Логотип" />
            </Link>
        </>
        );
};
export default Logo;