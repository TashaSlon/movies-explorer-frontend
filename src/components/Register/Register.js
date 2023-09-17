import React, {useState,  useCallback} from 'react';
import {Link} from 'react-router-dom';
import isEmail from 'validator/lib/isEmail';
import Logo from '../Logo/Logo';

const Register = (props) => {
    const [formValue, setFormValue] = useState({
        name: '',
        email: '',
        password: ''
    });

    const [isValid, setIsValid] = useState(false);

    const handleChange = (e) => {
        const field = e.target;
        const {name, value, validationMessage} = field;
        const errorPlace = field.nextSibling;
        let status = true;
        
        errorPlace.textContent = validationMessage;

        setFormValue({
            ...formValue,
            [name]: value
            });
        
        if (field.type === 'email') {
            status = isEmail(value);
            if (!status) {
                errorPlace.textContent = "Похоже email указан неверно";
                field.classList.add('auth__input-invalid');
            } else {
                field.classList.remove('auth__input-invalid');
            };
        } else {
            status = field.checkValidity();
        }
            
        setIsValid(status);
    }

    const resetForm = useCallback(
        (newValues = {}, newErrors = {}, newIsValid = false) => {
            setFormValue(newValues);
            setIsValid(newIsValid);
        },
        [setFormValue, setIsValid]
      );

    const handleSubmit = (e) => {
        e.preventDefault();

        const { name, password, email } = formValue;
            props.onRegister(name, password, email);
        
        resetForm();
    }

    return (
            <section className="auth">
                <header className="auth__header">
                    <Logo />
                    <h1 className="auth__title">Добро пожаловать!</h1>
                </header>
                <form onSubmit={handleSubmit} className="auth__form" noValidate>
                    <div className="auth__inputs">
                        <label className="auth__label" htmlFor="name">
                            Имя
                            <input className="auth__input" id="name" name="name" type="text" value={formValue.name} onChange={handleChange} placeholder='Имя' required minLength="2" maxLength="30"/>
                            <span className="auth__error"></span>
                        </label>
                        <label className="auth__label" htmlFor="email">
                            E-mail
                            <input className="auth__input" id="email" name="email" type="email" value={formValue.email} onChange={handleChange} placeholder='E-mail' required />
                            <span className="auth__error"></span>
                        </label>
                        <label className="auth__label" htmlFor="password">
                            Пароль
                            <input className="auth__input" id="password" name="password" type="password" value={formValue.password} onChange={handleChange} placeholder='Пароль' required minLength="6" />
                            <span className="auth__error"></span>
                        </label>
                    </div>
                    <div className="auth__button-container">
                        <button type="submit" onSubmit={handleSubmit} className={isValid ? 'btn auth__btn' : 'btn auth__btn auth__btn-disabled'} disabled={(isValid) ? false : true }>Зарегистрироваться</button>
                        <div className="auth__signin">
                            <p className="auth__signin-text">Уже зарегистрированы?</p>
                            <Link to="/sign-in" className="link auth__link">Войти</Link>
                        </div>
                    </div>
                </form>
            </section>
    );
};
export default Register;