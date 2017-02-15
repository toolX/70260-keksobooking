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

  var fieldValues = [
    [
      {
        element: time,
        values: ['12', '13', '14'],
        field: 'value'
      },
      {
        element: timeout,
        values: ['12', '13', '14'],
        field: 'value'
      }
    ],
    [
      {
        element: roomNumber,
        values: ['1', '2', '100'],
        field: 'value'
      },
      {
        element: capacity,
        values: ['0', '3', '3'],
        field: 'value'
      }
    ],
    [
      {
        element: type,
        values: ['flat', 'shack', 'palace'],
        field: 'placeholder'
      },
      {
        element: price,
        values: ['1000', '0', '10000'],
        field: 'placeholder'
      }
    ],
    [
      {
        element: type,
        values: ['flat', 'shack', 'palace'],
        field: 'min'
      },
      {
        element: price,
        values: ['1000', '0', '10000'],
        field: 'min'
      }
    ]
  ];

  fieldValues.forEach(function (item) {
    window.synchronizeFields(item[0].element, item[1].element, item[0].values, item[1].values, item[0].field, function (val) {
      item[1].element.value = val;
    });
  });

  fieldValues.forEach(function (item) {
    window.synchronizeFields(item[1].element, item[0].element, item[1].values, item[0].values, item[0].field, function (val) {
      item[0].element.value = val;
    });
  });
})();
