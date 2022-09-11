import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../context/CurrentUserContext";

function EditProfilePopup(props) {
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setName(currentUser?.name);
    setDescription(currentUser?.about);
  }, [currentUser, props.sOpen]);

  const changeNameHandler = (e) => {
    setName(e.target.value);
  };

  const changeAboutHandler = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onUpdateUser({
      name,
      about: description,
    });
  };
  return (
    <PopupWithForm
      name="edit-profile"
      title="Редактировать профиль"
      buttonText="Сохранить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        name="input-name"
        id="input-name"
        type="text"
        value={name || ""}
        minLength="2"
        maxLength="40"
        className="popup__input"
        required
        onChange={changeNameHandler}
      />
      <span id="input-name-error" className="popup__error"></span>
      <input
        id="input-about"
        name="input-about"
        type="text"
        value={description??""}
        onChange={changeAboutHandler}
        minLength="2"
        maxLength="200"
        className="popup__input"
        required
      />
      <span id="input-about-error" className="popup__error"></span>
    </PopupWithForm>
  );
}
export default EditProfilePopup;
