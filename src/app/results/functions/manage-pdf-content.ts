import {
  EGrades,
  branchRegex,
  gradesRegex,
  level1Regex,
  subjectCodeRegex,
  subjectCredits,
  subjectRegex,
  zeroCredits,
} from "../../utils/results-constants";
import { ISemResult, ISubject } from "../../utils/results-types";
import { ResultsStateManager } from "../blueprints/resultsStateManager";
import { extractTextFromPDF } from "./pdfextract";

// const pdfFilePath = 'src/assets/Examination Cell _ RGUKT Nuzvid.pdf'; // Replace with your PDF file path
const resultsObject: ResultsStateManager = new ResultsStateManager();
export function managePdfContent(
  pdfFilePath: string | Uint8Array,
): Promise<ISemResult[]> {
  return extractTextFromPDF(pdfFilePath)
    .then((text: string) => {
      const level1Text = text.match(level1Regex)![0].split("\n");
      let results: ISubject[] = [];
      level1Text.forEach((i) => {
        let eachSubjectRow: ISubject;
        const level2Text = i.match(subjectCodeRegex)![0];
        const grade = i.match(gradesRegex)![0];
        eachSubjectRow = {
          year: level2Text.slice(0, 6),
          branch: level2Text.match(branchRegex)![0],
          subject: level2Text.match(subjectRegex)![0],
          subjectCode: level2Text
            .slice(level2Text.length - 10, level2Text.length)
            .replaceAll(/\s/g, ""),
          grade: grade as keyof typeof EGrades,
          credits: null,
        };
        if (subjectCredits[eachSubjectRow.subjectCode]) {
          eachSubjectRow.credits = subjectCredits[eachSubjectRow.subjectCode];
        } else if (Object.keys(zeroCredits).includes(grade)) {
          eachSubjectRow.credits = zeroCredits[eachSubjectRow.grade]!;
        }

        results.push(eachSubjectRow);
      });
      resultsObject.addResult(results);

      console.log(ResultsStateManager.result);
      return ResultsStateManager.result;
    })
    .catch((error) => {
      throw error;
      console.error("Error:", error);
    });
}
//test
