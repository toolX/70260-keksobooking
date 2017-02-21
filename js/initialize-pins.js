'use strict';

window.initializePins = (function () {
  var appWindow = document.querySelector('.tokyo');
  var dialogBox = document.querySelector('.dialog');
  var dialogBoxClose = dialogBox.querySelector('.dialog__close');
  var pinMap = document.querySelector('.tokyo__pin-map');
  var filters = document.querySelector('.tokyo__filters');
  var similarApartments;
  var copiedDataArray = [];
  // var currentElement = null;
  var query = [];
  var ESCAPE_KEY_CODE = 27;
  var ENTER_KEY_CODE = 13;

  // Получение значения атрибута value из полей фильтров
  filters.addEventListener('change', function (event) {
    createObject(event.target, event.target.id, event.target.value);
    // switchId(event.target, event.target.id, event.target.value);
    // currentElement = event.target;
  });

  // Сортировка массива similarApartments на основе фильтра housing_type
  var sortByHousingType = function (field, filter, array) {
    var sortedArray = [];

    if (filter === 'any') {
      sortedArray = similarApartments;
    } else {
      similarApartments.forEach(function (el) {
        if (el.offer[field] === filter) {
          sortedArray.push(el);
        }
      });
    }
    copiedDataArray = sortedArray;
    renderData(sortedArray);
  };

  // Сортировка массива similarApartments на основе фильтра housing_price
  var sortByHousingPrice = function (field, filter, array) {
    var sortedArray = [];

    array.forEach(function (el) {
      if (filter === 'low' && +el.offer.price < 10000) {
        sortedArray.push(el);
      } else if (filter === 'middle' && (+el.offer.price > 10000 && +el.offer.price < 50000)) {
        sortedArray.push(el);
      } else if (filter === 'hight' && +el.offer.price >= 50000) {
        sortedArray.push(el);
      }
    });
    // copiedDataArray = sortedArray;
    renderData(sortedArray);
  };

  // Сортировка массива similarApartments на основе фильтров housing_rooms_number и housing_guests_number
  var sortByNumber = function (objKey, filter, array) {
    var sortedArray = [];

    if (filter === 'any') {
      sortedArray = array;
    } else {
      array.forEach(function (el) {
        if (el.offer[objKey] === +filter) {
          sortedArray.push(el);
        }
      });
    }
    // copiedDataArray = sortedArray;
    renderData(sortedArray);
  };

  // Сортировка массива similarApartments на основе фильтра feature
  var sortByFeatures = function (element, objKey, filter, array) {
    var sortedArray = [];
    var duplicateArray = array;

    if (element.checked) {
      array.forEach(function (el) {
        if (el.offer[objKey].indexOf(filter) >= 0) {
          sortedArray.push(el);
        }
      });
      copiedDataArray = sortedArray;
      renderData(sortedArray);
    } else {
      sortedArray = copiedDataArray = duplicateArray;
      renderData(sortedArray);
    }
  };

  var createObject = function (element, id, filter) {
    // var queryObj = {};
    var str = '';
    if (!id) {
      str = 'features: ' + filter;
      // queryObj.features = [];
      // queryObj.features.push(filter);
      // if (queryObj.features.indexOf(filter) >= 0) {
      //   queryObj.features.splice(queryObj.features.indexOf(filter), 1);
      // }
      if (query.indexOf(filter) >= 0) {
        query.splice(query.indexOf(filter), 1);
      } else {
        query.push(str);
      }
    } else {
      str = id + ': ' + filter;
      query.push(str);
    }
    // else if (!id && queryObj.features.indexOf(filter) >= 0) {
    //   queryObj.features.splice(queryObj.features.indexOf(filter), 1);
    // } else if (!id && queryObj.features.indexOf(filter) < 0) {
    //   queryObj.features.push(filter);
    // }
    query.forEach(function (el) {
      var newElement = el.split(':');
      switchId(element, newElement[0], newElement[1].trim());
    });
    // for (var key in query) {
    //   switchId(element, key, query[key]);
    // }
  };

  // Выбор ключа объекта
  var switchId = function (element, id, filter) {

    switch (id) {
      case 'housing_type':
        sortByHousingType('type', filter, copiedDataArray);
        break;
      case 'housing_price':
        sortByHousingPrice('price', filter, copiedDataArray);
        break;
      case 'housing_room-number':
        sortByNumber('rooms', filter, copiedDataArray);
        break;
      case 'housing_guests-number':
        sortByNumber('guests', filter, copiedDataArray);
        break;
      default:
        sortByFeatures(element, 'features', filter, copiedDataArray);
    }
  };

  // Загрузка данных через ajax
  var loadData = function () {
    window.load('https://intensive-javascript-server-pedmyactpq.now.sh/keksobooking/data', function (data) {
      similarApartments = data;
      copiedDataArray = similarApartments;
      renderFirstThreePins();
    });
    return similarApartments;
  };

  // // Создание массива на основе фильтров
  // var createFilteredArray = function (data, filtersObj) {
  //   var array = [];
  //
  //   data.forEach(function (el) {
  //     for (var key in filtersObj) {
  //       var field = key;
  //       var value = filtersObj[key];
  //       // if (el.offer[field] && el.offer[field].value) {
  //       //   array.push(el);
  //       // }
  //     }
  //   });
  //   console.log(array);
  // };

  // Отрисовка первых трех меток
  var renderFirstThreePins = function () {
    removePin();
    var firstThreeAds = similarApartments.slice(0, 3);
    firstThreeAds.forEach(function (ad) {
      pinMap.appendChild(window.render(ad));
    });
  };

  // Отрисовка меток на основе объекта отсортированных данных и закрытие открытого диалогового окна
  var renderData = function (sortedData) {
    removePin();
    if (!dialogBox.classList.contains('hidden')) {
      closeDialogBox();
    }
    sortedData.forEach(function (ad) {
      pinMap.appendChild(window.render(ad));
    });
  };

  // Отлов ошибки при загрузке данных по ajax
  window.errorHandler = function (err) {
    pinMap.innerHTML = err;
  };

  // Проверка нажатия клавиши enter
  var isEnterPressed = function (event) {
    return event.keyCode === ENTER_KEY_CODE;
  };

  // Проверка нажатия клавиши escape
  var isEscapePressed = function (event) {
    return event.keyCode === ESCAPE_KEY_CODE;
  };

  // Закрытие диалогового окна при нажатии клавиши escape
  var escapeKeydownHandler = function (event) {
    if (isEscapePressed(event)) {
      closeDialogBox();
    }
  };

  // Удаление метки с классом .pin--active
  var removeActivePin = function () {
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
    removeActivePin();
    elem.classList.add('pin--active');
    elem.setAttribute('aria-pressed', true);
  };

  // Установка фокуса на активную метку
  var focusPin = function () {
    var activePin = document.querySelector('.pin--active');
    activePin.focus();
  };

  // Поиск метки, на которой произошло событие клика или нажатия клавиши enter
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

  // Добавление обработчика события клика на карту
  appWindow.addEventListener('click', findPin);

  // Добавление обработчика события нажатия клавиши на карту
  appWindow.addEventListener('keydown', function (event) {
    if (isEnterPressed(event)) {
      findPin(event);
    }
  });

  // Закрытие диалогового окна
  var closeDialogBox = function (event, callback) {
    dialogBox.classList.add('hidden');
    document.removeEventListener('keydown', escapeKeydownHandler);
    if (typeof callback === 'function') {
      callback();
    }
    removeActivePin();
  };

  // Закрытие диалогового окна по клику
  dialogBoxClose.addEventListener('click', function (event) {
    event.preventDefault();
    closeDialogBox(event);
  });

  // Закрытие диалогового окна по нажатию на клавишу
  dialogBoxClose.addEventListener('keydown', function (event) {
    event.preventDefault();
    if (isEnterPressed(event)) {
      closeDialogBox(event, focusPin);
    }
  });

  // Вызов функции загрузки данных по ajax
  loadData();

  // Вызов функции удаления всех меток, кроме метки с классом .pin__main
  removePin();
})();
