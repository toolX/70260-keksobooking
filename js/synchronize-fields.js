'use strict';

(function () {

  // Функция синхронизации полей формы
  window.synchronizeFields = function (domElement1, domElement2, array1, array2, property, callback) {

    domElement1.addEventListener('change', function () {
      var value = array1.indexOf(domElement1.value);
      callback(array2[value]);
    });

  };
})();
