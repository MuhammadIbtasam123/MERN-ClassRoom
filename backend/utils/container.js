import mongoose from "mongoose";

// MongoDB URI
const mongoURI = "mongodb://127.0.0.1/Classroom";

// Create a mongoose connection
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let bucket;
mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db);
});

mongoose.connection.on(
  "error",
  console.error.bind(console, "MongoDB connection error:")
);

export default bucket;
