import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import Logo from '../Logo/Logo';

const Login = (props) => {
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
        
        if (!formValue.email || !formValue.password) {
            return;
        }
        const { password, email } = formValue;
        props.handleLogin(password, email);
        setFormValue({email: '', password: ''});
    }

    return (
            <section className="auth">
                <header className="auth__header">
                    <Logo />
                    <h1 className="auth__title">Рады видеть!</h1>
                </header>
                <form onSubmit={handleSubmit} className="auth__form">
                    <div className="auth__inputs">
                        <label className="auth__label" for="email">
                            E-mail
                            <input className="auth__input" id="email" name="email" type="email" value={formValue.email} onChange={handleChange} placeholder='E-mail'/>
                        </label>
                        <label className="auth__label" for="password">
                            Пароль
                            <input className="auth__input" id="password" name="password" type="password" value={formValue.password} onChange={handleChange} placeholder='Пароль'/>
                        </label>
                    </div>
                    <div className="auth__button-container">
                        <button type="submit" onSubmit={handleSubmit} className="btn btn__auth">Войти</button>
                        <div className="auth__signin">
                            <p>Ещё не зарегистрированы?</p>
                            <Link to="/sign-up" className="link link__login">Регистрация</Link>
                        </div>
                    </div>
                </form>
            </section>
    );
};
export default Login;