import React from "react";
import editButtonImg from "../images/edit-button-image.svg";
import addButtonImg from "../images/add-button-image.svg";
import Card from "./Card";
import CurrentUserContext from "../contexts/CurrentUserContext";
// import Login from "./Login";

function Main({
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  onCardClick,
  cards,
  onCardLike,
  onCardDelete,
}) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__main-container">
          <button
            className="profile__avatar-edit-button page-button"
            onClick={onEditAvatar}
          >
            <img
              src={currentUser.avatar}
              alt="Аватар пользователя"
              className="profile__avatar"
            />
            <div className="profile__avatar-edit-icon"></div>
          </button>
          <div className="profile__info">
            <div className="profile__name-container">
              <h1 className="profile__name hide-overflow">
                {currentUser.name}
              </h1>
              <button
                type="button"
                className="profile__edit-button page-button"
                onClick={onEditProfile}
              >
                <img
                  className="profile__edit-image"
                  src={editButtonImg}
                  alt="Редактировать профиль"
                />
              </button>
            </div>
            <p className="profile__job hide-overflow">{currentUser.about}</p>
          </div>
        </div>
        <button
          type="button"
          className="profile__add-button page-button"
          onClick={onAddPlace}
        >
          <img src={addButtonImg} alt="Добавить" />
        </button>
      </section>
      <section className="cards">
        {cards.map((card) => (
          <Card
            card={card}
            onCardClick={() => onCardClick(card)}
            key={card._id}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
          />
        ))}
      </section>
      {/* <Login/> */}
    </main>
  );
}

export default Main;
