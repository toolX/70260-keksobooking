'use strict';

(function () {
  window.synchronizeFields = function (domElem1, domElem2, arr1, arr2, prop) {

    var setDomElem1Prop = function (value) {
      domElem1[prop] = arr1[value];
    };

    var setDomElem2Prop = function (value) {
      domElem2[prop] = arr2[value];
    };

    domElem1.addEventListener('change', function () {
      var value = arr1.indexOf(domElem1.value);
      setDomElem2Prop(value);
    });

    domElem2.addEventListener('change', function () {
      var value = arr2.indexOf(domElem2.value);
      setDomElem1Prop(value);
    });
  };
})();
