'use strict';

(function () {

  // Служебные значения и функции
  window.utils = {
    ESCAPE_KEY_CODE: 27,
    ENTER_KEY_CODE: 13,
    isEnterPressed: function (event) {
      return event.keyCode === this.ENTER_KEY_CODE;
    },
    isEscapePressed: function (event) {
      return event.keyCode === this.ESCAPE_KEY_CODE;
    },
    escapeKeydownHandler: function (event) {
      if (window.utils.isEscapePressed(event)) {
        window.closeDialogBox();
      }
    }
  };
})();
