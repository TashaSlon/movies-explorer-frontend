import { useState, useEffect } from 'react';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import './App.css';
import Main from '../Main/Main';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import NotFound from '../NotFound/NotFound';
import { getEmail, authorize, register,logout } from '../../utils/auth';
import { api } from '../../utils/api.js';


function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState({
    name: 'Наталья',
    email: 'exampl@exampl.com'
  });
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [status, setStatus] = useState(false);
  const [cinemaCheckbox, setCinemaCheckbox] = useState(true);

  const navigate = useNavigate();

  /*function tokenCheck() {
    api.getUserInfo()
    .then((res) => {
      if (res){
        setLoggedIn(true);
        navigate("/", {replace: true});
      }
    })
    .catch(err => console.log(`Ошибка.....: ${err}`))
  };

  useEffect(() => {
    tokenCheck();
    if (loggedIn){
      api.getUserInfo()
        .then(userData => {
          setUserData(userData);
        })
        .catch(err => console.log(`Ошибка.....: ${err}`))
    }},[loggedIn]); */

  function handleInfoTooltipClick(res) {
    if(res.data) {
      setStatus(true);
    }
    setIsInfoTooltipOpen(true);
  };

  function handleLogin(password, email) {
    authorize(password, email)
      .then(() => {
          setUserData(email);
          setLoggedIn(true);
          navigate('/', {replace: true});
      })
      .catch(err => {
        setStatus(false);
        handleInfoTooltipClick(err);
      });
  }

  function handleRegister(password, email) {
    register(password, email)
    .then((res) => {
        handleInfoTooltipClick(res);
        navigate('/sign-in', {replace: true});
    })
    .catch(err => {
      setStatus(false);
      handleInfoTooltipClick(err);
    });
  }

  function signOut(){
    logout()
    .then((res) => {
      setLoggedIn(false);
      navigate('/sign-in', {replace: true});
    })
    .catch(err => {
      setStatus(false);
      handleInfoTooltipClick(err);
    });
  }

  function handleCheckboxClick() {
    if (cinemaCheckbox) {
      setCinemaCheckbox(false);
    } else {
      setCinemaCheckbox(true);
    }
  }

  return (
    <div className="page">
      <Routes>
        <Route path="/" 
        element= {<Main signOut = {signOut}
        loggedIn={loggedIn}/>} 
        />
        <Route path="/sign-up" element={
          <div className="registerContainer">
            <Register onRegister={handleRegister} />
          </div>} />
        <Route path="/sign-in" element={
          <div className="loginContainer">
            <Login handleLogin={handleLogin} />
          </div>} />
        <Route path="/movies" 
          element= {<Movies 
          cinemaCheckbox = {cinemaCheckbox}
          onCheckboxClick = {handleCheckboxClick}
          signOut = {signOut}
          loggedIn={loggedIn}
        />} />
        <Route path="/saved-movies" 
        element= {<SavedMovies 
        cinemaCheckbox = {cinemaCheckbox}
        onCheckboxClick = {handleCheckboxClick}
        signOut = {signOut}
        loggedIn={loggedIn}/>}  />
        <Route path="/profile" element= {<Profile 
        user={userData} 
        signOut = {signOut}
        loggedIn={loggedIn}/>} />
        <Route path="/404" element= {<NotFound />} />
        {/*<Route path="/" element={loggedIn ? <Navigate to="/" replace /> : <Navigate to="/sign-in" replace />} /> */}
      </Routes>
    </div>
  );
}

export default App;
