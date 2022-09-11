import React from "react";
import { CurrentUserContext } from "../context/CurrentUserContext";
import Card from "./Card.js";

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="main">
      <section className="profile">
        <div className="profile__avatar">
          <img
            className="profile__image"
            src={currentUser?.avatar ?? ""}
            alt="Аватар"
            onClick={props.onEditAvatar}
          />
        </div>
        <div className="profile__info">
          <div className="profile__name-container">
            <h1 className="profile__name">{currentUser?.name ?? ""}</h1>
            <button
              className="profile__button profile__edit-button"
              type="button"
              aria-label="Редактировать профиль"
              onClick={props.onEditProfile}
            ></button>
          </div>
          <p className="profile__caption">{currentUser?.about ?? ""}</p>
        </div>
        <button
          className="profile__button profile__add-button"
          type="button"
          onClick={props.onAddPlace}
        ></button>
      </section>

      <section className="photos">
        <ul className="elements">
          {props.cards.map((item) => (
            <Card
              key={item._id}
              card={item}
              onCardClick={props.onCardClick}
              onCardLike={props.handleCardLike}
              onCardDelete={props.handleCardDelete}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
