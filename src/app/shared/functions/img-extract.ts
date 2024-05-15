import { ImageLike, Page, Worker, createWorker } from "tesseract.js";
let worker: Worker;
export async function extractTextFromImg(
  imgFilePath: ImageLike,
): Promise<Page> {
  if (!worker) {
    worker = await createWorker("eng");
  }
  const response = await worker.recognize(imgFilePath);
  return response.data;
}
