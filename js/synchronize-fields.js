'use strict';

(function () {
  window.synchronizeFields = function (domElem1, domElem2, arr1, arr2, prop, callback) {

    domElem1.addEventListener('change', function () {
      var value = arr1.indexOf(domElem1.value);
      callback(arr2[value]);
    });

  };
})();
