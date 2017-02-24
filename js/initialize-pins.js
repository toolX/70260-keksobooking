'use strict';

window.initializePins = (function () {
  var appWindow = document.querySelector('.tokyo');
  var pinMap = document.querySelector('.tokyo__pin-map');
  // var filters = document.querySelector('.tokyo__filters');
  var similarApartments;
  var copiedDataArray;
  var filters = ['housing_type', 'housing_price', 'housing_room-number', 'housing_guests-number', 'wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

  // // Получение значения атрибута value из полей фильтров
  // filters.addEventListener('change', function (event) {
  //   // createObject(event.target, event.target.id, event.target.value);
  //   // switchId(event.target, event.target.id, event.target.value);
  //   // currentElement = event.target;
  // });

  // Получение одинаковых полей или поля any для установки начальных фильтров
  var getSameFields = function (arr, field, filter) {
    var selectField = document.querySelector('#' + filter);
    var fieldsArray = [];

    arr.forEach(function (e) {
      fieldsArray.push(e.offer[field]);
    });
    var b = function (e) {
      return e === fieldsArray[0];
    };
    if (fieldsArray.every(b)) {

      selectField.value = fieldsArray[0];
    } else {
      selectField.value = 'any';
    }
  };

  var getSamePriceFields = function (arr) {
    var fieldsArray = [];

    arr.forEach(function (element) {
      var filter = element.offer.price;
      if (filter < 10000) {
        fieldsArray.push('low');
      } else if (filter < 50000) {
        fieldsArray.push('middle');
      } else {
        fieldsArray.push('hight');
      }
    });

    var filter = fieldsArray.reduce(function (prev, next) {
      if (prev === next) {
        return next;
      } else {
        return 'any';
      }
    });
    return filter;
  };

  var getSameCheckboxFields = function (arr, filter, field) {
    var checkbox = document.querySelector('#' + filter);

    var areElementsEqual = function (element) {
      var value = element.offer[field];
      return value.indexOf(filter) >= 0;
    };
    if (arr.every(areElementsEqual)) {
      checkbox.checked = true;
    } else {
      checkbox.checked = false;
    }
  };

  var setInitialFilters = function (filtersArray, data) {
    filtersArray.forEach(function (filter) {
      var fieldToSelect = document.querySelector('#' + filter);

      switch (filter) {
        case 'housing_type':
          getSameFields(data, 'type', filter);
          break;
        case 'housing_price':
          fieldToSelect.value = getSamePriceFields(data, 'price');
          break;
        case 'housing_room-number':
          getSameFields(data, 'rooms', filter);
          break;
        case 'housing_guests-number':
          getSameFields(data, 'guests', filter);
          break;
        default:
          getSameCheckboxFields(data, filter, 'features');
          break;
      }
    });
  };

  // // Выбор ключа объекта
  // var switchId = function (element, id, filter) {
  //
  //   switch (id) {
  //     case 'housing_type':
  //       sortByHousingType('type', filter, similarApartments);
  //       break;
  //     case 'housing_price':
  //       sortByHousingPrice('price', filter, copiedDataArray);
  //       break;
  //     case 'housing_room-number':
  //       sortByNumber('rooms', filter, copiedDataArray);
  //       break;
  //     case 'housing_guests-number':
  //       sortByNumber('guests', filter, copiedDataArray);
  //       break;
  //     default:
  //       sortByFeatures(element, 'features', filter, copiedDataArray);
  //   }
  // };

  // Загрузка данных через ajax
  var loadData = function () {
    window.load('https://intensive-javascript-server-pedmyactpq.now.sh/keksobooking/data', function (data) {
      similarApartments = data;
      copiedDataArray = similarApartments;
      renderFirstThreePins();
    });
    return similarApartments;
  };

  // Отрисовка первых трех меток
  var renderFirstThreePins = function () {
    removePin();
    var firstThreeAds = similarApartments.slice(0, 3);
    firstThreeAds.forEach(function (ad) {
      pinMap.appendChild(window.render(ad));
    });
    setInitialFilters(filters, firstThreeAds);
  };

  // Отрисовка меток на основе объекта отсортированных данных и закрытие открытого диалогового окна
  var renderData = function (sortedData) {
    removePin();
    window.closeDialogBox();
    sortedData.forEach(function (ad) {
      pinMap.appendChild(window.render(ad));
    });
  };

  // Отлов ошибки при загрузке данных по ajax
  window.errorHandler = function (err) {
    pinMap.innerHTML = err;
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
    [].forEach.call(pin, function (el) {
      if (el !== activePin) {
        el.remove();
      }
    });
  };

  // Установка метке класса .pin--active
  var setActivePin = function (elem) {
    window.removeActivePin();
    elem.classList.add('pin--active');
    elem.setAttribute('aria-pressed', true);
  };

  // Установка фокуса на активную метку
  window.focusPin = function () {
    var activePin = document.querySelector('.pin--active');
    activePin.focus();
  };

  // Поиск метки, на которой произошло событие клика или нажатия клавиши enter
  var findPin = function (event) {
    var pin = event.target;

    while (pin !== appWindow) {
      if (pin.classList.contains('pin')) {
        window.showCard(pin, pin.data, setActivePin);
        document.addEventListener('keydown', window.utils.escapeKeydownHandler);
        return;
      }
      pin = pin.parentNode;
    }
  };

  // Добавление обработчика события клика на карту
  appWindow.addEventListener('click', findPin);

  // Добавление обработчика события нажатия клавиши на карту
  appWindow.addEventListener('keydown', function (event) {
    if (window.utils.isEnterPressed(event)) {
      findPin(event);
    }
  });

  // Вызов функции загрузки данных по ajax
  loadData();

  // Вызов функции удаления всех меток, кроме метки с классом .pin__main
  removePin();
})();
