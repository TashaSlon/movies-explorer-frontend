const MoviesCard = (props) => {
    const {image, name, time} = props.movie;
    console.log(props);
    return (
        <article className="movies-card">
            <img src={image} className="movies-card__image" alt={name} />
            <div className="movies-card__info">
                <p className="movies-card__name">{name}</p>
                <p className="movies-card__time">{time}</p>
            </div>
        </article>
    );
};
export default MoviesCard;