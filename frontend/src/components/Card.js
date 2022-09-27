import React from "react";
import { CurrentUserContext } from "../context/CurrentUserContext";

function Card(props) {
  const likeCount = props.card.likes.length;

  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = props.card.owner === currentUser._id;
  const cardDeleteButtonClassName = `elements__delete-button ${
    isOwn ? "elements__delete-button_visible" : "elements__delete-button_hidden"
  }`;

  const isLiked = props.card.likes.some((i) => i === currentUser._id);

  const cardLikeButtonClassName = `elements__like-button ${
    isLiked ? "elements__like-button_liked" : ""
  }`;

  function handleClick() {
    props.onCardClick(props.card);
  }
  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }

  function handleLikeClick() {
    props.onCardLike(props.card, currentUser);
  }
  return (
    <li className="elements__card">
      <img
        className="elements__image"
        src={props.card.link}
        alt={props.card.name}
        onClick={handleClick}
      />
      <button
        className={cardDeleteButtonClassName}
        onClick={handleDeleteClick}
      ></button>
      <div className="elements__title-container">
        <h2 className="elements__title">{props.card.name}</h2>
        <div className="elements__like_block">
          <button
            type="button"
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
          ></button>
          <span className="elements__like_count">
            {likeCount > 0 ? likeCount : ""}
          </span>
        </div>
      </div>
    </li>
  );
}

export default Card;
