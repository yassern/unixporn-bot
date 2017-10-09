require('dotenv').config();
var Client = require('instagram-private-api').V1;
var device = new Client.Device(process.env.INSTAGRAM_USERNAME);
var storage = new Client.CookieFileStorage(__dirname + '/.cookies/bot-cookies.json');

Client.Session.create(device, storage, process.env.INSTAGRAM_USERNAME, process.env.INSTAGRAM_PASSWORD)
  .then(function(session) {
    Client.Upload.photo(session, './road/to/image.jpg')
      .then(function(upload) {
        return Client.Media.configurePhoto(session, upload.params.uploadId, 'captions and hashtags');
      })
  })
