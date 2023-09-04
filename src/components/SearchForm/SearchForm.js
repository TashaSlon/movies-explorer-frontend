const SearchForm = ({cinemaCheckbox, onCheckboxClick}) => {
    function handleClick() {
        onCheckboxClick();
    }

    return (
        <section className="search">
            <form className="search__form">
                <fieldset className="search__block">
                    <input className="search__input" placeholder="Фильм"></input>
                    <button className="btn search__btn"></button>
                </fieldset>
                <div className="search__short-films" onClick={handleClick}>
                    <div className={cinemaCheckbox ? "search__new-radio" : "search__new-radio search__new-radio_disabled"}></div>
                    <label htmlFor="short-films">
                        <input className="search__input-radio" type="radio" id="short-films" name="short-films" value="short-films" onChange={handleClick} checked />
                        Короткометражки
                    </label>
                </div>
            </form>
        </section>
    );
};
export default SearchForm;