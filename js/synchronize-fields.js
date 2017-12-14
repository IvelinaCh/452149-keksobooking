'use strict';

window.synchronizeFields = (function () {
  var syncValues = function (element, option) {
    element.value = option.value;
  };

  var syncValuesWithMin = function (element, value) {
    element.min = value;
  };

  var synchronizeFields = function (elemFirst, elemSecond, arrFirst, arrSecond, callFunction) {
    var index = 0;
    var value = 0;
    for (var i = 0; i < arrFirst.length; i++) {
      if (arrFirst[i].value === elemFirst.value) {
        index = i;
        value = arrSecond[index];
      }
    }
    callFunction(elemSecond, value);
  };

  return {
    synchronizeFields: synchronizeFields,
    syncValues: syncValues,
    syncValuesWithMin: syncValuesWithMin
  };
})();
