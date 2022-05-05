import React from 'react';

import Header from './landing/Header';
import Main from './landing/Main';
import Footer from './landing/Footer';

import PopupWithForm from './landing/Popups/PopupWithForm';
import EditProfilePopup from './landing/Popups/EditProfilePopup';
import EditAvatarPopup from './landing/Popups/EditAvatarPopup';
import AddPlacePopup from './landing/Popups/AddPlacePopup';
import ImagePopup from './landing/Popups/ImagePopup';

import { api } from '../utils/Api.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({isOpen : false});
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    if(isLiked){
      api.removeLike(card._id)
        .then((newCard) => {setCards((state) => state.map((c) => c._id === card._id ? newCard : c))})
        .catch((err) => {console.log(`Ошибка : ${err}`)});
    }else{
      api.setLike(card._id)
        .then((newCard) => {setCards((state) => state.map((c) => c._id === card._id ? newCard : c))})
        .catch((err) => {console.log(`Ошибка : ${err}`)});
    }
  }
  function handleCardDelete(card) {
    api.removeCard(card._id)
      .then(() => {setCards(state=>state.filter((c) => {return c._id !== card._id}))})
      .catch((err) => {console.log(`Ошибка : ${err}`)});
  }

  function handleEditProfileClick() {setIsEditProfilePopupOpen(true)}
  function handleEditAvatarClick() {setIsEditAvatarPopupOpen(true)}
  function handleAddPlaceClick() {setIsAddPlacePopupOpen(true)}
  function handleCardClick(card) {card.isOpen = true; setSelectedCard(card)}

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({...selectedCard, isOpen : false});
  }

  function handleUpdateUser(userInfo) {
    api.setUserInfo(userInfo)
      .catch((err) => {console.log(`Ошибка : ${err}`)});
    setCurrentUser({
      ...currentUser,
      name: userInfo.name,
      about: userInfo.about
    });
    closeAllPopups();
  }
  function handleUpdateAvatar(userInfo) {
    api.setUserAvatar(userInfo.avatar)
      .catch((err) => {console.log(`Ошибка : ${err}`)});
    setCurrentUser({
      ...currentUser,
      avatar: userInfo.avatar,
    });
    closeAllPopups();
  }
  function handleAddPlaceSubmit(card) {
    api.addNewCard(card)
      .then((newCard) => {
        setCards([newCard, ...cards]);
      })
      .catch((err) => {console.log(`Ошибка : ${err}`)});
    closeAllPopups();
  }

  React.useEffect(() => {
    api.getUserInfo().then((userInfo) => {
        setCurrentUser(userInfo);
      })
      .catch((err) => {
        console.log(`Ошибка : ${err}`);
      })
    api.getInitialCards()
      .then((cards) => {setCards(cards)})
      .catch((err) => {
        console.log(`Ошибка : ${err}`);
      })
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <Header />
        <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
          cards={cards}
        />
        <Footer />

        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}  onUpdateAvatar={handleUpdateAvatar} />

        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />

        <PopupWithForm name="delete-place" title="Вы уверены?" buttonText="Да">
        </PopupWithForm>

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      </div>
    </CurrentUserContext.Provider>
  )
}

export default App;
