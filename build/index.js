"use strict";

var _cors = _interopRequireDefault(require("cors"));

require("dotenv/config");

var _express = _interopRequireDefault(require("express"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();
var PORT = process.env.PORT || 8080;
app.use((0, _cors["default"])());
app.listen(PORT, function () {
  return console.log("Example app listening on ".concat(PORT, "!"));
});
app.get('/', function (req, res) {
  res.send('Hello World!');
});
app.get('/books', function (req, res) {
  res.send([{
    name: faker.words(2),
    author: "Mayumi Tamura"
}, {
    name: faker.words(2),
    author: "Mayumi Tamura"
}]);
});