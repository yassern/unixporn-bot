require('dotenv').config();
var Client = require('instagram-private-api').V1;
var device = new Client.Device(process.env.INSTAGRAM_USERNAME);
var storage = new Client.CookieFileStorage(__dirname + '/.cookies/bot-cookies.json');
var login = Client.Session.create(device, storage, process.env.INSTAGRAM_USERNAME, process.env.INSTAGRAM_PASSWORD);

function upload(path, caption, isAlbum) {
  login
    .then(function(session) {
      if(isAlbum) {
        Client.Upload.album(session, path)
          .then(function (payload) {
            return Client.Media.configureAlbum(session, payload, caption, false);
          })
          .catch(function(err) { throw err });
      } else {
        Client.Upload.photo(session, path)
          .then(function(upload) {
            return Client.Media.configurePhoto(session, upload.params.uploadId, caption);
          })
          .catch(function(err) { throw err });
      }
    })
    .catch(function(err) { throw err });
}

module.exports = upload;
