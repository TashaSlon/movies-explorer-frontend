const MoviesCard = (props) => {
    const {image, name, time} = props.movie;
    
    return (
        <article className="movies-card">
            <img src={image} className="movies-card__image" alt={name} />
            <div className="movies-card__info">
                <h3 className="movies-card__name">{name}</h3>
                <p className="movies-card__time">{time}</p>
            </div>
        </article>
    );
};
export default MoviesCard;