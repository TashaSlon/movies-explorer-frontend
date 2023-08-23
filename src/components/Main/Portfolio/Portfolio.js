import arrow from '../../../images/arrow.svg';

const Portfolio = () => {
    return (
        <section className="portfolio">
            <h2 className="portfolio__title">Портфолио</h2>
            <ul className="portfolio__list">
                <li className="portfolio__list-item portfolio__divider">
                    <div>Статичный сайт</div>
                    <img src={arrow} className="portfolio__arrow" alt="Стрелка" />
                </li>
                <li className="portfolio__list-item portfolio__divider">
                    <div>Адаптивный сайт</div>
                    <img src={arrow} className="portfolio__arrow" alt="Стрелка" />
                </li>
                <li className="portfolio__list-item">
                    <div>Одностраничное приложение</div>
                    <img src={arrow} className="portfolio__arrow" alt="Стрелка" />
                </li>
            </ul>
        </section>
    );
};
export default Portfolio;