import { useEffect, useState } from "react";
import { ResultsStateManager } from "./blueprints/resultsStateManager";
import { managePdfContent } from "./functions/manage-pdf-content";
const testData = {
  url: "src/assets/Examination Cell _ RGUKT Nuzvid.pdf",
};

const AppResults = () => {
  const [uploadState, setUploadState] = useState(1);
  const resultsObject: ResultsStateManager = new ResultsStateManager();
  useEffect(() => {
    console.log(uploadState);

    if (uploadState) {
      managePdfContent(testData.url);
    }
    return;
  }, [uploadState]);
  return (
    <>
      <div className="container">
        <div className="grid grid-cols-3 gap-4">
          <div className="text-red-500">hell</div>
          <div className="text-red">hell</div>
          <div className="text-red">hell</div>
        </div>
      </div>
    </>
  );
};
export default AppResults;
