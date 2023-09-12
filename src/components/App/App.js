import { useState, useEffect } from 'react';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';
import './App.css';
import Main from '../Main/Main';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import NotFound from '../NotFound/NotFound';
import InfoTooltip from '../InfoTooltip/InfoTooltip';
import ProtectedRouteElement from '../ProtectedRoute/ProtectedRoute';
import { authorize, register, logout } from '../../utils/auth.js';
import { api } from '../../utils/MainApi';
import { getMovies } from '../../utils/MoviesApi';


function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState({
    name: 'Наталья',
    email: 'exampl@exampl.com'
  });
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [status, setStatus] = useState(false);
  const [cinemaCheckbox, setCinemaCheckbox] = useState(true);
  const [currentUser, setCurrentUser] = useState({});

  const navigate = useNavigate();

  function tokenCheck() {
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
    }},[loggedIn]);

    useEffect(() => {
      if (loggedIn){
          api.getMovies()
            .then(movies => {
                let savedMovies = [];
                movies.forEach(movie => savedMovies.push(movie));
                localStorage.setItem('savedMovies', JSON.stringify(savedMovies));
                localStorage.setItem('searchResultsForSaved', JSON.stringify(savedMovies));
            })
            .catch(err => {
              localStorage.setItem('savedMovies', JSON.stringify([]));
              localStorage.setItem('searchResultsForSaved', JSON.stringify([]));
              console.log(`Ошибка.....: ${err}`)
            });
      }},[loggedIn]);
    

    useEffect(() => {
      if (loggedIn){
        getMovies()
              .then(movies => {
                  let fullList =[];
                  movies.forEach(movie => {
                      fullList.push(movie);
                  });
                  localStorage.setItem('fullList', JSON.stringify(fullList));
              })
              .catch(err => console.log(`Ошибка.....: ${err}`));
    }},[loggedIn]);

  function handleInfoTooltipClick(res) {
    if(res.name) {
      setStatus(true);
    }
    setIsInfoTooltipOpen(true);
  };

  function closeAllPopups() {
    setIsInfoTooltipOpen(false);
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

  function handleRegister(name, password, email) {
    register(name, email, password)
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
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Routes>
          <Route path="/" 
           element={<ProtectedRouteElement
            element={Main}
            signOut = {signOut}
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
            element={<ProtectedRouteElement
            element={Movies} 
            cinemaCheckbox = {cinemaCheckbox}
            onCheckboxClick = {handleCheckboxClick}
            signOut = {signOut}
            loggedIn={loggedIn}
          />} />
          <Route path="/saved-movies" 
          element={<ProtectedRouteElement
          element={SavedMovies} 
          cinemaCheckbox = {cinemaCheckbox}
          onCheckboxClick = {handleCheckboxClick}
          signOut = {signOut}
          loggedIn={loggedIn}
          />}  />
          <Route path="/profile"
          element={<ProtectedRouteElement
          element={Profile} 
          user={userData} 
          signOut = {signOut}
          loggedIn={loggedIn}/>} />
          <Route path="/404" element= {<NotFound />} />
          <Route path="/" element={loggedIn ? <Navigate to="/404" replace /> : <Navigate to="/sign-in" replace />} />
        </Routes>
        <InfoTooltip isOpen={isInfoTooltipOpen} onClose={closeAllPopups} status={status}/>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
