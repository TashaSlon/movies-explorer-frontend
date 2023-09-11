import { Link } from 'react-router-dom';

const NotFound = () => {

    return (
        <section className="not-found">
            <h1 className="not-found__title">404</h1>
            <p className="not-found__subtitle">Страница не найдена</p>
            <Link to="/" className="link not-found__link">Назад</Link>
        </section>
    );
};
export default NotFound;