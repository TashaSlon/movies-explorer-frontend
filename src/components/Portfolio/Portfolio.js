import { Link } from 'react-router-dom';

const Portfolio = () => {
    return (
        <section className="portfolio">
            <h2 className="portfolio__title">Портфолио</h2>
            <ul className="portfolio__list">
                <li className="portfolio__list-item portfolio__divider">
                    <Link to="https://tashaslon.github.io/russian-travel" className="portfolio__link" target="_blank">
                        <div className='portfolio__text'>Статичный сайт</div>
                    </Link>
                </li>
                <li className="portfolio__list-item portfolio__divider">
                    <Link to="https://tashaslon.github.io/mesto-react" className="portfolio__link" target="_blank">
                        <div className='portfolio__text'>Адаптивный сайт</div>
                    </Link>
                </li>
                <li className="portfolio__list-item">
                    <Link to="/movies" className="portfolio__link" target="_blank">
                        <div className='portfolio__text'>Одностраничное приложение</div>
                    </Link>
                </li>
            </ul>
        </section>
    );
};
export default Portfolio;