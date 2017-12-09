'use strict';

var noticeForm = document.querySelector('.notice__form');
var fieldset = document.querySelectorAll('.notice__form fieldset');

for (var k = 1; k < fieldset.length; k++) {
  fieldset[k].setAttribute('disabled', true);
}

var timein = noticeForm.querySelector('#timein');
var timeout = noticeForm.querySelector('#timeout');
var typeHome = noticeForm.querySelector('#type');
var priceHome = noticeForm.querySelector('#price');
var roomNumber = noticeForm.querySelector('#room_number');
var capacity = noticeForm.querySelector('#capacity');

timein.addEventListener('change', function () {
  timeout.selectedIndex = timein.selectedIndex;
});

timeout.addEventListener('change', function () {
  timein.selectedIndex = timeout.selectedIndex;
});

typeHome.addEventListener('change', function () {
  if (typeHome.options[0].selected) {
    priceHome.min = 1000;
  } else if (typeHome.options[1].selected) {
    priceHome.min = 0;
  } else if (typeHome.options[2].selected) {
    priceHome.min = 5000;
  } else if (typeHome.options[3].selected) {
    priceHome.min = 10000;
  }
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
