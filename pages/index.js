// --- Глобальные переменные

const profileName = document.querySelector(`.profile__name`);
const profileOccupation = document.querySelector(`.profile__occupation`);

const elementTemplate = document.querySelector(`#element-template`).content.querySelector(`.element`);
const elements = document.querySelector(`.elements`);

const buttonOpenEdit = document.querySelector(`.button_type_edit`);
const buttonOpenAdd = document.querySelector(`.button_type_add`);
const buttonCloseEdit = document.querySelector(`.popup__close_type_edit`);
const buttonCloseAdd = document.querySelector(`.popup__close_type_add`);
const buttonCloseUnfold = document.querySelector(`.popup__close_type_unfold`);
const buttonSaveEdit = document.querySelector(`.popup__button_type_edit`);
const buttonSaveAdd = document.querySelector(`.popup__button_type_add`);

const popupAdd = document.querySelector(`.popup_add`);
const popupAddName = popupAdd.querySelector(`.popup__item_type_add[name="name"]`);
const popupAddLink = popupAdd.querySelector(`.popup__item_type_add[name="reference"]`);
const popupEdit = document.querySelector(`.popup_edit`);
const popupEditName = popupEdit.querySelector(`.popup__item_type_edit[name="name"]`);
const popupEditOccupation = popupEdit.querySelector(`.popup__item_type_edit[name="occupation"]`);

const popupUnfold = document.querySelector(`.popup_unfold`);
const popupPhoto = popupUnfold.querySelector(`.popup__photo`);
const popupName = popupUnfold.querySelector(`.popup__name`);

const formEdit = popupEdit.querySelector(`.popup__admin`);
const formAdd = popupAdd.querySelector(`.popup__admin`);

// --- Массив карточек

const initialCards = [
  {
    name: `Архыз`,
    link: `https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg`
  },
  {
    name: `Челябинская область`,
    link: `https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg`
  },
  {
    name: `Иваново`,
    link: `https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg`
  },
  {
    name: `Камчатка`,
    link: `https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg`
  },
  {
    name: `Холмогорский район`,
    link: `https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg`
  },
  {
    name: `Байкал`,
    link: `https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg`
  }
];

// --- Создание карточки

function createCard(card) {
  const element = elementTemplate.cloneNode(true);
  element.querySelector(`.element__button-trash`).addEventListener(`click`, ()=> {
    element.remove();
  });
  
  element.querySelector(`.element__photo`).setAttribute(`src`, `${card.link}`);
  element.querySelector(`.element__photo`).setAttribute(`alt`, `${card.name}`);
  element.querySelector(`.element__photo`).addEventListener(`click`, ()=> {
    openPopup(popupUnfold);
    popupPhoto.setAttribute(`src`, `${card.link}`);
    popupPhoto.setAttribute(`alt`, `${card.name}`);
    popupName.textContent = `${card.name}`;
  });
  
  element.querySelector(`.element__name`).textContent = `${card.name}`;
  element.querySelector(`.element__button-like`).addEventListener(`click`, (evt)=> {
    evt.target.classList.toggle(`element__button-like_active`);
  });
  
  return element;
}

// --- Рендеринг карточек

function renderCards(a) {
  for (let i = 0; i <= a.length - 1; i++) {
    elements.append(createCard(a[i]));
  }
}

renderCards(initialCards);

// --- Открыть попап

function openPopup(a) {
  a.classList.add(`popup_opened`);
}

buttonOpenEdit.addEventListener(`click`, ()=> {
  openPopup(popupEdit);
  popupEditName.setAttribute(`value`, `${profileName.textContent}`);
  popupEditOccupation.setAttribute(`value`, `${profileOccupation.textContent}`);
});

buttonOpenAdd.addEventListener(`click`, ()=> {
  popupAddName.value = ``;
  popupAddLink.value = ``;
  openPopup(popupAdd);
});

// --- Закрыть попап

function closePopup(a) {
  a.classList.remove(`popup_opened`);
}

buttonCloseEdit.addEventListener(`click`, ()=> {
  closePopup(popupEdit);
});

buttonCloseAdd.addEventListener(`click`, ()=> {
  closePopup(popupAdd);
});

// --- Сохранение обновлённой информации о профиле

formEdit.addEventListener(`submit`, (evt)=> {
  profileName.textContent = popupEditName.value;
  profileOccupation.textContent = popupEditOccupation.value;
  closePopup(popupEdit);
  evt.preventDefault();
});

buttonCloseUnfold.addEventListener(`click`, ()=> {
  closePopup(popupUnfold);
});

// --- Добавление карточки

formAdd.addEventListener(`submit`, (evt)=> {
  elements.prepend(createCard({
    name: `${popupAddName.value}`, 
    link: `${popupAddLink.value}`
  }));
  
  closePopup(popupAdd);
  evt.preventDefault();
});