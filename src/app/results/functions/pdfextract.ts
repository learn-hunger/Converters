// import * as fs from 'fs';
// import * as pdf from 'pdf-parse';
import * as pdfjs from "pdfjs-dist";
import { TextItem } from "pdfjs-dist/types/src/display/api";
// import ('pdfjs-dist/build/pdf.worker.mjs')
export async function extractTextFromPDF(
  pdfFilePath: string,
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
      const promises = [];
      for (let i = 1; i <= numPages; i++) {
        promises.push(
          pdfDocument.getPage(i).then((pdfPage) => {
            // Extract text content from the page

            return pdfPage.getTextContent().then((textContent) => {
              // Concatenate text content from all pages
              // console.log(textContent)
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

      // Wait for all promises to resolve
      return Promise.all(promises)
        .then(() => {
          // Extracting the table contents
          // console.log(text)
          return text;
          // const tableContent = extractTable(text);
          // console.log("hi")
          // if (tableContent) {
          //     // Display the extracted table in HTML format
          //     document.getElementById('tableContainer').innerHTML = tableContent;
          // } else {
          //     console.error('No table found in the PDF.');
          // }
        })
        .catch((error) => {
          console.error("Error: " + error);
          return error;
        });
    })
    .catch((error) => {
      console.error("Error: " + error);
    });
  // return pdfjs.getDocument(pdfFilePath)
  // .promise
  // .then(pdfDocument => {
  //     // console.log(pdfDocument)
  //   const maxPages = pdfDocument.numPages;
  //   let pdfText = '';
  // pdfDocument.getPage(1).then((page)=>{console.log(page.getTextContent().then((text)=>{console.log(text)}),"hell")})
  //   const pagePromises = [];
  //   for (let pageNum = 0; pageNum <= maxPages; pageNum++) {
  //     pagePromises.push(pdfDocument.getPage(pageNum));
  //   }

  //   return Promise.all(pagePromises)
  //     .then(pages => {
  //       const textPromises = pages.map(page => page.getTextContent());
  //       return Promise.all(textPromises)
  //         .then(textContents => {
  //           textContents.forEach(textContent => {
  //             textContent.items.forEach(item => {
  //               pdfText += (item as TextItem).str + ' ';
  //             });
  //           });
  //           return pdfText;
  //         });
  //     });
  // })
  // .catch(error => {
  //   console.error('Error loading or extracting PDF:', error);
  //   throw error; // Re-throw the error for further handling
  // });
}
