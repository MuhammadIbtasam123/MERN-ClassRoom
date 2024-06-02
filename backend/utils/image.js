// Function to get the image URL from GridFS
export const getImageUrl = async (gfs, fileId) => {
  try {
    const file = await gfs.find({ _id: fileId }).toArray();
    if (!file || file.length === 0) {
      return null;
    }
    const imageUrl = `/api/image/${file[0]._id}`;
    return imageUrl;
  } catch (error) {
    console.error("Error fetching image URL:", error);
    return null;
  }
};
