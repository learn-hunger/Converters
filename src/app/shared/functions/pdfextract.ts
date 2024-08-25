import * as pdfjs from "pdfjs-dist";
import { TextItem } from "pdfjs-dist/types/src/display/api";
export async function extractTextFromPDF(
  pdfFilePath: string | Uint8Array,
): Promise<string | never> {
  pdfjs.GlobalWorkerOptions.workerSrc =
    "https://cdn.jsdelivr.net/npm/pdfjs-dist@4.2.67/build/pdf.worker.min.mjs";
  return pdfjs
    .getDocument(pdfFilePath)
    .promise.then((pdfDocument) => {
      // Initialize variables to store text content
      let text = "";

      // Loop through each page of the PDF
      const numPages = pdfDocument.numPages;
      const promises: Promise<void>[] = [];
      for (let i = 1; i <= numPages; i++) {
        promises.push(
          pdfDocument.getPage(i).then((pdfPage) => {
            return pdfPage.getTextContent().then((textContent) => {
              text += textContent.items
                .map((item) => {
                  const item2 = item as TextItem;
                  return item2.hasEOL ? "\n" : item2.str;
                })
                .join("");
            });
          }),
        );
      }

      return Promise.all(promises)
        .then(() => {
          return text;
        })
        .catch((error) => {
          throw error;
        });
    })
    .catch((error) => {
      throw error;
    });
}
