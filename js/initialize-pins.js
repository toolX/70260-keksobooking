'use strict';

window.initializePins = (function () {
  var appWindow = document.querySelector('.tokyo');
  var pinMap = document.querySelector('.tokyo__pin-map');
  var mainPin = appWindow.querySelector('.pin__main');
  window.similarApartments = [];
  window.copiedDataArray = [];
  var PINMAIN_LEFT_EDGE = 0;
  var PINMAIN_RIGHT_EDGE = 1130;
  var PINMAIN_TOP_EDGE = 85;
  var PINMAIN_BOTTOM_EDGE = 570;

  // Установка обработчика события передвижения .pin__main по карте
  mainPin.addEventListener('mousedown', function (event) {
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

      callback(shift, mainPin, PINMAIN_TOP_EDGE, PINMAIN_BOTTOM_EDGE, PINMAIN_LEFT_EDGE, PINMAIN_RIGHT_EDGE);
    };

    var onMouseUp = function (upEvent) {
      upEvent.preventDefault();

      window.getAddress(upEvent.clientX, upEvent.clientY);

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  // Загрузка данных через ajax
  var loadData = function () {
    window.load('https://intensive-javascript-server-pedmyactpq.now.sh/keksobooking/data', function (data) {
      window.similarApartments = data;
      window.copiedDataArray = window.similarApartments;
      renderFirstThreePins();
    });
  };

  // Отрисовка первых трех меток
  var renderFirstThreePins = function () {
    removePin();
    var firstThreeAds = window.similarApartments.slice(0, 3);
    firstThreeAds.forEach(function (ad) {
      pinMap.appendChild(window.render(ad));
    });
    window.setInitialFilters(window.filters, firstThreeAds);
  };

  // Отрисовка меток на основе отсортированных данных и закрытие открытого диалогового окна
  window.renderData = function (sortedData) {
    removePin();
    window.closeDialogBox();
    sortedData.forEach(function (ad) {
      pinMap.appendChild(window.render(ad));
    });
  };

  // Отлов ошибки при загрузке данных по ajax
  window.errorHandler = function (error) {
    pinMap.innerHTML = error;
  };

  // Удаление метки с классом .pin--active
  window.removeActivePin = function () {
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
    [].forEach.call(pin, function (element) {
      if (element !== activePin) {
        element.remove();
      }
    });
  };

  // Установка метке класса .pin--active
  var setActivePin = function (element) {
    window.removeActivePin();
    element.classList.add('pin--active');
    element.setAttribute('aria-pressed', true);
  };

  // Установка фокуса на активную метку
  window.focusPin = function () {
    var activePin = document.querySelector('.pin--active');
    activePin.focus();
  };

  // Поиск метки, на которой произошло событие клика или нажатия клавиши enter
  var pinHandler = function (event) {
    var pin = event.target;

    while (pin !== appWindow) {
      if (pin.classList.contains('pin') && !pin.classList.contains('pin__main')) {
        window.showCard(pin, pin.data, setActivePin);
        document.addEventListener('keydown', window.utils.escapeKeydownHandler);
        return;
      }
      pin = pin.parentNode;
    }
  };

  // Добавление обработчика события клика на карту
  appWindow.addEventListener('click', pinHandler);

  // Добавление обработчика события нажатия клавиши на карту
  appWindow.addEventListener('keydown', function (event) {
    if (window.utils.isEnterPressed(event)) {
      pinHandler(event);
    }
  });

  // Вызов функции загрузки данных по ajax
  loadData();

  // Вызов функции удаления всех меток, кроме метки с классом .pin__main
  removePin();
})();
