import mongoose from "mongoose";
const connection = {};

const uri = process.env.MONGO_URI;

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((x) => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
    connection.isConnected = x.connections[0].readyState;
  })
  .catch((err) => {
    console.error("Error connecting to mongo", err);
  });
module.exports = mongoose.connection;
