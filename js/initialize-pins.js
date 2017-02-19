'use strict';

window.initializePins = (function () {
  var appWindow = document.querySelector('.tokyo');
  var dialogBox = document.querySelector('.dialog');
  var dialogBoxClose = dialogBox.querySelector('.dialog__close');
  var pinMap = document.querySelector('.tokyo__pin-map');
  var similarApartments;
  var ESCAPE_KEY_CODE = 27;
  var ENTER_KEY_CODE = 13;

  // Загрузка данных через ajax
  var loadData = function () {
    window.load('https://intensive-javascript-server-pedmyactpq.now.sh/keksobooking/data', function (data) {
      similarApartments = data;
      renderData();
    });
    return similarApartments;
  };

  // Отрисовка первых трех меток
  var renderData = function () {
    var firstThreeAds = similarApartments.slice(0, 3);
    firstThreeAds.forEach(function (ad) {
      pinMap.appendChild(window.render(ad));
    });
  };

  // Отлов ошибки при загрузке данных по ajax
  window.errorHandler = function (err) {
    pinMap.innerHTML = err;
  };

  // Проверка нажатия клавиши enter
  var isEnterPressed = function (event) {
    return event.keyCode === ENTER_KEY_CODE;
  };

  // Проверка нажатия клавиши escape
  var isEscapePressed = function (event) {
    return event.keyCode === ESCAPE_KEY_CODE;
  };

  // Закрытие диалогового окна при нажатии клавиши escape
  var escapeKeydownHandler = function (event) {
    if (isEscapePressed(event)) {
      closeDialogBox();
    }
  };

  // Удаление метки с классом .pin--active
  var removeActivePin = function () {
    var activePin = document.querySelector('.pin--active');
    if (activePin) {
      activePin.classList.remove('pin--active');
      activePin.setAttribute('aria-pressed', false);
    }
  };

  // Удаление всех меток, кроме метки с классом .pin__main
  var removePin = function () {
    var pin = document.querySelectorAll('.pin');
    var activePin = document.querySelector('.pin__main');
    [].forEach.call(pin, function (el) {
      if (el !== activePin) {
        el.remove();
      }
    });
  };

  // Установка метке класса .pin--active
  var setActivePin = function (elem) {
    removeActivePin();
    elem.classList.add('pin--active');
    elem.setAttribute('aria-pressed', true);
  };

  // Установка фокуса на активную метку
  var focusPin = function () {
    var activePin = document.querySelector('.pin--active');
    activePin.focus();
  };

  // Поиск метки, на которой произошло событие клика или нажатия клавиши enter
  var findPin = function (event) {
    var pin = event.target;

    while (pin !== appWindow) {
      if (pin.classList.contains('pin')) {
        window.showCard(pin, pin.data, setActivePin);
        document.addEventListener('keydown', escapeKeydownHandler);
        return;
      }
      pin = pin.parentNode;
    }
  };

  // Добавление обработчика события клика на карту
  appWindow.addEventListener('click', findPin);

  // Добавление обработчика события нажатия клавиши на карту
  appWindow.addEventListener('keydown', function (event) {
    if (isEnterPressed(event)) {
      findPin(event);
    }
  });

  // Закрытие диалогового окна
  var closeDialogBox = function (event, callback) {
    dialogBox.classList.add('hidden');
    document.removeEventListener('keydown', escapeKeydownHandler);
    if (typeof callback === 'function') {
      callback();
    }
    removeActivePin();
  };

  // Закрытие диалогового окна по клику
  dialogBoxClose.addEventListener('click', function (event) {
    event.preventDefault();
    closeDialogBox(event);
  });

  // Закрытие диалогового окна по нажатию на клавишу
  dialogBoxClose.addEventListener('keydown', function (event) {
    event.preventDefault();
    if (isEnterPressed(event)) {
      closeDialogBox(event, focusPin);
    }
  });

  // Вызов функции загрузки данных по ajax
  loadData();

  // Вызов функции удаления всех меток, кроме метки с классом .pin__main
  removePin();
})();
