'use strict';

window.photoLoad = (function () {
  var FILE_TYPES = ['.gif', '.jpg', '.jpeg', '.png'];
  var WIDTH_PHOTO = 40;
  var HEIGHT_PHOTO = 44;

  var fieldForAvatar = document.querySelector('#avatar');
  var fieldForPhoto = document.querySelector('#images');
  var avatarPreview = document.querySelector('.notice__preview img');
  var zoneForAvatar = document.querySelector('.notice__photo .drop-zone');
  var photoContainer = document.querySelector('.form__photo-container');
  var zoneForPhoto = photoContainer.querySelector('.drop-zone');
  fieldForAvatar.name = 'avatar';
  fieldForPhoto.name = 'files';

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

  var onImageDragover = function (evt) {
    evt.preventDefault();
  };

  zoneForAvatar.addEventListener('dragover', onImageDragover);
  zoneForPhoto.addEventListener('dragover', onImageDragover);

  var onLoadAvatar = function (avatar) {
    readerFiles(avatar, avatarPreview);
  };

  fieldForAvatar.addEventListener('change', function () {
    var avatar = fieldForAvatar.files[0];
    onLoadAvatar(avatar);
  });

  zoneForAvatar.addEventListener('drop', function (evt) {
    evt.preventDefault();
    fieldForAvatar.files = evt.dataTransfer.files;
  });

  var onLoadPhoto = function (photoItem) {
    var photo = photoItem;
    var photoImg = document.createElement('img');
    photoImg.style.width = WIDTH_PHOTO + 'px';
    photoImg.style.height = HEIGHT_PHOTO + 'px';
    photoContainer.appendChild(photoImg);
    readerFiles(photo, photoImg);
  };

  fieldForPhoto.addEventListener('change', function () {
    Array.from(fieldForPhoto.files).forEach(function (photoItem) {
      onLoadPhoto(photoItem);
    });
  });

  zoneForPhoto.addEventListener('drop', function (evt) {
    evt.preventDefault();
    fieldForPhoto.files = evt.dataTransfer.files;
  });

  return {
    avatarPreview: avatarPreview,
    photoContainer: photoContainer
  };
})();
