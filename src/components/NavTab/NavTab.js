import { HashLink as Link } from 'react-router-hash-link';

const NavTab = () => {
    return (
        <nav>
            <ul className="menu">
                <li>
                    <Link to="/#project" className="btn menu__btn">О проекте</Link>
                </li>
                <li>
                    <Link to="/#techs" className="btn menu__btn">Технологии</Link>
                </li>
                <li>
                    <Link to="/#student" className="btn menu__btn">Студент</Link>
                </li>
            </ul>
        </nav>
    );
};
export default NavTab;