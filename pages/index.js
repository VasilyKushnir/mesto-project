// --- Глобальные переменные

const buttonOpenEdit = document.querySelector(`.button_type_edit`);
const buttonOpenAdd = document.querySelector(`.button_type_add`);
const buttonCloseEdit = document.querySelector(`.popup__close_type_edit`);
const buttonCloseAdd = document.querySelector(`.popup__close_type_add`);
const buttonSaveEdit = document.querySelector(`.popup__button_type_edit`);
const buttonSaveAdd = document.querySelector(`.popup__button_type_add`);

const popupAdd = document.querySelector(`.popup_add`);
const popupEdit = document.querySelector(`.popup_edit`);

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
  const elementTemplate = document.querySelector(`#element-template`).content;
  const element = elementTemplate.querySelector(`.element`).cloneNode(true);
  element.querySelector(`.element__photo`).setAttribute(`src`, `${card.link}`);
  element.querySelector(`.element__photo`).setAttribute(`alt`, `${card.name}`);
  element.querySelector(`.element__photo`).addEventListener(`click`, function() {
    showUnfoldPopup(`${card.link}`, `${card.name}`);
  });
  element.querySelector(`.element__name`).textContent = `${card.name}`;
  element.querySelector(`.element__button-like`).addEventListener(`click`, function(evt) {
    evt.target.classList.toggle(`element__button-like_active`);
  });
  return element;
}

// --- Рендеринг карточек

function renderCards(a) {
  const elements = document.querySelector(`.elements`);
  elements.innerHTML = ``;
  for (let i = 0; i <= a.length - 1; i++) {
    const card = createCard(a[i]);
    card.querySelector(`.element__button-trash`).addEventListener(`click`, function() {
      a.splice(i, 1);
      renderCards(a);
    });
    elements.append(card);
  }
}

renderCards(initialCards);

// --- Открытие модального окна «Редактировать»

buttonOpenEdit.addEventListener(`click`, function() {
  (document.querySelectorAll(`.popup__item_type_edit`)[0]).setAttribute(`value`, `${(document.querySelector(`.profile__name`)).textContent}`);
  (document.querySelectorAll(`.popup__item_type_edit`)[1]).setAttribute(`value`, `${(document.querySelector(`.profile__occupation`)).textContent}`);
  popupEdit.classList.toggle(`popup_opened`);
});

// --- Закрытие модального окна «Редактировать»

buttonCloseEdit.addEventListener(`click`, function() {
  popupEdit.classList.toggle(`popup_opened`);
});

// --- Сохранение обновлённой информации о профиле

buttonSaveEdit.addEventListener(`click`, function(evt) {
  (document.querySelector(`.profile__name`)).textContent = (document.querySelectorAll(`.popup__item_type_edit`)[0]).value;
  (document.querySelector(`.profile__occupation`)).textContent = (document.querySelectorAll(`.popup__item_type_edit`)[1]).value;
  popupEdit.classList.toggle(`popup_opened`);
  evt.preventDefault();
});

// --- Открытие модального окна «Добавить»

buttonOpenAdd.addEventListener(`click`, function() {
  popupAdd.classList.toggle(`popup_opened`);
});

// --- Закрытие модального окна «Добавить»

buttonCloseAdd.addEventListener(`click`, function() {
  popupAdd.classList.toggle(`popup_opened`);
});

// --- Добавить карточку в массив и отобразить на странице

buttonSaveAdd.addEventListener(`click`, function(evt) {
  initialCards.unshift({name: (document.querySelectorAll(`.popup__item_type_add`)[0]).value, link: (document.querySelectorAll(`.popup__item_type_add`)[1]).value });
  evt.preventDefault();
  renderCards(initialCards);
  popupAdd.classList.toggle(`popup_opened`);
});

// --- Попап карточки

function showUnfoldPopup(url, name) {
  const popupUnfold = document.querySelector(`.popup_unfold`);
  popupUnfold.querySelector(`.popup__photo`).setAttribute(`src`, `${url}`);
  popupUnfold.querySelector(`.popup__photo`).setAttribute(`alt`, `${name}`);
  popupUnfold.querySelector(`.popup__name`).textContent = `${name}`;
  popupUnfold.classList.toggle(`popup_opened`);
}

// --- Закрытие попапа карточки

document.querySelector(`.popup__close_type_unfold`).addEventListener(`click`, function() {
  document.querySelector(`.popup_unfold`).classList.toggle(`popup_opened`);
});