import React from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = props.card.owner._id === currentUser._id;
  const cardDeleteButtonClassName = `card__delete-button ${
    isOwn ? "" : "card__delete-button_inactive"
  }`;
  const isLiked = props.card.likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = `card__like-button ${
    isLiked ? "card__like-button_active" : ""
  }`;

  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleDeleteCard() {
    props.onCardDelete(props.card);
  }

  return (
      <article className="card">
        <button
          className={`${cardDeleteButtonClassName} page-button`}
          onClick={handleDeleteCard}
        ></button>
        <img
          src={props.card.link}
          alt={props.card.name}
          className="card__image"
          onClick={handleClick}
        />
        <div className="card__container">
          <h2 className="card__title hide-overflow">{props.card.name}</h2>
          <div className="card__like-container">
            <button
              type="button"
              className={`${cardLikeButtonClassName} page-button`}
              onClick={handleLikeClick}
            ></button>
            <span className="card__like-counter">
              {props.card.likes.length}
            </span>
          </div>
        </div>
      </article>
  );
}

export default Card;
