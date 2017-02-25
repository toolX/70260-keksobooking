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

  // Валидация поля title
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

  // Установка значения в поле address
  window.getAddress = function (xCoord, yCoord) {
    address.setAttribute('value', 'x: ' + xCoord + ' y: ' + yCoord);
  };

  // Массив объектов с данными для синхронизации полей
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

  // Синхронизация полей
  fieldValues.forEach(function (item) {
    window.synchronizeFields(item[0].element, item[1].element, item[0].values, item[1].values, item[0].field, function (val) {
      item[1].element.value = val;
    });

    window.synchronizeFields(item[1].element, item[0].element, item[1].values, item[0].values, item[0].field, function (val) {
      item[0].element.value = val;
    });
  });
})();
