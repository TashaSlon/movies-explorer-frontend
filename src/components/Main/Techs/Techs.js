const Tech = () => {
    return (
        <section className="techs__back">
            <div className="techs">
                <h2 className="techs__title">Технологии</h2>
                <h3 className="techs__list-title">7 технологий</h3>
                <p className="techs__list-text">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
                <ul className="techs__list">
                    <li className="techs__list-item">HTML</li>
                    <li className="techs__list-item">CSS</li>
                    <li className="techs__list-item">JS</li>
                    <li className="techs__list-item">React</li>
                    <li className="techs__list-item">Git</li>
                    <li className="techs__list-item">Express.js</li>
                    <li className="techs__list-item">mongoDB</li>
                </ul>
            </div>
        </section>
    );
};
export default Tech;