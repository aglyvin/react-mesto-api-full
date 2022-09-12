import { useEffect, useState } from "react";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import "../context/CurrentUserContext";
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import PopupWithForm from "./PopupWithForm.js";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPhotoPopup from "./AddPhotoPopup";
import ImagePopup from "./ImagePopup.js";
import { CurrentUserContext } from "../context/CurrentUserContext";
import ProtectedRoute from "./ProtectedRoute";
import api from "../utils/Api";
import Login from "./Login";
import Signup from "./Signup";
import authApi from "../utils/AuthApi";
import InfoToolTip from "./InfoToolTip";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    useState(false); 
  const [signUpSuccess, setSignUpSuccess] = useState(false);
  const [isInfoToolTipOpen, setIsInfoToolTipOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState(null);
  const history = useHistory();

  useEffect(() => {
    if (loggedIn) {
          api
            .getUserInfo()
            .then((userData) => {
              setCurrentUser(userData);
            })
            .catch((err) => console.log("Ошибка. Запрос не выполнен: ", err));
    }
  }, [loggedIn]);

  useEffect(() => {
    if (loggedIn) {
          api
            .getCards()
            .then((cardItems) => {
              setCards(cardItems);
            })
            .catch((err) => console.log("Ошибка. Запрос не выполнен: ", err));
    }
  }, [loggedIn]);

    useEffect(() => {
      const jwt = localStorage.getItem("jwt");
      if (jwt) {
        authApi
          .checkToken(jwt)
          .then((res) => {
            setLoggedIn(true);
            setEmail(res.data.email);
            api.setAuthorization(jwt);
            history.push("/");
          })
          .catch((err) => console.log("Ошибка. Запрос не выполнен: ", err));
      }
    }, [history]);

  const handleEditProfileClick = () => setIsEditProfilePopupOpen(true);
  const handleEditAvatarClick = () => setIsEditAvatarPopupOpen(true);
  const handleAddPlaceClick = () => setIsAddPlacePopupOpen(true);
  const handleCardClick = (card) => setSelectedCard(card);
  const handleCardDelete = (card) => {
    
    api
      .deleteCard(card._id)
      .then(() => setCards((state) => state.filter((c) => c._id !== card._id)))
      .catch((err) => console.log("Ошибка. Запрос не выполнен: ", err));
  };

  const handleCardLike = (card) => {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) => {
          return state.map((c) => (c._id === card._id ? newCard : c));
        });
      })
      .catch((err) => console.log("Ошибка. Запрос не выполнен: ", err));
  };

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsInfoToolTipOpen(false);
    setSelectedCard(null);
  };

  const handleUpdateUser = (data) => {
    api
      .setUserInfo(data)
      .then((resp) => setCurrentUser(resp))
      .then(() => closeAllPopups())
      .catch((err) => console.log("Ошибка. Запрос не выполнен: ", err));
  };

  const handleUpdateAvatar = (data) => {
    api
      .setAvatar(data)
      .then((resp) => {
        return setCurrentUser(resp);
      })
      .then(() => closeAllPopups())
      .catch((err) => console.log("Ошибка. Запрос не выполнен: ", err));
  };

  const handlePlacePhoto = (data) => {
    api
      .addCard(data)
      .then((newCard) => setCards([newCard, ...cards]))
      .then(() => closeAllPopups())
      .catch((err) => console.log("Ошибка. Запрос не выполнен: ", err));
  };

  const handleSignUpSubmit = (data) => {
    authApi.signup(data)
      .then((resp) => {
        setSignUpSuccess(true);
        setIsInfoToolTipOpen(true);
        history.push("/login");
      })
      .catch((err) => {
        console.log("Ошибка. Запрос не выполнен: ", err);
        setSignUpSuccess(false);
        setIsInfoToolTipOpen(true);
      });
  }

  function handleLoginSubmit(data) {
    authApi
      .signin(data)
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        setLoggedIn(true);
        setEmail(email);
        history.push("/");
      })
      .catch((err) => {
        console.log("Ошибка. Запрос не выполнен: ", err);
        setIsInfoToolTipOpen(true);
      });
  }

  function handleSignOut() {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
    history.push("/login");
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header onSignOut = { handleSignOut } email={email}/>
        <Switch>
          <ProtectedRoute
            exact path="/"
            loggedIn={loggedIn}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            cards={cards}
            handleCardDelete={handleCardDelete}
            handleCardLike={handleCardLike}
            component={Main}

          />
          <Route path="/login">
            <Login onSignIn={ handleLoginSubmit }/> 
          </Route>
          <Route path="/signup">
            <Signup onSignUp={ handleSignUpSubmit }/> 
          </Route>
          <Route>
            {loggedIn ? <Redirect to="/" /> : <Redirect to="login"/>}
          </Route>
        </Switch>
        <Footer />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <PopupWithForm
          name="edit-delete-card"
          title="Вы уверены?"
          buttonText="Да"
          onClose={closeAllPopups}
        ></PopupWithForm>

        <AddPhotoPopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPhoto={handlePlacePhoto}
        />

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />

        <InfoToolTip 
          isOpen={ isInfoToolTipOpen }
          onClose={ closeAllPopups }
          success={ signUpSuccess }
        />
      </CurrentUserContext.Provider>
      </div>
  );
}

export default App;
