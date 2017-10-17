var redditWatcher = require('./reddit');
var instagramUplouder = require('./instagram');
var processing = require('./processing');
var Post = require('./post');

redditWatcher.on('post', function(post) {
  var data = post.data;
  var post = new Post(data.id, data.domain, data.title, data.author, data.url);
  post.download(function(err, files) {
    if (err) { return; }
    processing(files, function(err, processedFiles) {
      if (err) { return; }
      instagramUplouder(processedFiles, post.createCaption());
    })
  });
})
