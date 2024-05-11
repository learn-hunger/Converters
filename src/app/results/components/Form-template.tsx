import { RefObject, useRef } from "react";
import { EOtherVariables, formClassNames } from "../../utils/results-constants";
import { ISemResult, ISubject } from "../../utils/results-types";
import { ResultsStateManager } from "../blueprints/resultsStateManager";
import Credits from "./Credits";
const FormTemplate: React.FC<{
  cgpaRef: RefObject<HTMLDivElement>;
  data: ISemResult;
  semIndex: number;
}> = ({ data, semIndex, cgpaRef }) => {
  const sgpaRef = useRef(null);
  return (
    <>
      <div className="container m-auto border border-red-400">
        <form name={data.sem}>
          {data.results.length && (
            <div
              className={`grid grid-flow-col grid-rows-10 grid-rows-${data.results.length + 1}`}
            >
              <div className="font-bold uppercase grid grid-flow-row  grid-cols-4 md:grid-cols-7 sm:grid-cols-4 gap-0">
                <div
                  className={formClassNames.collapse + formClassNames.common}
                >
                  Year
                </div>
                <div
                  className={formClassNames.collapse + formClassNames.common}
                >
                  Branch
                </div>
                <div
                  className={formClassNames.subjectName + formClassNames.common}
                >
                  Subject Name
                </div>
                <div
                  className={formClassNames.collapse + formClassNames.common}
                >
                  Subject Code
                </div>
                <div className={formClassNames.common}>Grade</div>
                <div className={formClassNames.common}>Credits</div>
              </div>
              {data.results.map((i: ISubject, index) => {
                return (
                  <div className="grid grid-flow-row grid-cols-4 md:grid-cols-7 sm:grid-cols-4">
                    <div
                      className={
                        formClassNames.collapse + formClassNames.common
                      }
                    >
                      {i.year}
                    </div>
                    <div
                      className={
                        formClassNames.collapse + formClassNames.common
                      }
                    >
                      {i.branch}
                    </div>
                    <div
                      className={
                        formClassNames.subjectName + formClassNames.common
                      }
                    >
                      {i.subject}
                    </div>
                    <div
                      className={
                        formClassNames.collapse + formClassNames.common
                      }
                    >
                      {i.subjectCode}
                    </div>
                    <div className={formClassNames.common}>{i.grade}</div>
                    {/* <div className={formClassNames.common}>{i.credits}</div> */}
                    <Credits
                      semIndex={semIndex}
                      sgpaRef={sgpaRef}
                      data={i}
                      subjectIndex={index}
                      cgpaRef={cgpaRef}
                    />
                  </div>
                );
              })}
            </div>
          )}
          <div className="font-bold uppercase grid grid-flow-row  grid-cols-4 md:grid-cols-7 sm:grid-cols-4 gap-0">
            <div
              className={
                formClassNames.common +
                "col-span-3 md:col-span-6 sm:col-span-3 pe-4 text-right"
              }
            >
              SGPA
            </div>
            <div
              className={formClassNames.common + "text-center"}
              ref={sgpaRef}
            >
              {ResultsStateManager.result[0].sGpa.toFixed(
                EOtherVariables.SGPA_FIXED,
              )}
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
export default FormTemplate;
