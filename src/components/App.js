import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "../components/Footer";
import EditProfilePopup from "./EditProfilePopup";
import AddPlacePopup from "../components/AddPlacePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import ImagePopup from "./ImagePopup";
import CurrentUserContext from "./../contexts/CurrentUserContext";
import api from "../utils/api";
import { Route, Switch } from "react-router-dom";

import Login from "./Login";
import Register from "./Register";
import InfoTooltip from "./InfoTooltip"

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(
    false
  );
  const handleEditProfileClick = () =>
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(
    false
  );
  const handleEditAvatarClick = () =>
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);

  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const handleAddPlaceClick = () =>
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);

  // const [isInfoTooltipPopupOpen, setInfoTooltipPopupOpen] = useState(false);


  const [selectedCard, setSelectedCard] = React.useState(undefined);
  const handleCardClick = (card) => setSelectedCard(card);

  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);

  const closePopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(undefined);
  };

  function handleUpdateUser(data) {
    api
      .updateUserData(data)
      .then((result) => {
        setCurrentUser(result);
        closePopups();
      })
      .catch((err) => {
        console.log(`Ошибка обновления данных ${err}`);
      });
  }

  function handleUpdateAvatar(data) {
    api
      .updateUserAvatar(data)
      .then((data) => {
        setCurrentUser(data);
        closePopups();
      })
      .catch((err) => {
        console.log(`Ошибка обновления аватара ${err}`);
      });
  }

  function handleAddPlaceSubmit(data) {
    api
      .addNewCard(data)
      .then((result) => {
        const newCard = result;
        setCards([newCard, ...cards]);
        closePopups();
      })
      .catch((err) => {
        console.log(`Ошибка добавления карточки ${err}`);
      });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api
      .changeLikeStatus(card._id, !isLiked)
      .then((newCard) => {
        const newCards = cards.map((c) => (c._id === card._id ? newCard : c));
        setCards(newCards);
      })
      .catch((err) => {
        console.log(`Ошибка установки лайка ${err}`);
      });
  }

  function handleCardDelete(card) {
    api
      .removeCard(card._id)
      .then(() => {
        const newCards = cards.filter((c) => c._id !== card._id);
        setCards(newCards);
      })
      .catch((err) => {
        console.log(`Ошибка удаления карточки ${err}`);
      });
  }

  React.useEffect(() => {
    Promise.all([api.getUserData(), api.getInitialCards()])
      .then(([userData, cards]) => {
        setCurrentUser(userData);
        setCards(cards);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        {/* <Route path='/header'> */}
        <Header />
        {/* </Route> */}
        <Switch>
          <Route exact path="/">
            <Main
              onEditProfile={handleEditProfileClick}
              onEditAvatar={handleEditAvatarClick}
              onAddPlace={handleAddPlaceClick}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
              cards={cards}
            />

            <EditProfilePopup
              isOpen={isEditProfilePopupOpen}
              onClose={closePopups}
              onUpdateUser={handleUpdateUser}
            />
            <AddPlacePopup
              isOpen={isAddPlacePopupOpen}
              onClose={closePopups}
              onAddPlace={handleAddPlaceSubmit}
            />
            <EditAvatarPopup
              isOpen={isEditAvatarPopupOpen}
              onClose={closePopups}
              onUpdateAvatar={handleUpdateAvatar}
            />
            <ImagePopup onClose={closePopups} card={selectedCard} />
          </Route>

          <Route path="/sign-up">
            <Register />
          </Route>
          <Route path="/sign-in">
            <Login />
          </Route>
        </Switch>
        <Footer />
        <InfoTooltip
          isOpen={true}
          onClose={closePopups}
          // success={success}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
