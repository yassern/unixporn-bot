var redditWatcher = require('./reddit');
var instagramUplouder = require('./instagram');
var processing = require('./processing');
var Post = require('./post');

redditWatcher.on('post', function(post) {
    var data = post.data;
    var post = new Post(data.id, data.domain, data.title, data.author, data.url);
    post.download(function(path, isAlbum) {
      instagramUplouder(path, post.title, isAlbum);
    });
  })
