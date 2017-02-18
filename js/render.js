'use strict';

window.render = (function () {

  return function (pin) {
    var pinTemplate = document.querySelector('#pin-template');
    var pinElement = pinTemplate.content.querySelector('.pin');
    var newPin = pinElement.cloneNode(true);
    newPin.style.left = pin.location.x + 'px';
    newPin.style.top = pin.location.y + 'px';
    newPin.data = pin;

    // var pinImage = newPin.children[0];
    // pinImage.src = pin.author.avatar;

    return newPin;
  };

})();
