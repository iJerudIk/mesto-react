import React from 'react';

function PopupWithForm(props) {
  function handleOverlayClose(evt) {
    if(evt.target.classList.contains('popup')){
      props.onClose();
    }
  }

  return (
    <div className={`popup popup_content_${props.name} ${props.isOpen ? 'popup_opened' : ''}`} onMouseDown={handleOverlayClose}>
      <div className="popup__content">
        <button type="button" name="button-close" className="popup__close-button" onClick={props.onClose}></button>
        <h3 className="popup__name">{props.title}</h3>
        <form className="popup__form" method="post" name={props.name}>
          {props.children}
        </form>
      </div>
    </div>
  )
}


export default PopupWithForm;