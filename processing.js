var gm = require('gm');

function processing(filenames, callback) {
  if(filenames.length > 10) {
    callback(new Error('too many files!'), null);
  } else {
    checkFormat(filenames, function(jpgs) {
      if (jpgs.length === 0) {
        callback(new Error('invalid extension(s)'), null);
      }
      if (jpgs.length === 1) {
        callback(null, jpgs);
      } else {
        toMediaPattern(jpgs, function(medias) {
          callback(null, medias);
        });
      }
    });
  }
}

function checkFormat(filenames, callback) {
  var filenamesCount = filenames.length;
  var datas = [];
  filenames.forEach(function(filename) {
    convert(filename, function(err, jpgFile) {
      if (err) {
        filenamesCount--;
      } else {
        datas.push(jpgFile);
        if(datas.length === filenamesCount) {
          callback(datas);
        }
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
  if (extension === 'png') {
    newName = filename.split('.');
    newName.pop();
    newName.push('jpg');
    newName = newName.join('.');
    gm(filename).quality(100).write(newName, function(err) {
      callback(null,newName);
    });
  } else if (extension === 'jpg') {
    callback(null, filename);
  } else {
    callback(new Error('Extesion not supported'), null);
  }
}

module.exports = processing;
