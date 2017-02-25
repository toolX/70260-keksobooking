'use strict';

window.load = (function () {

  return function (url, onLoad, onError) {
    var xhr = new XMLHttpRequest();

    if (typeof onError === 'function') {
      window.errorHandler = onError;
    }

    xhr.addEventListener('load', function (event) {
      if (event.target.status >= 400) {
        window.errorHandler('Failed to load data. Server returned status: ' + event.target.status);
      } else if (event.target.status >= 200) {
        onLoad(event.target.response);
      }
    });

    xhr.addEventListener('error', window.errorHandler);
    xhr.addEventListener('timeout', window.errorHandler);

    xhr.responseType = 'json';
    xhr.open('GET', url);
    xhr.send();
  };
})();
