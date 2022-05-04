import React from 'react';
import PopupWithForm from './PopupWithForm';

import { CurrentUserContext } from '../../../contexts/CurrentUserContext.js';

function EditAvatarPopup(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const avatarRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateAvatar({
      avatar: avatarRef.current.value
    });
  }

  return (
    <PopupWithForm name="avatar" title="Обновить аватар" buttonText="Сохранить" onSubmit={handleSubmit} {...props}>
      <div className="popup__field popup__field_content_name">
        <input
          type="url" name="link"
          placeholder="Ссылка"
          id="avatar-link-input"
          className="popup__input popup__input_content_avatar-link"
          required ref={avatarRef}
        />
        <span className="popup__input-error avatar-link-input-error"></span>
      </div>
    </PopupWithForm>
  )
}


export default EditAvatarPopup;