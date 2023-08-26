import Title from "../Title/Title";

const AboutProject = () => {
    return (
        <section className="project" id="project">
            <Title name="О проекте" />
            <dl className="project__list">
                <div>
                    <dt className="project__list-title">Дипломный проект включал 5 этапов</dt>
                    <dd className="project__list-text">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</dd>
                </div>
                <div>
                    <dt className="project__list-title">На выполнение диплома ушло 5 недель</dt>
                    <dd className="project__list-text">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</dd>
                </div>
            </dl>
            <table className="project__table">
                <thead>
                    <tr>
                        <th className="project__back-title">1 неделя</th>
                        <th className="project__front-title">4 недели</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="project__text">Back-end</td>
                        <td className="project__text">Front-end</td>
                    </tr>
                </tbody>
            </table>
        </section>
    );
};
export default AboutProject;