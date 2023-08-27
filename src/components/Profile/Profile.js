import React, {useState} from 'react';
import Header from '../Header/Header';
import { api } from '../../utils/api.js';

const Profile = (props) => {
    const {name, email} = props.user;

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
    }

    function handleSubmit(e) {
        e.preventDefault();
        
        if (!formValue.name || !formValue.email) {
            return;
        }
        const { name, email } = formValue;
        const fieldsets = document.querySelectorAll('.profile__fieldset');
        const error = document.querySelector('.profile__error');

        api.setUserInfo(name, email)
            .then(() => {
                fieldsets.forEach((fieldset) => {
                    fieldset.classList.toggle('profile__fieldset_disabled');
                });
            })
            .catch(err => {
                error.textContent = err;
            });
        setFormValue({name: name, email: email});
    }

    return (
        <>
            <Header signOut={props.signOut}/>
            <main className="profile__content">
                <section className="profile">
                    <h1 className="profile__title">Привет, {name}!</h1>
                    <div className="profile__fieldset">
                        <div className="profile__field profile__field-border">
                            <div>Имя</div>
                            <div>{formValue.name}</div>
                        </div>
                        <div className="profile__field">
                            <div>E-mail</div>
                            <div>{formValue.email}</div>
                        </div>
                        <div className="profile__button-group">
                            <button className="profile__button" onClick={handleEdit}>Редактировать</button>
                            <button className="profile__button profile__button-accent">Выйти из аккаунта</button>
                        </div>
                    </div>
                    <form onSubmit={handleSubmit} className="profile__fieldset profile__fieldset_disabled">
                        <label className="profile__field profile__field-border" for="name">
                            Имя
                            <input className="profile__input" id="name" name="name" type="text" value={formValue.name} onChange={handleChange} placeholder={name}/>
                        </label>
                        <label className="profile__field" for="email">
                            E-mail
                            <input className="profile__input" id="email" name="email" type="email" value={formValue.email} onChange={handleChange} placeholder={email}/>
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