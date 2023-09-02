const MoviesCard = (props) => {
    const {image, name, time, saved} = props.movie;
    
    return (
        <article className="movies-card">
            <img src={image} className="movies-card__image" alt={name} />
            {saved ? <div className="movies-card__saved"></div> : (props.page === 'saved-movies') ? <button className="btn btn__card-cross"></button> : <button className="btn btn__card-save">Сохранить</button>}
            <div className="movies-card__info">
                <h3 className="movies-card__name">{name}</h3>
                <p className="movies-card__time">{time}</p>
            </div>
        </article>
    );
};
export default MoviesCard;