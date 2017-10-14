var download = require('image-downloader');

function Post(id, domain, title, author, url) {
  this.id = id;
  this.domain = domain;
  this.title = title;
  this.author = author;
  this.url = url;
}

Post.prototype.downloadImage = function (callback) {
  if (this.domain === 'i.redd.it' || this.domain === 'i.imgur.com') {
    var options = { url: this.url, dest: './images' };
    download.image(options)
      .then(function({ filename, image }) {
        callback(filename);
      }).catch(function(err) {
        throw err;
      })
  }
};

module.exports = Post;
