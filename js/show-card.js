'use strict';

var dialogBox = document.querySelector('.dialog');

window.showCard = function (elem, callback) {
  if (dialogBox.classList.contains('hidden')) {
    dialogBox.classList.remove('hidden');
  }
  callback(elem);
};
