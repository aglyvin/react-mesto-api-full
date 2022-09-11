import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
  const urlRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar(urlRef.current.value);
    urlRef.current.value = "";
  }
  return (
    <PopupWithForm
      name="change-avatar"
      title="Обновить аватар"
      buttonText="Сохранить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        ref={urlRef}
        name="input-url"
        id="input-url"
        type="url"
        placeholder="Ссылка на картинку"
        required
        className="popup__input"
      />
      <span id="input-url-error" className="popup__error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
