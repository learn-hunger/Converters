import { RefObject, useState } from "react";
import { EOtherVariables, formClassNames } from "./../utils/results-constants";
import { ISubject } from "../utils/results-types";
import { ResultsStateManager } from "../blueprints/resultsStateManager";
import CreditModal from "./Credit-Modal";
const resultObject = new ResultsStateManager();
const Credits: React.FC<{
  semIndex: number;
  data: ISubject;
  subjectIndex: number;
  sgpaRef: RefObject<HTMLDivElement>;
  cgpaRef: RefObject<HTMLDivElement>;
}> = ({ data, semIndex, subjectIndex, sgpaRef, cgpaRef }) => {
  const [creditInput, setCreditInput] = useState(0);
  const [creditValue, setCreditValue] = useState(data.credits);
  const handleCreditValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCreditValue(e.target.value as unknown as number);
    if (e.target.value != "") {
      resultObject.setCredits({
        semIndex: semIndex,
        subjectIndex: subjectIndex,
        credits: e.target.value as unknown as number,
      });

      sgpaRef.current!.innerHTML = ResultsStateManager.result[
        semIndex
      ].sGpa.toFixed(EOtherVariables.SGPA_FIXED);
      cgpaRef.current!.innerHTML = resultObject.getCgpa.toFixed(
        EOtherVariables.CGPA_FIXED,
      );
    }
  };
  return (
    <>
      {creditValue != null ? (
        creditInput ? (
          <input
            type="number"
            className={
              formClassNames.common + "border-blue-200" + " shadow-inner"
            }
            value={creditValue}
            onChange={handleCreditValue}
          />
        ) : (
          <div
            className={formClassNames.common}
            onClick={() => {
              setCreditInput(1);
            }}
          >
            {creditValue}
          </div>
        )
      ) : (
        <CreditModal setCredit={handleCreditValue} data={data} />
      )}
    </>
  );
};
export default Credits;
