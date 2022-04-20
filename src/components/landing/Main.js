import React from 'react';
import Card from './Card';
import rectangle from '../../images/rectangle.svg';
import { api } from '../../utils/Api.js';

function Main(props){
  const [userName, setUserName] = React.useState('');
  const [userDescription, setUserDescription] = React.useState('');
  const [userAvatar, setUserAvatar] = React.useState('');

  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    api.getUserInfo().then((userInfo) => {
        setUserName(userInfo.name);
        setUserDescription(userInfo.about);
        setUserAvatar(userInfo.avatar);
      })
      .catch((err) => {
        console.log(`Ошибка : ${err}`);
      })

    api.getInitialCards()
      .then((cards) => {setCards(cards)})
      .catch((err) => {
        console.log(`Ошибка : ${err}`);
      })
  }, [])

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__appearance">
          <div className="profile__avatar" style={{ backgroundImage : `url(${userAvatar})` }} >
            <div className="profile__avatar-darks">
              <img src={rectangle} alt="редактирование аватара" className="profile__edit-avatar-button" onClick={props.onEditProfile} />
            </div>
          </div>
          <div className="profile__info">
            <div className="profile__wrapper">
              <h1 className="profile__name">{userName}</h1>
              <button type="button" name="edit-button" className="profile__edit-button" aria-label="редактирование профиля" onClick={props.onAddPlace}></button>
            </div>
            <p className="profile__job">{userDescription}</p>
          </div>
        </div>
        <button type="button" name="add-button" aria-label="добавление изображения" className="profile__add-button" onClick={props.onEditAvatar}></button>
      </section>
      <section className="elements">
        <ul className="elements__list">
          {cards.map((card, i) => (
            <Card card={card} onCardClick={props.onCardClick} key={i} />
          ))}
        </ul>
      </section>
    </main>
  )
}

export default Main;
