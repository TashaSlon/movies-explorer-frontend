import { useEffect, useState } from 'react';

const SearchForm = ({list, page, handleResult }) => {
    const formData = JSON.parse(localStorage.getItem('formValue'));
    const startFormValue = (page ==='movies')&&(formData !== null)
                            ? formData
                            : { keyword: '', shortFilms: true };
    
    const [isChecked, setIsChecked] = useState(startFormValue.shortFilms);
    
    const [formValue, setFormValue] = useState(startFormValue);

    useEffect(() => {
        setFormValue({
            keyword: formValue.keyword,
            shortFilms: isChecked
        });
    }, [isChecked]);

    useEffect(() => {
        handleSubmit();
    }, [formValue.shortFilms]);

    const handleChange = (e) => {
        const {value} = e.target;

        setFormValue({
            keyword: value,
            shortFilms: isChecked
        });
    }

    const handleChangeShortFilms = (e) => {
        setIsChecked(!isChecked);
    }

    const handleSubmit = () => {
        
        const error = document.querySelector('.search__error');

        if (!formValue.keyword) {
            error.textContent = "Нужно ввести ключевое слово";
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

        localStorage.setItem('formValue', JSON.stringify(formValue));
        localStorage.setItem('searchResults', JSON.stringify(results));

        handleResult(results);

        error.textContent = "";
    }
    
    return (
        <section className="search">
            <div className="search__form">
                <fieldset className="search__block">
                    <input className="search__input" id="keyword" name="keyword" type="text" placeholder="Фильм" onChange={handleChange} value={formValue.keyword}></input>
                    <div className="error search__error"></div>
                    <button className="btn search__btn" onClick={handleSubmit}></button>
                </fieldset>
                <label htmlFor="short-films" className="search__short-films">
                    <input className="search__input-checkbox" type="checkbox" id="short-films" name="short-films" value={formValue.shortFilms} onChange={handleChangeShortFilms} checked />
                    <span className={`search__new-radio ${isChecked ? "" : "search__new-radio_disabled"}`} aria-hidden="true"/>
                    Короткометражки
                </label>
            </div>
        </section>
    );
};
export default SearchForm;