'use strict';

var pin = document.querySelectorAll('.pin');
var dialogBox = document.querySelector('.dialog');
var dialogBoxClose = dialogBox.querySelector('.dialog__close');
var form = document.querySelector('.notice__form');
var time = form.querySelector('#time');
var timeout = form.querySelector('#timeout');
var type = form.querySelector('#type');
var price = form.querySelector('#price');
var roomNumber = form.querySelector('#room_number');
var capacity = form.querySelector('#capacity');

var removeActivePin = function (elem) {
  for (var i = 0; i < elem.length; i++) {
    if (elem[i].classList.contains('pin--active')) {
      elem[i].classList.remove('pin--active');
    }
  }
  return;
};

var roomCapacity = function () {
  if (roomNumber.selectedIndex === 0) {
    capacity.selectedIndex = 1;
  } else {
    capacity.selectedIndex = 0;
  }
};

for (var i = 0; i < pin.length; i++) {
  pin[i].addEventListener('click', function () {
    removeActivePin(pin);
    this.classList.add('pin--active');
    if (dialogBox.classList.contains('hidden')) {
      dialogBox.classList.remove('hidden');
    }
  });
}

dialogBoxClose.addEventListener('click', function (event) {
  event.preventDefault();
  dialogBox.classList.add('hidden');
  removeActivePin(pin);
});

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

roomNumber.addEventListener('change', roomCapacity);

removeActivePin(pin);

roomCapacity();
