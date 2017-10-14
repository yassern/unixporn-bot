var redditWatcher = require('./reddit');
var instagramUplouder = require('./instagram');
var Post = require('./post');

redditWatcher.once('post', function(post) {
    var data = post.data;
    var post = new Post(data.id, data.domain, data.title, data.author, data.url);
    post.downloadImage(function(path) {
      instagramUplouder(path, 'test');
    });
  })
