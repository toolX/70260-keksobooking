'use strict';

(function () {

  window.move = function (shift, elementToMove, topEdge, bottomEdge, leftEdge, rightEdge) {
    event.preventDefault();

    if (elementToMove.offsetTop - shift.y < topEdge) {
      elementToMove.style.top = topEdge + 'px';
    } else if (elementToMove.offsetTop - shift.y > bottomEdge) {
      elementToMove.style.top = bottomEdge + 'px';
    }

    if (elementToMove.offsetLeft - shift.x < leftEdge) {
      elementToMove.style.left = leftEdge + 'px';
    } else if (elementToMove.offsetLeft - shift.x > rightEdge) {
      elementToMove.style.left = rightEdge + 'px';
    }

    elementToMove.style.top = (elementToMove.offsetTop - shift.y) + 'px';
    elementToMove.style.left = (elementToMove.offsetLeft - shift.x) + 'px';
  };
})();
