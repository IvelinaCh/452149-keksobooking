'use strict';

window.synchronizeFields = (function () {
  var synchronizeFields = function (elemFirst, elemSecond, arrFirst, arrSecond, callFunction) {
    var value = 0;
    for (var i = 0; i < arrFirst.length; i++) {
      if (arrFirst[i].value === elemFirst.value) {
        value = arrSecond[i];
      }
    }
    callFunction(elemSecond, value);
  };

  return {
    synchronizeFields: synchronizeFields
  };
})();
