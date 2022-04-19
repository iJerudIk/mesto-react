import React from 'react';

function Card(props){
  function handleClick() {
    props.onCardClick(props.card);
  }

  return (
    <li className="elements__element">
      <div className="elements__delete-button"></div>
      <img className="elements__image" src={props.card.link} alt={props.card.name} onClick={handleClick} />
      <div className="elements__bottom">
        <h2 className="elements__title">{props.card.name}</h2>
        <div className="elements__like">
          <button className="elements__like-button"></button>
          <p className="elements__like-number">{props.card.likes.length}</p>
        </div>
      </div>
    </li>
  )
}

export default Card;
