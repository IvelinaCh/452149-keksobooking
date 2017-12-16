'use strict';

window.backend = (function () {
  var noticeForm = document.querySelector('.notice__form');

  var save = function (data, onLoad, onError) {
    var xhr = new XMLHttpRequest();
    var URL = 'https://1510.dump.academy/keksobooking';
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError('Ошибка ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });
    xhr.open('POST', URL);
    xhr.send(data);
  };

  var load = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    var URL = 'https://1510.dump.academy/keksobooking/data';
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError('Ошибка ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.open('GET', URL);
    xhr.send();
  };

  var onError = function (errMessage) {
    var message = document.createElement('div');
    message.style = 'z-index: 10; width: 90vw; min-height: 50vh; text-align: center; position: absolute; font-size: 72px; color: red; background-color: gray;';
    message.textContent = errMessage;
    document.body.insertAdjacentElement('afterbegin', message);
  };

  var onLoad = function () {
    noticeForm.reset();
  };

  return {
    load: load,
    save: save,
    noticeForm: noticeForm,
    onError: onError,
    onLoad: onLoad
  };
})();
