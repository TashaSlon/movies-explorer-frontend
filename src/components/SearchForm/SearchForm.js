import { useEffect, useState } from 'react';
import { getMovies } from '../../utils/MoviesApi';

const SearchForm = ({setLoading, page, handleResult }) => {
    const formData = JSON.parse(localStorage.getItem('formValue'));
    console.log(formData);
    const startFormValue = ((page ==='movies')&&(formData !== null))
                            ? formData
                            : { keyword: '', shortFilms: false };
    
    const [isChecked, setIsChecked] = useState(startFormValue.shortFilms);
    const [formValue, setFormValue] = useState(startFormValue);
    const [list, setList] = useState((page ==='movies') ? JSON.parse(localStorage.getItem('searchResults')) : JSON.parse(localStorage.getItem('savedMovies')));

    console.log(list);
    useEffect(() => {
        setFormValue({
            keyword: formValue.keyword,
            shortFilms: isChecked
        });
    }, [isChecked]);

    useEffect(() => {
        const results = filterData(list, formValue.keyword, formValue.shortFilms);
        console.log(results);
        handleResult(results);
    }, [formValue.shortFilms]);

    useEffect(() => {
        const error = document.querySelector('.search__error');
        console.log(formValue);
        console.log(list);
        const { keyword, shortFilms } = formValue;

        const results = filterData(list, keyword, shortFilms);
        console.log(results);

        handleResult(results);

        error.textContent = "";

    }, [list]);


    function getFullFilmList() {
        setLoading(true);
        let fullList =[];
        getMovies()
        .then(movies => {
            movies.forEach(movie => {
                fullList.push(movie);
            });
            localStorage.setItem('fullList', JSON.stringify(fullList));
            setList(fullList);
        })
        .catch(err => console.log(`Ошибка.....: ${err}`))
        .finally(function () {
            setLoading(false);
          });
    }

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

    const filterData = (list, keyword, shortFilms) => {
        if (list === null) {
            return null;
        }
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
        (page ==='movies') ? localStorage.setItem('searchResults', JSON.stringify(results)) : console.log('');
        return results;
    }

    const handleSubmit = () => {
        (page ==='movies') ? localStorage.setItem('formValue', JSON.stringify(formValue)) : console.log('');
        const fullList = JSON.parse(localStorage.getItem('fullList'));
        const error = document.querySelector('.search__error');
        const { keyword } = formValue;

        if ((!keyword)&&(fullList !== null)) {
            error.textContent = "Нужно ввести ключевое слово";
            return;
        }
        
        if (page ==='movies') {
            if (fullList === null) {
                getFullFilmList();
            } else { 
                setList(fullList);
            }
         } else { setList(JSON.parse(localStorage.getItem('savedMovies')))};
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
                    <input className="search__input-checkbox" type="checkbox" id="short-films" name="short-films" value={formValue.shortFilms} onChange={handleChangeShortFilms} onClick={handleSubmit} checked />
                    <span className={`search__new-radio ${isChecked ? "" : "search__new-radio_disabled"}`} aria-hidden="true"/>
                    Короткометражки
                </label>
            </div>
        </section>
    );
};
export default SearchForm;