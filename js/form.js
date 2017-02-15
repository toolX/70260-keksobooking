'use strict';

(function () {
  var form = document.querySelector('.notice__form');
  var title = form.querySelector('#title');
  var address = form.querySelector('#address');
  var time = form.querySelector('#time');
  var timeout = form.querySelector('#timeout');
  var type = form.querySelector('#type');
  var price = form.querySelector('#price');
  var roomNumber = form.querySelector('#room_number');
  var capacity = form.querySelector('#capacity');

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

  var fieldValues = {
    time: ['12', '13', '14'],
    timeout: ['12', '13', '14'],
    roomNumber: ['1', '2', '100'],
    capacity: ['0', '3', '3'],
    type: ['flat', 'shack', 'palace'],
    price: ['1000', '0', '10000']
  };

  window.synchronizeFields(time, timeout, fieldValues.time, fieldValues.timeout, 'value', function (val) {
    timeout.value = val;
  });

  window.synchronizeFields(timeout, time, fieldValues.timeout, fieldValues.time, 'value', function (val) {
    time.value = val;
  });

  window.synchronizeFields(roomNumber, capacity, fieldValues.roomNumber, fieldValues.capacity, 'value', function (val) {
    capacity.value = val;
  });

  window.synchronizeFields(capacity, roomNumber, fieldValues.capacity, fieldValues.roomNumber, 'value', function (val) {
    roomNumber.value = val;
  });

  window.synchronizeFields(type, price, fieldValues.type, fieldValues.price, 'placeholder', function (val) {
    price.value = val;
  });

  window.synchronizeFields(price, type, fieldValues.price, fieldValues.type, 'placeholder', function (val) {
    type.value = val;
  });

  window.synchronizeFields(type, price, fieldValues.type, fieldValues.price, 'min', function (val) {
    price.value = val;
  });

  window.synchronizeFields(price, type, fieldValues.price, fieldValues.type, 'min', function (val) {
    type.value = val;
  });
})();
