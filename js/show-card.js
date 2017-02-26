'use strict';

(function () {
  var dialogBox = document.querySelector('.dialog');
  var title = dialogBox.querySelector('#dialogTitle');
  var image = dialogBox.querySelector('.dialog__title img');
  var address = dialogBox.querySelector('.lodge__address');
  var price = dialogBox.querySelector('.lodge__price');
  var type = dialogBox.querySelector('.lodge__type');
  var roomsGuests = dialogBox.querySelector('.lodge__rooms-and-guests');
  var checkin = dialogBox.querySelector('.lodge__checkin-time');
  var features = dialogBox.querySelectorAll('.feature__image');
  var dialogDescription = dialogBox.querySelector('#dialogDescription');
  var photosBox = dialogBox.querySelector('.lodge__photos');
  var photos = photosBox.children;
  var dialogBoxHandler = dialogBox.querySelector('.dialog__title img');
  var dialogBoxClose = dialogBox.querySelector('.dialog__close');
  var DIALOGBOX_LEFT_EDGE = 0;
  var DIALOGBOX_RIGHT_EDGE = 970;
  var DIALOGBOX_TOP_EDGE = 75;
  var DIALOGBOX_BOTTOM_EDGE = 585;

  // Установка обработчика события передвижения диалогового окна по карте
  dialogBoxHandler.addEventListener('mousedown', function (event) {
    event.preventDefault();

    var startCoords = {
      x: event.clientX,
      y: event.clientY
    };

    var onMouseMove = function (evt) {
      mouseMove(evt, window.move);
    };

    var mouseMove = function (moveEvent, callback) {
      moveEvent.preventDefault();

      var shift = {
        x: startCoords.x - moveEvent.clientX,
        y: startCoords.y - moveEvent.clientY
      };

      startCoords = {
        x: moveEvent.clientX,
        y: moveEvent.clientY
      };

      callback(shift, dialogBox, DIALOGBOX_TOP_EDGE, DIALOGBOX_BOTTOM_EDGE, DIALOGBOX_LEFT_EDGE, DIALOGBOX_RIGHT_EDGE);
    };

    var onMouseUp = function (upEvent) {
      upEvent.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  // Перевод английского варианта типа помещения на русский
  var switchType = function (lodgeType) {
    var newType = '';
    switch (lodgeType) {
      case 'flat':
        newType = 'Квартира';
        break;
      case 'bungalo':
        newType = 'Бунгало';
        break;
      case 'house':
        newType = 'Дворец';
        break;
    }
    return newType;
  };

  // Отображение в диалоговом окне только доступных свойств
  var setFeatures = function (arr1, arr2, callback) {
    callback(arr1);
    [].forEach.call(arr1, function (element) {
      var elClass = element.classList[1].split('--');
      if (elClass && arr2.indexOf(elClass[1]) >= 0) {
        element.style.display = 'inline';
      } else {
        element.style.display = 'none';
      }
    });
  };

  // Очистка всех установленных свойств в диалоговом окне
  var removeFeatures = function (dialogBoxFeatures) {
    [].forEach.call(features, function (element) {
      if (element.style.display === 'none') {
        element.style.display = 'inline';
      }
    });
  };

  // Отображение фотографий
  var setPhoto = function (container, pictures) {
    [].forEach.call(container, function (element, index) {
      if (pictures[index]) {
        element.src = pictures[index];
      }
    });
  };

  // Функция показа диалогового окна с добавлением всех данных
  window.showCard = function (element, data, callback) {
    title.innerHTML = data.offer.title;
    image.src = data.author.avatar;
    address.innerHTML = data.offer.address;
    price.innerHTML = data.offer.price + '&#x20bd;/ночь';
    type.innerHTML = switchType(data.offer.type);
    roomsGuests.innerHTML = data.offer.rooms + ' комнаты для ' + data.offer.guests + ' гостей';
    checkin.innerHTML = 'Заезд после ' + data.offer.checkin + ', выезд после ' + data.offer.checkout;
    setFeatures(features, data.offer.features, removeFeatures);
    setPhoto(photos, data.offer.photos);
    dialogDescription.innerHTML = data.offer.description;

    if (dialogBox.classList.contains('hidden')) {
      dialogBox.classList.remove('hidden');
    }
    callback(element);
  };

  // Закрытие диалогового окна
  window.closeDialogBox = function (event, callback) {
    if (!dialogBox.classList.contains('hidden')) {
      dialogBox.classList.add('hidden');
      document.removeEventListener('keydown', window.utils.escapeKeydownHandler);
      if (typeof callback === 'function') {
        callback();
      }
      window.removeActivePin();
    }
  };

  // Закрытие диалогового окна по клику
  dialogBoxClose.addEventListener('click', function (event) {
    event.preventDefault();
    window.closeDialogBox(event);
  });

  // Закрытие диалогового окна по нажатию на клавишу
  dialogBoxClose.addEventListener('keydown', function (event) {
    event.preventDefault();
    if (window.utils.isEnterPressed(event)) {
      window.closeDialogBox(event, window.focusPin);
    }
  });
})();
