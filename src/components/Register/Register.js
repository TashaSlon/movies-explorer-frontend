import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import logo from '../../images/logo.svg';

const Register = (props) => {
    const [formValue, setFormValue] = useState({
        email: '',
        password: ''
    })

    const handleChange = (e) => {
    const {name, value} = e.target;

    setFormValue({
        ...formValue,
        [name]: value
        });
    }
    const handleSubmit = (e) => {
    e.preventDefault();
    
    const { password, email } = formValue;
        props.onRegister(password, email);
    }

    return (
        <>
            <section className="auth">
                <header className="auth__header">
                    <img src={logo} className="auth__logo" alt="Логотип" />
                    <h1 className="auth__title">Добро пожаловать!</h1>
                </header>
                <form onSubmit={handleSubmit} className="auth__form">
                    <label className="auth__label" for="name">
                        Имя
                        <input className="auth__input" id="name" name="name" type="text" value={formValue.name} onChange={handleChange} placeholder='Имя'/>
                    </label>
                    <label className="auth__label" for="email">
                        E-mail
                        <input className="auth__input" id="email" name="email" type="email" value={formValue.email} onChange={handleChange} placeholder='E-mail'/>
                    </label>
                    <label className="auth__label" for="password">
                        Пароль
                        <input className="auth__input" id="password" name="password" type="password" value={formValue.password} onChange={handleChange} placeholder='Пароль'/>
                    </label>
                    <div className="auth__button-container">
                        <button type="submit" onSubmit={handleSubmit} className="auth__link">Зарегистрироваться</button>
                        <div className="auth__signin">
                            <p>Уже зарегистрированы?
                            <Link to="/sign-in" className="auth__login-link">Войти</Link>
                            </p>
                        </div>
                    </div>
                </form>
            </section>
        </>
    );
};
export default Register;