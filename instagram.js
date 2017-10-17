require('dotenv').config();
var Client = require('instagram-private-api').V1;
var device = new Client.Device(process.env.INSTAGRAM_USERNAME);
var storage = new Client.CookieFileStorage(__dirname + '/.cookies/bot-cookies.json');
var login = Client.Session.create(device, storage, process.env.INSTAGRAM_USERNAME, process.env.INSTAGRAM_PASSWORD);

function upload(path, caption) {
  login
    .then(function(session) {
      if(path.length > 1) {
        Client.Upload.album(session, path)
          .then(function (payload) {
            return Client.Media.configureAlbum(session, payload, caption, false);
          })
          .catch(function(err) { return; });
      } else {
        Client.Upload.photo(session, path[0])
          .then(function(upload) {
            return Client.Media.configurePhoto(session, upload.params.uploadId, caption);
          })
          .catch(function(err) { return; });
      }
    })
    .catch(function(err) { return; });
}

module.exports = upload;
