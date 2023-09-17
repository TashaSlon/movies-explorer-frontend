import React, {useState} from 'react';
import Header from '../Header/Header';
import { api } from '../../utils/MainApi';
import { handleChange } from '../../utils/validation';

const Profile = (props) => {
    let { name, email } = props.user;
    const [formValue, setFormValue] = useState({
        name: name,
        email: email
    });
    const [isValid, setIsValid] = useState(false);

    const handleValid = (e) => {
        const field = e.target;
        const errorPlace = document.querySelector('.profile__error');
        errorPlace.textContent = handleChange(field, setFormValue, setIsValid, formValue);
    }

    function handleEdit() {
        const fieldsets = document.querySelectorAll('.profile__fieldset');
        fieldsets.forEach((fieldset) => {
            fieldset.classList.toggle('profile__fieldset_disabled');
        });
        setFormValue({name, email});
    }

    function handleLogout() {
        props.signOut();
    }

    function handleSubmit(e) {
        e.preventDefault();
        
        if (!formValue.name || !formValue.email) {
            return;
        }

        const fieldsets = document.querySelectorAll('.profile__fieldset');
        const error = document.querySelector('.profile__error');
        

        api.setUserInfo(formValue.name, formValue.email)
            .then(() => {
                fieldsets.forEach((fieldset) => {
                    fieldset.classList.toggle('profile__fieldset_disabled');
                });
                console.log(formValue);
                props.handleProfile(formValue.name, formValue.email);
                
            })
            .catch(err => {
                error.textContent = err;
            });
    }

    return (
        <>
            <Header loggedIn={props.loggedIn} signOut={props.signOut}/>
            <main className="profile">
                <section className="profile__content">
                    <h1 className="profile__title">Привет, {formValue.name}!</h1>
                    <div className="profile__fieldset">
                        <div>
                            <div className="profile__field profile__field-border">
                                <div>Имя</div>
                                <div className='profile__name'>{formValue.name}</div>
                            </div>
                            <div className="profile__field">
                                <div>E-mail</div>
                                <div className='profile__email'>{formValue.email}</div>
                            </div>
                        </div>
                        <div className="profile__button-group">
                            <button className="btn profile__button" onClick={handleEdit}>Редактировать</button>
                            <button className="btn profile__button profile__button-accent" onClick={handleLogout}>Выйти из аккаунта</button>
                        </div>
                    </div>
                    <form onSubmit={handleSubmit} className="profile__fieldset profile__fieldset_disabled" noValidate>
                        <label className="profile__field profile__field-border" htmlFor="name">
                            Имя
                            <input className="profile__input" id="name" name="name" type="text" value={formValue.name} onChange={handleValid} placeholder={formValue.name} required minLength="2" maxLength="30" />
                        </label>
                        <label className="profile__field" htmlFor="email">
                            E-mail
                            <input className="profile__input" id="email" name="email" type="email" value={formValue.email} onChange={handleValid} placeholder={formValue.email} required />
                        </label>
                        <div className='profile__error'></div>
                        <button type="submit" onSubmit={handleSubmit} className={isValid ? 'btn profile__btn-save' : 'btn profile__btn-save auth__btn-disabled'} disabled={(isValid) ? false : true }>Сохранить</button>
                    </form>
                </section>
            </main>
        </>
    );
};
export default Profile;