import photo from '../../../images/photo.jpg';
import { Link } from 'react-router-dom';


const AboutMe = () => {
    return (
        <section className="about-me">
            <h2 className="about-me__title">Студент</h2>
            <div className="about-me__block">
                <div className="about-me__info-block">
                    <div>
                        <h3 className="about-me__name">Наталья</h3>
                        <p className="about-me__info">Фронтенд-разработчик, 36 лет</p>
                        <p className="about-me__text">
                            Я живу в городе Пермь. Замужем, есть сын. С 2012 года работала в IT как менеджер и аналитик.
                            С 2022 года стала профессионально заниматься фронтендом
                        </p>
                    </div>
                    <Link to="https://github.com/TashaSlon" className="about-me__link">GitHub</Link>
                </div>
                <img src={photo} className="about-me__photo" alt="Фото. Наталья Плюснина" />
            </div>
        </section>
    );
};
export default AboutMe;