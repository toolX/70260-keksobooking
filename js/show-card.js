'use strict';

(function () {
  var dialogBox = document.querySelector('.dialog');
  var dialogBoxClose = dialogBox.querySelector('.dialog__close');

  var switchType = function (lodgeType) {
    var type = '';
    switch (lodgeType) {
      case 'flat':
        type = 'Квартира';
        break;
      case 'bungalo':
        type = 'Бунгало';
        break;
      case 'house':
        type = 'Дворец';
        break;
    }
    return type;
  };

  var setFeatures = function (arr1, arr2, callback) {
    callback(arr1);
    [].forEach.call(arr1, function (el, i) {
      var elClass = el.classList[1].split('--');
      if (elClass && arr2.indexOf(elClass[1]) >= 0) {
        el.style.display = 'inline';
      } else {
        el.style.display = 'none';
      }
    });
  };

  var removeFeatures = function (features) {
    [].forEach.call(features, function (el) {
      if (el.style.display === 'none') {
        el.style.display = 'inline';
      }
    });
  };

  var setPhoto = function (container, photos) {
    [].forEach.call(container, function (el, i) {
      if (photos[i]) {
        el.src = photos[i];
      }
    });
  };

  window.showCard = function (elem, data, callback) {
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
    callback(elem);
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
