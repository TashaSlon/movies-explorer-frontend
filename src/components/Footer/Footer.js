import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="footer">
            <h3 className="footer__name">Учебный проект Яндекс.Практикум х BeatFilm</h3>
            <div className="footer__block">
                <ul className="footer__links">
                    <li><Link to="https://practicum.yandex.ru" className="link" target="_blank">Яндекс.Практикум</Link></li>
                    <li><Link to="https://github.com" className="link" target="_blank">Github</Link></li>
                </ul>
                <p className="footer__year">©2023</p>
            </div>
        </footer>
    );
};
export default Footer;