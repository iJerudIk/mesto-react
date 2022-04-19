import React from 'react';

import Header from './landing/Header';
import Main from './landing/Main';
import Footer from './landing/Footer';
import PopupWithForm from './landing/PopupWithForm';
import PopupWithImage from './landing/PopupWithImage';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({isOpen : false})

  function handleEditProfileClick() {setIsEditProfilePopupOpen(true)}
  function handleEditAvatarClick() {setIsEditAvatarPopupOpen(true)}
  function handleAddPlaceClick() {setIsAddPlacePopupOpen(true)}
  function handleCardClick(card) {
    card.isOpen = true;
    setSelectedCard(card)
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({...selectedCard, isOpen : false});
  }

  return (
    <div className="App">
      <Header />
      <Main onEditProfile={handleEditAvatarClick} onAddPlace={handleEditProfileClick} onEditAvatar={handleAddPlaceClick} onCardClick={handleCardClick} />
      <Footer />

      <PopupWithForm name="profile" title="Редактировать профиль" isOpen={isEditProfilePopupOpen} onClose={closeAllPopups}>
          <div className="popup__field popup__field_content_name">
            <input type="text" name="name" placeholder="Ваше имя" id="name-input" className="popup__input popup__input_content_name" required minLength="2" maxLength="40" />
            <span className="popup__input-error name-input-error"></span>
          </div>
          <div className="popup__field popup__field_content_job">
            <input type="text" name="about" placeholder="Кто вы?" id="about-input" className="popup__input popup__input_content_job" required minLength="2" maxLength="200" />
            <span className="popup__input-error about-input-error"></span>
          </div>
          <button type="submit" name="button-submit" className="popup__submit-button">Сохранить</button>
      </PopupWithForm>

      <PopupWithForm name="avatar" title="Обновить аватар" isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}>
        <div className="popup__field popup__field_content_name">
          <input type="url" name="link" placeholder="Ссылка" id="avatar-link-input" className="popup__input popup__input_content_avatar-link" required />
          <span className="popup__input-error avatar-link-input-error"></span>
        </div>
        <button type="submit" name="button-submit" className="popup__submit-button">Сохранить</button>
      </PopupWithForm>

      <PopupWithForm name="add-place" title="Новое место" isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}>
        <div className="popup__field popup__field_content_title">
          <input type="text" name="name" required placeholder="Название" id="title-input" className="popup__input popup__input_content_title" minLength="2" maxLength="30" />
          <span className="popup__input-error title-input-error"></span>
        </div>
        <div className="popup__field popup__field_content_link">
          <input type="url" name="link" required placeholder="Ссылка на картинку" id="link-input" className="popup__input popup__input_content_link" />
          <span className="popup__input-error link-input-error"></span>
        </div>
        <button type="submit" name="button-submit" className="popup__submit-button">Создать</button>
      </PopupWithForm>

      <PopupWithForm name="delete-place" title="Вы уверены?">
        <button type="submit" name="button-submit" className="popup__submit-button">Да</button>
      </PopupWithForm>

      <PopupWithImage card={selectedCard} onClose={closeAllPopups} />
    </div>
  )
}

export default App;
