import React, { useEffect } from "react";

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
import api from "../utils/Api";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState(null);
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    api
      .getUserInfo()
      .then((userData) => {
        setCurrentUser(userData);
      })
      .catch((err) => console.log("Ошибка. Запрос не выполнен: ", err));
  }, []);

  useEffect(() => {
    api
      .getCards()
      .then((cardItems) => {
        setCards(cardItems);
      })
      .catch((err) => console.log("Ошибка. Запрос не выполнен: ", err));
  }, []);

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

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />
        <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          cards={cards}
          handleCardDelete={handleCardDelete}
          handleCardLike={handleCardLike}
        />
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
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
