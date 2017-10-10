var Snooper = require('reddit-snooper');
snooper = new Snooper({
  automatic_retries: true,
  api_requests_per_minuite: 5
});

module.exports = snooper.watcher.getPostWatcher('unixporn');
