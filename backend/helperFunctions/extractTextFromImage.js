import { createWorker } from "tesseract.js";

async function extractTextFromImage(imageBuffer) {
  try {
    const worker = await createWorker();

    const {
      data: { text },
    } = await worker.recognize(imageBuffer);

    await worker.terminate();

    return text;
  } catch (error) {
    console.error("Error extracting text from image:", error);
    throw error;
  }
}

export default extractTextFromImage;
