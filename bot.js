var redditWatcher = require('./reddit');
var uploudOnInstagram = require('./instagram');

redditWatcher.on('post', function(post) {
  var postInfo = {
    domain: post.data.domain,
    title: post.data.title,
    author: post.data.author,
    url: post.data.url
  }
  console.log(postInfo);
})
