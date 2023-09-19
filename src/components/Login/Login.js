import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import Logo from '../Logo/Logo';
import { handleChange } from '../../utils/validation';

const Login = (props) => {
    const [formValue, setFormValue] = useState({
        email: '',
        password: ''
    });
    const [isValid, setIsValid] = useState(false);

    useEffect(() => {
        if ((formValue.email === '')||(formValue.password === '')) {
            setIsValid(false);
        }
    }, [formValue, isValid]);

    const handleValid = (e) => {
        const field = e.target;
        const errorPlace = field.nextSibling;
        errorPlace.textContent = handleChange(field, setFormValue, setIsValid, formValue);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!formValue.email || !formValue.password) {
            return;
        }
        const { password, email } = formValue;
        props.handleLogin(password, email);
        
    }

    return (
            <section className="auth">
                <header className="auth__header">
                    <Logo />
                    <h1 className="auth__title">Рады видеть!</h1>
                </header>
                <form onSubmit={handleSubmit} className="auth__form" noValidate>
                    <div className="auth__inputs">
                        <label className="auth__label" htmlFor="email">
                            E-mail
                            <input className="auth__input" id="email" name="email" type="email" value={formValue.email} onChange={handleValid} placeholder='E-mail' required/>
                            <span className="auth__error"></span>
                        </label>
                        <label className="auth__label" htmlFor="password">
                            Пароль
                            <input className="auth__input" id="password" name="password" type="password" value={formValue.password} onChange={handleValid} placeholder='Пароль' required minLength="6"/>
                            <span className="auth__error"></span>
                        </label>
                    </div>
                    <div className="auth__button-container auth__button-container-signin">
                        <button type="submit" onSubmit={handleSubmit} className={isValid ? 'btn auth__btn' : 'btn auth__btn auth__btn-disabled'} disabled={(isValid) ? false : true }>Войти</button>
                        <div className="auth__signin">
                            <p className="auth__signin-text">Ещё не зарегистрированы?</p>
                            <Link to="/sign-up" className="link auth__link">Регистрация</Link>
                        </div>
                    </div>
                </form>
            </section>
    );
};
export default Login;