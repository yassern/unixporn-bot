var Snooper = require('reddit-snooper');

snooper = new Snooper({
  automatic_retries: true,
  api_requests_per_minuite: 1
});

var redditWatcher = snooper.watcher.getPostWatcher('unixporn');

module.exports = redditWatcher;
