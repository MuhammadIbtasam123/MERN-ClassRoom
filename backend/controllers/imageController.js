// imageController.controller.js
import mongoose from "mongoose";
import Grid from "gridfs-stream";

const conn = mongoose.connection;
let gfs;

conn.once("open", () => {
  // Initialize GridFS with the default bucket names
  gfs = Grid(conn.db, mongoose.mongo);
  // No need to specify the bucket name here since it's using the default
});

export const getImage = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(req.params.id);
    const objectId = new mongoose.Types.ObjectId(id);
    console.log(objectId);
    const file = await gfs.files.findOne({ _id: objectId });
    console.log(file);

    if (!file || file.length === 0) {
      return res.status(404).json({ err: "No file exists" });
    }

    const readStream = gfs.createReadStream({ _id: file._id });
    readStream.pipe(res);
  } catch (error) {
    console.error("Error retrieving image:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
// import mongoose from "mongoose";
// import Grid from "gridfs-stream";

// const conn = mongoose.connection;
// let gfs;

// conn.once("open", () => {
//   // Initialize GridFS with the default bucket names
//   gfs = Grid(conn.db, mongoose.mongo);
//   // No need to specify the bucket name here since it's using the default
// });

// export const getImage = async (req, res) => {
//   try {
//     const { id } = req.params;
//     console.log("Image ID:", id);
//     const objectId = new mongoose.Types.ObjectId(id);
//     console.log("Object ID:", objectId);
//     const file = await gfs.files.findOne({ _id: objectId });
//     console.log("File:", file);

//     if (!file || file.length === 0) {
//       return res.status(404).json({ err: "No file exists" });
//     }

//     const readStream = gfs.createReadStream({ _id: file._id });
//     readStream.pipe(res);
//   } catch (error) {
//     console.error("Error retrieving image:", error);
//     res.status(500).json({ message: "Something went wrong" });
//   }
// };
