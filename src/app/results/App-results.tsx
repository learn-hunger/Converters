import React, { useRef, useState } from "react";
import { ResultsStateManager } from "./blueprints/resultsStateManager";
import FormTemplate from "./components/Form-template";
import { manageImgContent } from "./functions/manage-img-content";
import { managePdfContent } from "./functions/manage-pdf-content";
import handleAnalytics from "./utils/analytics";
import { EAnalytics, analytics } from "./utils/converters-constants";
import { EErrorMessages, EOtherVariables } from "./utils/results-constants";
import { ISemResult } from "./utils/results-types";
const AppResults = () => {
  const resultsObject: ResultsStateManager = new ResultsStateManager();
  const [allResults, setAllResults] = useState(ResultsStateManager.result);
  const cgpa = useRef<HTMLDivElement>(null);
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files?.length > 0) {
      Object.keys(files).forEach(async (_, index: number) => {
        const pdfProcessing = () => {
          const reader = new FileReader();
          reader.readAsArrayBuffer(files[index]);
          reader.onload = async (event) => {
            const result = event.target?.result;
            if (result && result instanceof ArrayBuffer) {
              const typedarray = new Uint8Array(result);
              try {
                await managePdfContent(typedarray);
              } catch (err) {
                window.alert(
                  `I think ${files[index].name} was not supported,Please Download it from rguktn site`,
                );
              }
              setAllResults([...ResultsStateManager.result]);
            }
          };
        };
        const imageProcessing = async () => {
          try {
            await manageImgContent(files[index]);
            setAllResults([...ResultsStateManager.result]);
          } catch (err) {
            const analyticsData = analytics[EAnalytics.TEXT_IMAGE_ERROR];
            analyticsData.data = err as string;
            handleAnalytics(analyticsData);
          }
        };
        switch (files[index].type) {
          case "application/pdf":
            pdfProcessing();
            break;
          case "image/png":
          case "image/jpg":
          case "image/jpeg":
            imageProcessing();
            break;
        }
      });
    }
  };
  return (
    <div className="container relative m-auto">
      <div className="p-10 m-auto">
        <div>
          <input
            type="file"
            accept=".pdf,.png,.jpeg,.jpg"
            multiple
            onChange={handleFileUpload}
          />
        </div>
        <div>
          CGPA:
          <span ref={cgpa}>
            {isNaN(resultsObject.getCgpa)
              ? EErrorMessages.CGPA
              : resultsObject.getCgpa.toFixed(EOtherVariables.CGPA_FIXED)}
          </span>
        </div>
        {allResults.map((i: ISemResult, index) => {
          return (
            <div key={index} className="border border-black mb-4 ">
              <div className="text-right text-xl pe-2">
                <button
                  onClick={() => {
                    resultsObject.removeSemResult(index);
                    setAllResults([...ResultsStateManager.result]);
                  }}
                >
                  X
                </button>
              </div>
              <FormTemplate cgpaRef={cgpa} semIndex={index} data={i} />
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default AppResults;
