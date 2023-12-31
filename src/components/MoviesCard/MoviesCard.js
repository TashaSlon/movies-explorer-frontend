const MoviesCard = (props) => {
    const {id, image, name, time, saved} = props.movie;
    
    return (
        <li className="movies-card" key={id}>
            <img src={image} className="movies-card__image" alt={name} />
            {saved ? <div className="movies-card__saved"></div> : (props.page === 'saved-movies') ? <button className="btn movies-card__cross"></button> : <button className="btn movies-card__save">Сохранить</button>}
            <div className="movies-card__info">
                <h3 className="movies-card__name">{name}</h3>
                <p className="movies-card__time">{time}</p>
            </div>
        </li>
    );
};
export default MoviesCard;