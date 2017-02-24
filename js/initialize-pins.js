'use strict';

window.initializePins = (function () {
  var appWindow = document.querySelector('.tokyo');
  var pinMap = document.querySelector('.tokyo__pin-map');
  var filtersToSelect = document.querySelector('.tokyo__filters');
  var similarApartments;
  var copiedDataArray;
  var filters = ['housing_type', 'housing_price', 'housing_room-number', 'housing_guests-number', 'wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

  // Установка обработчика событий на блок с фильтрами
  filtersToSelect.addEventListener('change', function (event) {
    sortAppartments(filters, resetCopiedArray);
  });

  // Установка начальных фильтров (кроме фильтра по цене и чекбоксов)
  var setSameFields = function (arr, field, filter) {
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

  // Начальная установка фильтра по цене
  var setSamePriceFields = function (arr, field, filter) {
    var selectField = document.querySelector('#' + filter);
    var fieldsArray = [];

    arr.forEach(function (element) {
      var value = element.offer[field];
      if (value < 10000) {
        fieldsArray.push('low');
      } else if (value < 50000) {
        fieldsArray.push('middle');
      } else {
        fieldsArray.push('hight');
      }
    });

    var elementFilter = fieldsArray.reduce(function (prev, next) {
      if (prev === next) {
        return next;
      } else {
        return 'any';
      }
    });

    selectField.value = elementFilter;
  };

  // Включение чекбоксов при начальной установке фильтров
  var setSameCheckboxFields = function (arr, filter, field) {
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

  // Начальная установка фильтров согласно общим значениям
  var setInitialFilters = function (filtersArray, data) {
    filtersArray.forEach(function (filter) {
      switch (filter) {
        case 'housing_type':
          setSameFields(data, 'type', filter);
          break;
        case 'housing_price':
          setSamePriceFields(data, 'price', filter);
          break;
        case 'housing_room-number':
          setSameFields(data, 'rooms', filter);
          break;
        case 'housing_guests-number':
          setSameFields(data, 'guests', filter);
          break;
        default:
          setSameCheckboxFields(data, filter, 'features');
          break;
      }
    });
  };

  // Сортировка объявлений по текстовым полям
  var sortArrayByTextFields = function (arr, value, field) {
    var newArr = [];
    if (field === 'any') {
      copiedDataArray = arr;
    } else {
      arr.forEach(function (element) {
        if (element.offer[value].toString() === field) {
          newArr.push(element);
        }
      });
      copiedDataArray = newArr;
    }
  };

  // Сортировка объявлений по цене
  var sortArrayByPrice = function (arr, value, field) {
    var newArr = [];
    arr.forEach(function (el) {
      if (field === 'low' && +el.offer[value] < 10000) {
        newArr.push(el);
      } else if (field === 'middle' && (+el.offer[value] > 10000 && +el.offer[value] < 50000)) {
        newArr.push(el);
      } else if (field === 'hight' && +el.offer[value] >= 50000) {
        newArr.push(el);
      } else if (field === 'any') {
        newArr.push(el);
      }
    });
    copiedDataArray = newArr;
  };

  // Сортировка объявлений по чекбоксам
  var sortArrayByCheckboxes = function (arr, value, field) {
    if (field.checked) {
      var newArr = [];
      arr.forEach(function (el) {
        if (el.offer[value].indexOf(field.value) >= 0) {
          newArr.push(el);
        }
      });
      copiedDataArray = newArr;
    }
  };

  // Очистка скопированного массива с объявлениями
  var resetCopiedArray = function () {
    copiedDataArray = similarApartments;
  };

  // Отрисовка объявлений согласно отсортированным данным
  var sortAppartments = function (filtersArray, callback) {

    filtersArray.forEach(function (filter) {
      var field = document.querySelector('#' + filter);

      switch (filter) {
        case 'housing_type':
          sortArrayByTextFields(copiedDataArray, 'type', field.value);
          break;
        case 'housing_price':
          sortArrayByPrice(copiedDataArray, 'price', field.value);
          break;
        case 'housing_room-number':
          sortArrayByTextFields(copiedDataArray, 'rooms', field.value);
          break;
        case 'housing_guests-number':
          sortArrayByTextFields(copiedDataArray, 'guests', field.value);
          break;
        default:
          sortArrayByCheckboxes(copiedDataArray, 'features', field);
      }
    });
    renderData(copiedDataArray);
    callback();
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

  // Отрисовка первых трех меток
  var renderFirstThreePins = function () {
    removePin();
    var firstThreeAds = similarApartments.slice(0, 3);
    firstThreeAds.forEach(function (ad) {
      pinMap.appendChild(window.render(ad));
    });
    setInitialFilters(filters, firstThreeAds);
  };

  // Отрисовка меток на основе отсортированных данных и закрытие открытого диалогового окна
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
