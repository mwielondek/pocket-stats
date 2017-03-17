let express = require('express');
let app = express();

const PORT = 8080;

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(PORT, function () {
  console.log(`Server listening on port ${PORT}....`);
});
