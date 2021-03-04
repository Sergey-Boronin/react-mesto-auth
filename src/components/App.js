import React, { useState, useEffect, useCallback } from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "../components/Footer";
import EditProfilePopup from "./EditProfilePopup";
import AddPlacePopup from "../components/AddPlacePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import ImagePopup from "./ImagePopup";
import CurrentUserContext from "./../contexts/CurrentUserContext";
import api from "../utils/api";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import * as auth from "../utils/auth";
import Login from "./Login";
import Register from "./Register";
import InfoTooltip from "./InfoTooltip";
import ProtectedRoute from "./ProtectedRoute";

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

  const [isInfoTooltipPopupOpen, setInfoTooltipPopupOpen] = useState(false);

  const [selectedCard, setSelectedCard] = React.useState(undefined);
  const handleCardClick = (card) => setSelectedCard(card);
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [success, setSuccess] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");

  const closePopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(undefined);
    setInfoTooltipPopupOpen(false);
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

  const history = useHistory();

  const authCheck = useCallback(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth
        .checkToken(jwt)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            setEmail(res.data.email);
            history.push("/cards");
          }
        })
        .catch(() => history.push("/sign-in"));
    }
  }, [history]);

  useEffect(() => {
    authCheck();
  }, [authCheck]);

  const handleLogin = ({ email, password }) => {
    return auth
      .login(email, password)
      .then((result) => {
        if (result.token) {
          setEmail(email);
          setLoggedIn(true);
          localStorage.setItem("jwt", result.token);
          history.push("/cards");
        }
      })
      .catch((result) => {
        console.log(result);
      });
  };

  const handleRegister = ({ email, password }) => {
    return auth
      .register(email, password)
      .then((result) => {
        setSuccess(true);
        setInfoTooltipPopupOpen(true);
        history.push("/sign-in");
        return result;
      })
      .catch((result) => {
        setInfoTooltipPopupOpen(true);
        console.log(result);
      });
  };

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setEmail("");
    setLoggedIn(false);
    history.push("/sign-in");
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header email={email} isLogged={loggedIn} onLogout={handleLogout} />
        <Switch>
          <Route path="/sign-up">
            <Register onRegister={handleRegister} />
          </Route>
          <Route path="/sign-in">
            <Login onLogin={handleLogin} />
          </Route>
          <ProtectedRoute
            loggedIn={loggedIn}
            path="/cards"
            component={Main}
            onEditProfile={handleEditProfileClick}
            onEditAvatar={handleEditAvatarClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            cards={cards}
          ></ProtectedRoute>
          <Route>
            {loggedIn ? <Redirect to="/cards" /> : <Redirect to="/sign-in" />}
          </Route>
        </Switch>

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
        <InfoTooltip
          isOpen={isInfoTooltipPopupOpen}
          onClose={closePopups}
          success={success}
        />
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
