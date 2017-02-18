'use strict';

window.initializePins = (function () {
  var appWindow = document.querySelector('.tokyo');
  var dialogBox = document.querySelector('.dialog');
  var dialogBoxClose = dialogBox.querySelector('.dialog__close');
  var pinMap = document.querySelector('.tokyo__pin-map');
  var similarApartments;
  var ESCAPE_KEY_CODE = 27;
  var ENTER_KEY_CODE = 13;

  var loadData = function () {
    window.load('https://intensive-javascript-server-pedmyactpq.now.sh/keksobooking/data', function (data) {
      similarApartments = data;
      renderData();
    });
    return similarApartments;
  };

  loadData();

  var renderData = function () {
    // var adsArray = similarApartments.slice(0, 3);
    similarApartments.forEach(function (ad) {
      pinMap.appendChild(window.render(ad));
    });
  };

  window.errorHandler = function (err) {
    pinMap.innerHTML = err;
  };

  var isEnterPressed = function (event) {
    return event.keyCode === ENTER_KEY_CODE;
  };

  var isEscapePressed = function (event) {
    return event.keyCode === ESCAPE_KEY_CODE;
  };

  var escapeKeydownHandler = function (event) {
    if (isEscapePressed(event)) {
      closeDialogBox();
    }
  };

  var removeActivePin = function () {
    var activePin = document.querySelector('.pin--active');
    if (activePin) {
      activePin.classList.remove('pin--active');
      activePin.setAttribute('aria-pressed', false);
    }
  };

  var setActivePin = function (elem) {
    removeActivePin();
    elem.classList.add('pin--active');
    elem.setAttribute('aria-pressed', true);
  };

  var focusPin = function () {
    var activePin = document.querySelector('.pin--active');
    activePin.focus();
  };

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

  appWindow.addEventListener('click', findPin);

  appWindow.addEventListener('keydown', function (event) {
    if (isEnterPressed(event)) {
      findPin(event);
    }
  });

  var closeDialogBox = function (event, callback) {
    dialogBox.classList.add('hidden');
    document.removeEventListener('keydown', escapeKeydownHandler);
    if (typeof callback === 'function') {
      callback();
    }
    removeActivePin();
  };

  dialogBoxClose.addEventListener('click', function (event) {
    event.preventDefault();
    closeDialogBox(event);
  });

  dialogBoxClose.addEventListener('keydown', function (event) {
    event.preventDefault();
    if (isEnterPressed(event)) {
      closeDialogBox(event, focusPin);
    }
  });

  removeActivePin();
})();
