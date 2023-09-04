import React, {useState, useEffect} from 'react';
import Header from '../Header/Header';
import { api } from '../../utils/api.js';

const Profile = (props) => {
    let { name, email } = props.user;

    const [formValue, setFormValue] = useState({
        name: name,
        email: email
    })

    const handleChange = (e) => {
        const {name, value} = e.target;

        setFormValue({
            ...formValue,
            [name]: value
            });
    }

    function handleEdit() {
        const fieldsets = document.querySelectorAll('.profile__fieldset');
        fieldsets.forEach((fieldset) => {
            fieldset.classList.toggle('profile__fieldset_disabled');
        });
        setFormValue({name, email});
    }

    function handleSubmit(e) {
        e.preventDefault();
        
        if (!formValue.name || !formValue.email) {
            return;
        }

        const fieldsets = document.querySelectorAll('.profile__fieldset');
        const error = document.querySelector('.profile__error');
        const title = document.querySelector('.profile__title');
        const fieldName = document.querySelector('.profile__name');
        const fieldEmail = document.querySelector('.profile__email');

        api.setUserInfo(formValue.name, formValue.email)
            .then(() => {
                fieldsets.forEach((fieldset) => {
                    fieldset.classList.toggle('profile__fieldset_disabled');
                });
                setFormValue({name: formValue.name, email: formValue.email});
                title.textContent = `Привет, ${formValue.name}!`;
                fieldName.textContent = formValue.name;
                fieldEmail.textContent = formValue.email;
            })
            .catch(err => {
                error.textContent = err;
            });
    }

    return (
        <>
            <Header loggedIn={props.loggedIn} signOut={props.signOut}/>
            <main className="profile__content">
                <section className="profile">
                    <h1 className="profile__title">Привет, {name}!</h1>
                    <div className="profile__fieldset">
                        <div>
                            <div className="profile__field profile__field-border">
                                <div>Имя</div>
                                <div className='profile__name'>{name}</div>
                            </div>
                            <div className="profile__field">
                                <div>E-mail</div>
                                <div className='profile__email'>{email}</div>
                            </div>
                        </div>
                        <div className="profile__button-group">
                            <button className="btn profile__button" onClick={handleEdit}>Редактировать</button>
                            <button className="btn profile__button profile__button-accent">Выйти из аккаунта</button>
                        </div>
                    </div>
                    <form onSubmit={handleSubmit} className="profile__fieldset profile__fieldset_disabled">
                        <label className="profile__field profile__field-border" htmlFor="name">
                            Имя
                            <input className="profile__input" id="name" name="name" type="text" value={formValue.name} onChange={handleChange} placeholder={formValue.name}/>
                        </label>
                        <label className="profile__field" htmlFor="email">
                            E-mail
                            <input className="profile__input" id="email" name="email" type="email" value={formValue.email} onChange={handleChange} placeholder={formValue.email}/>
                        </label>
                        <div className='profile__error'></div>
                        <button type="submit" onSubmit={handleSubmit} className='btn btn__profile-save'>Сохранить</button>
                    </form>
                </section>
            </main>
        </>
    );
};
export default Profile;