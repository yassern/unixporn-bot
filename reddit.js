var Snooper = require('reddit-snooper');

snooper = new Snooper({
  automatic_retries: true,
  api_requests_per_minuite: 5
});

var redditWatcher = snooper.watcher.getPostWatcher('all')

module.exports = redditWatcher;
