'use strict';

window.photoLoad = (function () {
  var FILE_TYPES = ['.gif', '.jpg', '.jpeg', '.png'];

  var fieldForAvatar = document.querySelector('#avatar');
  var fieldForPhoto = document.querySelector('#images');
  var avatarPreview = document.querySelector('.notice__preview img');
  var photoContainer = document.querySelector('.form__photo-container');
  /* var zoneForPhoto = photoContainer.querySelector('.drop-zone'); */

  var readerFiles = function (file, filePreview) {
    var fileName = file.name.toLowerCase();

    var fileType = FILE_TYPES.some(function (ad) {
      return fileName.endsWith(ad);
    });

    if (fileType) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        filePreview.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  };

  fieldForAvatar.addEventListener('change', function () {
    var avatar = fieldForAvatar.files[0];
    readerFiles(avatar, avatarPreview);
  });

  fieldForPhoto.addEventListener('change', function () {
    Array.from(fieldForPhoto).forEach(function (photoItem) {
      var photo = photoItem;
      var photoImg = photoContainer.createElement('img');
      readerFiles(photo, photoImg);
    });
  });
})();
