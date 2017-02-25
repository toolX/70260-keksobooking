'use strict';

(function () {
  var filtersToSelect = document.querySelector('.tokyo__filters');
  window.filters = ['housing_type', 'housing_price', 'housing_room-number', 'housing_guests-number', 'wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

  // Установка обработчика событий на блок с фильтрами
  filtersToSelect.addEventListener('change', function (event) {
    sortAppartments(window.filters, resetCopiedArray);
  });

  // Установка начальных фильтров (кроме фильтра по цене и чекбоксов)
  var setSameFields = function (arr, field, filter) {
    var selectField = document.querySelector('#' + filter);
    var fieldsArray = [];

    arr.forEach(function (element) {
      fieldsArray.push(element.offer[field]);
    });

    var compareFields = function (element) {
      return element === fieldsArray[0];
    };

    if (fieldsArray.every(compareFields)) {
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
  window.setInitialFilters = function (filtersArray, data) {
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
      window.copiedDataArray = arr;
    } else {
      arr.forEach(function (element) {
        if (element.offer[value].toString() === field) {
          newArr.push(element);
        }
      });

      window.copiedDataArray = newArr;
    }
  };

  // Сортировка объявлений по цене
  var sortArrayByPrice = function (arr, value, field) {
    var newArr = [];
    arr.forEach(function (element) {
      if (field === 'low' && +element.offer[value] < 10000) {
        newArr.push(element);
      } else if (field === 'middle' && (+element.offer[value] > 10000 && +element.offer[value] < 50000)) {
        newArr.push(element);
      } else if (field === 'hight' && +element.offer[value] >= 50000) {
        newArr.push(element);
      } else if (field === 'any') {
        newArr.push(element);
      }
    });

    window.copiedDataArray = newArr;
  };

  // Сортировка объявлений по чекбоксам
  var sortArrayByCheckboxes = function (arr, value, field) {
    if (field.checked) {
      var newArr = [];
      arr.forEach(function (element) {
        if (element.offer[value].indexOf(field.value) >= 0) {
          newArr.push(element);
        }
      });

      window.copiedDataArray = newArr;
    }
  };

  // Очистка скопированного массива с объявлениями
  var resetCopiedArray = function () {
    window.copiedDataArray = window.similarApartments;
  };

  // Отрисовка объявлений согласно отсортированным данным
  var sortAppartments = function (filtersArray, callback) {

    filtersArray.forEach(function (filter) {
      var field = document.querySelector('#' + filter);

      switch (filter) {
        case 'housing_type':
          sortArrayByTextFields(window.copiedDataArray, 'type', field.value);
          break;
        case 'housing_price':
          sortArrayByPrice(window.copiedDataArray, 'price', field.value);
          break;
        case 'housing_room-number':
          sortArrayByTextFields(window.copiedDataArray, 'rooms', field.value);
          break;
        case 'housing_guests-number':
          sortArrayByTextFields(window.copiedDataArray, 'guests', field.value);
          break;
        default:
          sortArrayByCheckboxes(window.copiedDataArray, 'features', field);
      }
    });

    window.renderData(window.copiedDataArray);
    callback();
  };

})();
