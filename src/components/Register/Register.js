import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import Logo from '../Logo/Logo';

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
            <section className="auth">
                <header className="auth__header">
                    <Logo />
                    <h1 className="auth__title">Добро пожаловать!</h1>
                </header>
                <form onSubmit={handleSubmit} className="auth__form">
                    <div className="auth__inputs">
                        <label className="auth__label" htmlFor="name">
                            Имя
                            <input className="auth__input" id="name" name="name" type="text" value={formValue.name} onChange={handleChange} placeholder='Имя'/>
                        </label>
                        <label className="auth__label" htmlFor="email">
                            E-mail
                            <input className="auth__input" id="email" name="email" type="email" value={formValue.email} onChange={handleChange} placeholder='E-mail'/>
                        </label>
                        <label className="auth__label" htmlFor="password">
                            Пароль
                            <input className="auth__input" id="password" name="password" type="password" value={formValue.password} onChange={handleChange} placeholder='Пароль'/>
                        </label>
                    </div>
                    <div className="auth__button-container">
                        <button type="submit" onSubmit={handleSubmit} className="btn auth__btn">Зарегистрироваться</button>
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