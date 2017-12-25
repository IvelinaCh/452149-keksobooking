'use strict';

window.form = (function (dataModule, syncModule, backendModule) {
  var save = backendModule.save;
  var onLoad = backendModule.onLoad;
  var onError = backendModule.onError;
  var noticeForm = backendModule.noticeForm;
  var fieldset = document.querySelectorAll('.notice__form fieldset');

  /*
  В момент открытия, страница должна находиться в следующем состоянии:
  карта затемнена (добавлен класс map--faded) и форма неактивна
  (добавлен класс notice__form--disabled и все поля формы недоступны, disabled)
  */

  for (var k = 1; k < fieldset.length; k++) {
    fieldset[k].setAttribute('disabled', true);
  }

  var timein = noticeForm.querySelector('#timein');
  var timeout = noticeForm.querySelector('#timeout');
  var typeHome = noticeForm.querySelector('#type');
  var priceHome = noticeForm.querySelector('#price');
  var roomNumber = noticeForm.querySelector('#room_number');
  var capacity = noticeForm.querySelector('#capacity');
  var myAddress = noticeForm.querySelector('#address');


  var minPrice = dataModule.minPrice;
  var synchronizeFields = syncModule.synchronizeFields;

  var syncValues = function (element, option) {
    element.value = option.value;
  };

  var syncValuesWithMin = function (element, value) {
    element.min = value;
  };

  timein.addEventListener('change', function () {
    synchronizeFields(timein, timeout, timein.options, timeout.options, syncValues);
  });

  timeout.addEventListener('change', function () {
    synchronizeFields(timeout, timein, timeout.options, timein.options, syncValues);
  });

  typeHome.addEventListener('change', function () {
    synchronizeFields(typeHome, priceHome, typeHome.options, minPrice, syncValuesWithMin);
  });

  var onSelectRooms = function () {
    for (var i = 0; i < capacity.length; i++) {
      if (roomNumber.value === '100') {
        capacity.options[i].disabled = (capacity.options[i].value !== '0');
        capacity.value = '0';
        continue;
      }
      capacity.options[i].disabled = (capacity.options[i].value > roomNumber.value || capacity.options[i].value === '0');
      capacity.value = '1';
    }
  };

  roomNumber.addEventListener('change', onSelectRooms);

  noticeForm.addEventListener('submit', function (evt) {
    save(new FormData(noticeForm), onLoad, onError);
    evt.preventDefault();
  });

  return {
    noticeForm: noticeForm,
    capacity: capacity,
    fieldset: fieldset,
    myAddress: myAddress
  };
})(window.data, window.synchronizeFields, window.backend);
