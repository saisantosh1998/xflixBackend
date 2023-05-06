const mongoose = require("mongoose");
const app = require("./app");
const config = require("./config/config");
let server = app;

// TODO: CRIO_TASK_MODULE_UNDERSTANDING_BASICS - Create Mongo connection and get the express app to listen on config.port
mongoose
  .connect(config.mongoose.url, config.mongoose.options)
  .then(() => {
    console.log("Connected to mongoose DB");
  })
  .catch((err) => {
    console.log("Unable to connect to mongoose DB");
  });

server.listen(config.port || 3000, () => {
  console.log(`Server Listening at PORT ${config.port || 3000}`);
});
