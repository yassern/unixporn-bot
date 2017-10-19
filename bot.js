var redditWatcher = require('./reddit');
var instagramUplouder = require('./instagram');
var processing = require('./processing');
var Post = require('./post');

console.log('Bot is running>');
redditWatcher.on('post', function(post) {
  var data = post.data;
  var post = new Post(data.id, data.domain, data.title, data.author, data.url);
  console.log('New post> ' + post.id);
  post.download(function(err, files) {
    if (err) {
      console.log('Error on downloading ' + post.id + ' message>\n' + err.message);
      return;
    }
    processing(files, function(err, processedFiles) {
      if (err) {
        console.log('Error on procesing ' + post.id + ' message>\n' + err.message);
        return;
      }
      instagramUplouder(processedFiles, post.createCaption(), function(err, upload) {
        if (err) {
          console.log('Error on posting ' + post.id + ' message>\n' + err.message);
          return;
        }
        console.log('Post ' + post.id + ' uploaded successfully');
        return upload;
      });
    })
  });
})
