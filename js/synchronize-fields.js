'use strict';

window.synchronizeFields = function (domElem1, domElem2, arr1, arr2, prop) {

  domElem1.addEventListener('change', function () {
    var value = arr1.indexOf(domElem1.value);
    domElem2[prop] = arr2[value];
  });

  domElem2.addEventListener('change', function () {
    var value = arr2.indexOf(domElem2.value);
    domElem1[prop] = arr1[value];
  });
};
