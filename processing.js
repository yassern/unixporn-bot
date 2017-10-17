var gm = require('gm');

function processing(filenames, isAlbum, callback) {
  checkFormat(filenames, function(jpgs) {
    if (isAlbum) {
      toMediaPattern(jpgs, function(medias) {
        callback(medias, isAlbum);
      });
    } else {
      callback(jpgs[0], isAlbum);
    }
  });
}

function checkFormat(filenames, callback) {
  var filenamesCount = filenames.length;
  var datas = [];
  filenames.forEach(function(filename) {
    convert(filename, function(name) {
      datas.push(name);
      if(datas.length === filenamesCount) {
        callback(datas);
      }
    });
  });
}

function toMediaPattern(filenames, callback) {
  var filenamesCount = filenames.length;
  var datas = [];
  filenames.forEach(function(jpg) {
    gm(jpg).size(function(err, size) {
      datas.push({ type: 'photo', size: [size.width, size.height], data: jpg });
      if(datas.length === filenamesCount) {
        callback(datas);
      }
    });
  });
}

function convert(filename, callback) {
  var extension = filename.split('.').pop();
  if (extension == 'png') {
    newName = filename.split('.');
    newName.pop();
    newName.push('jpg');
    newName = newName.join('.');
    gm(filename).write(newName, function(err) {
      callback(newName);
    });
  } else {
    callback(filename);
  }
}

module.exports = processing;
