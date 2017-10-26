var download = require('image-downloader');
var impurge = require('impurge');
var _ = require('lodash');

function Post(id, domain, title, link, url, edited) {
  this.id = id;
  this.domain = domain;
  this.title = title;
  this.link = link;
  this.url = url;
  this.edited = edited;
}

Post.prototype.createCaption = function() {
  var defaultHashtags = '#unixporn #unix #rice #desktop';
  var caption = this.title;
  caption += '\n\n';
  caption += ('link: ' + 'https://www.reddit.com' + this.link);
  caption += '\n\n';
  caption += defaultHashtags;
  return caption;
}

Post.prototype.download = function(callback) {
  if (this.edited) {
    callback(new Error('edited post'), null);
  }
  else if (this.domain === 'i.redd.it' || this.domain === 'i.imgur.com') {
    download.image({ url: this.url, dest: '/tmp/' })
      .then(function({ filename, image }) {
        callback(null, [filename]);
      })
      .catch(function(err) { callback(err, null) })
  }
  else if (this.domain === 'imgur.com') {
    impurge.purge(this.url, function (error, urls) {
      urls = _.uniq(urls);
      var promises = urls.map(function(url) {
        return download.image({ url: url, dest: '/tmp/' });
      });
      var images = Promise.all(promises)
        .then(function(values) {
          var filenames = values.map(function(value) {
            return value.filename;
          });
          callback(null, filenames);
        })
        .catch(function(err) { callback(err, null) })
    });
  }
  else {
    callback(new Error('domain not supported'), null);
  }
};

module.exports = Post;
