require('dotenv').config();
var Client = require('instagram-private-api').V1;
var device = new Client.Device(process.env.INSTAGRAM_USERNAME);
var storage = new Client.CookieFileStorage('./.cookies/bot-cookies.json');
var username = process.env.INSTAGRAM_USERNAME;
var password = process.env.INSTAGRAM_PASSWORD;
var login = Client.Session.create(device, storage, username, password);

function upload(path, caption, callback) {
  login
    .then(function(session) {
      if(path.length > 1) {
        Client.Upload.album(session, path)
          .then(function (payload) {
            return Client.Media.configureAlbum(session, payload, caption, false);
          })
          .then(function (medium) {
            callback(null, medium);
          })
          .catch(function(err) { callback(err, null) });
      } else {
        Client.Upload.photo(session, path[0])
          .then(function(upload) {
            return Client.Media.configurePhoto(session, upload.params.uploadId, caption);
          })
          .then(function() {
            callback(null, {});
          })
          .catch(function(err) { callback(err, null) });
      }
    })
    .catch(function(err) { callback(err, null) });
}

module.exports = upload;
