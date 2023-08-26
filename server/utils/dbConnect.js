import mongoose from "mongoose";
const connection = {};

const uri = process.env.MONGO_URI;

async function dbConnect() {
  if (connection.isConnected) {
    return;
  }
  const db = await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true, 
  });

  connection.isConnected = db.connections[0].readyState;
}

export default dbConnect;
