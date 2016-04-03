var express = require("express")
  , app = express()
  , port = 80;

  app.use(express.static("./"));

  app.listen(port, function () {
    console.log("listen " + port);
  });
