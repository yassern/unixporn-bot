var download = require('image-downloader');
var impurge = require('impurge');
var p = require('./processing');

function Post(id, domain, title, author, url) {
  this.id = id;
  this.domain = domain;
  this.title = title;
  this.author = author;
  this.url = url;
  this.download = getType(this.domain);
}


function getType(domain) {
  if(domain === 'i.redd.it' || domain === 'i.imgur.com') {
    return downloadImage;
  } else if (domain === 'imgur.com') {
    return downloadImages;
  } else if (domain === 'gycat.com') {
    return 'comming soon';
  } else {
    return null;
  }
}

function downloadImage(callback) {
  var options = { url: this.url, dest: './images' };
  download.image(options)
    .then(function({ filename, image }) {
      callback([filename], false);
    }).catch(function(err) {
      throw err;
    })
}

function downloadImages(callback) {
  impurge.purge(this.url, function (error, urls) {
    var promises = urls.map(function(url) {
      return download.image({url: url, dest: './images'});
    });
    var imagens = Promise.all(promises)
      .then(function(values) {
        var filenames = values.map(function(value) {
          return value.filename;
        });
        callback(filenames, true);
      }).catch(function(err) {
        throw err;
      })
  });
}

module.exports = Post;
