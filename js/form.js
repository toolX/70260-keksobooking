'use strict';

var appWindow = document.querySelector('.tokyo');
var dialogBox = document.querySelector('.dialog');
var dialogBoxClose = dialogBox.querySelector('.dialog__close');
var form = document.querySelector('.notice__form');
var title = form.querySelector('#title');
var address = form.querySelector('#address');
var time = form.querySelector('#time');
var timeout = form.querySelector('#timeout');
var type = form.querySelector('#type');
var price = form.querySelector('#price');
var roomNumber = form.querySelector('#room_number');
var capacity = form.querySelector('#capacity');
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

var roomCapacityCheck = function () {
  if (roomNumber.selectedIndex === 0) {
    capacity.selectedIndex = 1;
  } else {
    capacity.selectedIndex = 0;
  }
};

var capacityCheck = function () {
  if (capacity.selectedIndex === 0) {
    roomNumber.selectedIndex = 1;
  } else {
    roomNumber.selectedIndex = 0;
  }
};

time.addEventListener('change', function () {
  timeout.selectedIndex = time.selectedIndex;
});

timeout.addEventListener('change', function () {
  time.selectedIndex = timeout.selectedIndex;
});

type.addEventListener('change', function () {
  if (type.selectedIndex === 0) {
    price.min = 1000;
    price.placeholder = 1000;
  } else if (type.selectedIndex === 1) {
    price.min = 0;
    price.placeholder = 0;
  } else {
    price.min = 10000;
    price.placeholder = 10000;
  }
});

roomNumber.addEventListener('change', roomCapacityCheck);

capacity.addEventListener('change', capacityCheck);

title.addEventListener('keyup', function () {
  var message = form.querySelector('.title-message');
  if (!title.validity.valid) {
    message.classList.add('invalid');
    message.classList.remove('valid');
    title.classList.add('invalid-input');
    title.classList.remove('valid-input');
  } else {
    message.classList.remove('invalid');
    message.classList.add('valid');
    title.classList.remove('invalid-input');
    title.classList.add('valid-input');
  }
});

address.addEventListener('keyup', function () {
  var message = form.querySelector('.address-message');
  if (!address.validity.valid) {
    message.classList.add('invalid');
    message.classList.remove('valid');
    address.classList.add('invalid-input');
    address.classList.remove('valid-input');
  } else {
    message.classList.remove('invalid');
    message.classList.add('valid');
    address.classList.remove('invalid-input');
    address.classList.add('valid-input');
  }
});

removeActivePin();

roomCapacityCheck();
