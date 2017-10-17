var download = require('image-downloader');
var impurge = require('impurge');

function Post(id, domain, title, author, url) {
  this.id = id;
  this.domain = domain;
  this.title = title;
  this.author = author;
  this.url = url;
}

Post.prototype.createCaption = function() {
  var defaultHashtags = '#unixporn #unix #rice #desktop';
  var caption = this.title;
  caption += '\n\n';
  caption += ('by: reddit.com/user/' + this.author);
  caption += '\n\n';
  caption += defaultHashtags;
  return caption;
}

Post.prototype.download = function(callback) {
  if (this.domain === 'i.redd.it' || this.domain === 'i.imgur.com') {
    download.image({ url: this.url, dest: './images/' })
      .then(function({ filename, image }) {
        callback(null, [filename]);
      })
      .catch(function(err) { callback(err, null) })
  }
  else if (this.domain === 'imgur.com') {
    impurge.purge(this.url, function (error, urls) {
      var promises = urls.map(function(url) {
        return download.image({ url: url, dest: './images/' });
      });
      var images = Promise.all(promises)
        .then(function(values) {
          var filenames = values.map(function(value) {
            return value.filename;
          });
          callback(null ,filenames);
        })
        .catch(function(err) { callback(err, null) })
    });
  }
  else {
    callback(new Error('domain not supported'), null);
  }
};

module.exports = Post;