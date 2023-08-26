import { HashLink as Link } from 'react-router-hash-link';

const NavTab = () => {
    return (
        <nav>
            <ul className="menu">
                <li>
                    <Link to="/#project" className="btn btn__menu">О проекте</Link>
                </li>
                <li>
                    <Link to="/#techs" className="btn btn__menu">Технологии</Link>
                </li>
                <li>
                    <Link to="/#student" className="btn btn__menu">Студент</Link>
                </li>
            </ul>
        </nav>
    );
};
export default NavTab;