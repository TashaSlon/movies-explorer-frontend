import Header from '../Header/Header';

const Profile = (props) => {
    const {name, email} = props.user;

    function handleEdit() {
    }

    return (
        <>
            <Header signOut={props.signOut}/>
            <main className="content">
                <section className="profile">
                    <div>
                        <h1 className="profile__title">Привет, {name}!</h1>
                        <div className="profile__fieldset">
                            <div className="profile__field profile__field-border">
                                <p>Имя</p>
                                <p>{name}</p>
                            </div>
                            <div className="profile__field">
                                <p>E-mail</p>
                                <p>{email}</p>
                            </div>
                        </div>
                    </div>
                    <div className="profile__button-group">
                        <button className="profile__button" onClick={handleEdit}>Редактировать</button>
                        <button className="profile__button profile__button-accent">Выйти из аккаунта</button>
                    </div>
                </section>
            </main>
        </>
    );
};
export default Profile;