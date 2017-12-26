'use strict';

window.photoLoad = (function () {
  var FILE_TYPES = ['.gif', '.jpg', '.jpeg', '.png'];

  var fieldForAvatar = document.querySelector('#avatar');
  var fieldForPhoto = document.querySelector('#images');
  var avatarPreview = document.querySelector('.notice__preview img');
  var zoneForAvatar = document.querySelector('.notice__preview .drop-zone');
  var photoContainer = document.querySelector('.form__photo-container');
  var zoneForPhoto = photoContainer.querySelector('.drop-zone');

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

  var onLoadAvatar = function () {
    var avatar = fieldForAvatar.files[0];
    readerFiles(avatar, avatarPreview);
  };

  fieldForAvatar.addEventListener('change', function () {
    onLoadAvatar();
  });

  zoneForAvatar.addEventListener('drop', function (evt) {
    evt.preventDefault()
    onLoadAvatar();
  });

  /*var onLoadPhoto = function () {
    Array.from(fieldForPhoto.files).forEach(function (photoItem) {
      var photo = photoItem;
      var photoImg = document.createElement('img');
      photoContainer.appendChild(photoImg);
      readerFiles(photo, photoImg);
    });
  };*/

  var onLoadPhoto = function () {
    var photo = photoItem;
    var photoImg = document.createElement('img');
    photoContainer.appendChild(photoImg);
    readerFiles(photo, photoImg);
  };

  fieldForPhoto.addEventListener('change', function () {
    Array.from(fieldForPhoto.files).forEach(function (photoItem) {
      onLoadPhoto(photoItem);
    });
  });

  zoneForPhoto.addEventListener('drop', function (evt) {
    evt.preventDefault()
    Array.from(evt.dataTransfer.files).forEach(function (photoItem) {
      onLoadPhoto(photoItem);
    });
  });
})();
