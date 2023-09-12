import { useEffect, useState } from 'react';

const SearchForm = ({list, showResult, page }) => {
    const params = (page ==='movies')
                    ? {formValue: 'formValue', searchResults: 'searchResults'}
                    : {formValue: 'formValueForSaved', searchResults: 'searchResultsForSaved'};
    const [searchResults, setSearchResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isResult, setIsResult] = useState(false);
    const [formValue, setFormValue] = useState(JSON.parse(localStorage.getItem(params.formValue)));

    useEffect(() => {
        localStorage.setItem(params.formValue, JSON.stringify(formValue));
    }, [formValue]);


    const handleChange = (e) => {
        const {name, value} = e.target;

        setFormValue({
            ...formValue,
            [name]: value
        });
    }

    const handleShortFilms = (e) => {
        const isDisabled = e.target.classList.contains('search__new-radio_disabled');
        const value = isDisabled ? true : false;

        setFormValue({
            keyword: formValue.keyword,
            shortFilms: value
        });
        
        e.target.classList.toggle('search__new-radio_disabled');
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        const error = document.querySelector('.search__error');

        if (!formValue.keyword) {
            error.textContent = "Нужно ввести ключевое слово";
            setIsLoading(false);
            return;
        }
        const { keyword, shortFilms } = formValue;

        const resultsRU = list.filter(item =>
            item.nameRU.toLowerCase().includes(keyword)
          );
        const resultsEN = list.filter(item =>
            item.nameEN.toLowerCase().includes(keyword)
        );
        const resultsAll = resultsRU.concat(resultsEN);
    
        const resultsFilter = resultsAll.filter((item, index) => {
            return resultsAll.indexOf(item) === index
        });

        const results = shortFilms ? resultsFilter.filter((item) => item.duration <= 40) : resultsFilter;
        
        setSearchResults(results);
        setIsResult(true);
        setIsLoading(false);

        localStorage.setItem(params.formValue, JSON.stringify(formValue));
        localStorage.setItem(params.searchResults, JSON.stringify(results));

        showResult();
        error.textContent = "";
    }

    return (
        <section className="search">
            <form className="search__form" onSubmit={handleSubmit}>
                <fieldset className="search__block">
                    <input className="search__input" id="keyword" name="keyword" type="text" placeholder="Фильм" onChange={handleChange} value={formValue.keyword}></input>
                    <div className="error search__error"></div>
                    <button className="btn search__btn" onSubmit={handleSubmit}></button>
                </fieldset>
                <div className="search__short-films">
                    <div className={formValue.shortFilms ? "search__new-radio" : "search__new-radio search__new-radio_disabled"} onClick={handleShortFilms} ></div>
                    <label htmlFor="short-films">
                        <input className="search__input-radio" type="radio" id="short-films" name="short-films" value={formValue.shortFilms} onChange={handleChange} checked />
                        Короткометражки
                    </label>
                </div>
            </form>
        </section>
    );
};
export default SearchForm;