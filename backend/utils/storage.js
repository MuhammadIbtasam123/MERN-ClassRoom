import multer from "multer";
import { GridFsStorage } from "multer-gridfs-storage";
import mongoose from "mongoose";

// MongoDB URI
const mongoURI = "mongodb://127.0.0.1/Classroom";

// Create a mongoose connection
const conn = mongoose.createConnection(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let gfs;
conn.once("open", () => {
  // Initialize GridFS bucket without specifying the bucket name
  gfs = new mongoose.mongo.GridFSBucket(conn.db);
});

const storage = new GridFsStorage({
  url: mongoURI,
  options: { useUnifiedTopology: true },
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      const filename = `${Date.now()}-${file.originalname}`;
      const fileInfo = {
        filename,
      };
      resolve(fileInfo);
    });
  },
});

export const upload = multer({ storage });
