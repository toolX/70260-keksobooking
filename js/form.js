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

  window.synchronizeFields(time, timeout, ['12', '13', '14'], ['12', '13', '14'], 'value');

  window.synchronizeFields(roomNumber, capacity, ['1', '2', '100'], ['0', '3', '3'], 'value');

  window.synchronizeFields(type, price, ['flat', 'shack', 'palace'], ['1000', '0', '10000'], 'placeholder');

  window.synchronizeFields(type, price, ['flat', 'shack', 'palace'], ['1000', '0', '10000'], 'min');
})();
