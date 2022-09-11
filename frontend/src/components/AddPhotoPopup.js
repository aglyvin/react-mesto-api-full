import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPhotoPopup(props) {
  const urlRef = React.useRef();
  const nameRef = React.useRef();
  function handleSubmit(e) {
    e.preventDefault();
    props.onAddPhoto({
      name: nameRef.current.value,
      link: urlRef.current.value,
    });
    urlRef.current.value = "";
  }

  return (
    <PopupWithForm
      name="add-photo"
      title="Новое место"
      buttonText="Сохранить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        name="photo-name"
        ref={nameRef}
        id="photo-name"
        type="text"
        className="popup__input"
        placeholder="Название"
        minLength="2"
        maxLength="30"
        required
      />
      <span id="photo-name-error" className="popup__error"></span>
      <input
        name="photo-link"
        ref={urlRef}
        id="photo-link"
        type="url"
        className="popup__input"
        placeholder="Ссылка на картинку"
        required
      />
      <span id="photo-link-error" className="popup__error"></span>
    </PopupWithForm>
  );
}

export default AddPhotoPopup;
