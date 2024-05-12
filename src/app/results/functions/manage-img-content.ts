import { ImageLike, Page } from "tesseract.js";
import {
  EGrades,
  EOtherVariables,
  imgCreditsRegex,
  imgGradeRegex,
  imgSubCodeRegx,
  imgSubRegex,
  imgSubRowDefaultValues,
  subjectCredits,
  zeroCredits,
} from "../../utils/results-constants";
import { ISemResult, ISubject } from "../../utils/results-types";
import { ResultsStateManager } from "../blueprints/resultsStateManager";
import { extractTextFromImg } from "./img-extract";
const resultsObject: ResultsStateManager = new ResultsStateManager();

export function manageImgContent(
  imgFilePath: ImageLike,
): Promise<ISemResult[]> {
  return extractTextFromImg(imgFilePath).then((data: Page) => {
    //preprocessing
    const lines: string[] = [];
    data.lines.forEach((i, index) => {
      i.text.replaceAll(/\s/g, "").length > EOtherVariables.IMG_ROW_MIN_LENGTH
        ? lines.push(i.text.replaceAll(/(\n|\|)/g, ""))
        : null;
    });
    //matching
    let results: ISubject[] = [];
    lines.slice(1).forEach((i: string) => {
      let text = i;
      const eachSubjectRow: ISubject = { ...imgSubRowDefaultValues };
      const subCode = text.match(imgSubCodeRegx);
      if (subCode) {
        eachSubjectRow.subjectCode = subCode[0].toUpperCase();
        text = text.replace(subCode[0], "");
      }

      const subCredits = text.match(imgCreditsRegex);
      if (subCredits) {
        eachSubjectRow.credits = subCredits[0] as unknown as number;
        text = text.replace(subCredits[0], "");
      }

      const sub = text.match(imgSubRegex);
      if (sub) {
        eachSubjectRow.subject = sub[0];
        text = text.replace(sub[0], "");
      }

      const grade = text.match(imgGradeRegex);
      if (grade) {
        switch (grade[0]) {
          case "€":
            eachSubjectRow.grade = "C";
            break;
          case "E":
            eachSubjectRow.grade = "P";
            break;
          case "fri":
          case "8":
            eachSubjectRow.grade = "B";
            break;
          default:
            eachSubjectRow.grade = grade[0] as keyof typeof EGrades;
        }
      }
      if (subjectCredits[eachSubjectRow.subjectCode as string] != undefined) {
        const creditsData =
          subjectCredits[eachSubjectRow.subjectCode as string];
        eachSubjectRow.credits = creditsData;
        if (!grade && creditsData == 0) {
          eachSubjectRow.grade = "P";
        }
      } else if (grade && Object.keys(zeroCredits).includes(grade[0])) {
        eachSubjectRow.credits = zeroCredits[eachSubjectRow.grade!]!;
      }
      if (subCode && subCode[0] != imgSubRowDefaultValues.subject) {
        eachSubjectRow.grade == null ? (eachSubjectRow.grade = "B") : null;
        results.push(eachSubjectRow);
      }
    });
    resultsObject.addResult(results);
    return ResultsStateManager.result;
  });
}

//TODO PROCESSING
// import { createWorker,ImageLike} from 'tesseract.js';
// import Tesseract from "tesseract.js";

// (async () => {
//   const worker = await createWorker('eng');
//   const ret = await worker.recognize('src/assets/b.png');
//   // console.log(ret,"worker");
//   const lines:string[]=[];
//   ret.data.lines.forEach((i,index)=>{
//     i.text.replaceAll(/\s/g,'').length>9?lines.push(i.text):null;
//   })
//   console.log(lines[5].match(/A|B|C\n/)![0]);
//   await worker.terminate();
// })();
// //test

// async function imageProcess(file: Blob | MediaSource){
//   // Load image and convert it to an image object
//   const img = new Image();
//   img.src = URL.createObjectURL(file);

//   // Wait for the image to load
//   await new Promise(resolve => {
//     img.onload = resolve;
//   });

//   // Create a canvas to draw the enlarged image
//   const canvas = document.createElement('canvas');
//   const ctx = canvas.getContext('2d');

//   const upscaleBy = 2
//   // Enlarge the image by doubling its size
//   canvas.width = img.width * upscaleBy;
//   canvas.height = img.height * upscaleBy;
//   ctx!.drawImage(img, 0, 0, canvas.width, canvas.height);

//   // Convert canvas to Blob object
//   const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/jpeg', 1));

//   // Use Tesseract.js to recognize the text in the enlarged image
//   const result = await Tesseract.recognize(blob as ImageLike, 'eng');
//   const text = result?.data?.text;
//   console.log(text)
//   return text;
// }
// console.log("hell")
// let blob = await fetch("src/assets/N_Study_e1_s2.pdf").then(r => r.blob());
// manageImgContent(blob)
