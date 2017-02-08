'use strict';

window.initializePins = function () {
  var appWindow = document.querySelector('.tokyo');
  var dialogBox = document.querySelector('.dialog');
  var dialogBoxClose = dialogBox.querySelector('.dialog__close');
  var ESCAPE_KEY_CODE = 27;
  var ENTER_KEY_CODE = 13;

  var isEnterPressed = function (event) {
    return event.keyCode === ENTER_KEY_CODE;
  };

  var isEscapePressed = function (event) {
    return event.keyCode === ESCAPE_KEY_CODE;
  };

  var escapeKeydowHandler = function (event) {
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

  var findPin = function (event) {
    var pin = event.target;

    while (pin !== appWindow) {
      if (pin.classList.contains('pin')) {
        showDialogBox(pin);
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

  var showDialogBox = function (elem) {
    removeActivePin();
    elem.classList.add('pin--active');
    elem.setAttribute('aria-pressed', true);
    if (dialogBox.classList.contains('hidden')) {
      dialogBox.classList.remove('hidden');
    }
    document.addEventListener('keydown', escapeKeydowHandler);
  };

  var closeDialogBox = function (event) {
    dialogBox.classList.add('hidden');
    removeActivePin();
    document.removeEventListener('keydown', escapeKeydowHandler);
  };

  dialogBoxClose.addEventListener('click', function (event) {
    event.preventDefault();
    closeDialogBox(event);
  });

  dialogBoxClose.addEventListener('keydown', function (event) {
    event.preventDefault();
    if (isEnterPressed(event)) {
      closeDialogBox(event);
    }
  });

  removeActivePin();
};
