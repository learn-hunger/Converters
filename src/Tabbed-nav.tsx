import { useState } from "react";
import { EConverter } from "./app/results/utils/converters-constants";
import IndexResults from "./app/results/Index-results";
import ImageToText from "./app/converters/components/Image-Text";
import TagManager from "react-gtm-module";

const TabbedNav = () => {
  const [pane, setPane] = useState(EConverter.IMAGE_PDF_TO_TEXT);
  let component;
  switch (pane) {
    case EConverter.GPA:
      component = <IndexResults />;
      break;
    case EConverter.IMAGE_PDF_TO_TEXT:
      component = <ImageToText />;
      break;
  }

  const handleAnalytics = (state: EConverter) => {
    TagManager.dataLayer({
      dataLayer: {
        event: EConverter[state],
      },
    });
  };
  return (
    <>
      <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
        <li className="me-2">
          <a
            onClick={() => {
              setPane(EConverter.IMAGE_PDF_TO_TEXT);
              handleAnalytics(EConverter.IMAGE_PDF_TO_TEXT);
            }}
            href="#"
            className="inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300"
          >
            Image/Pdf To Text
          </a>
        </li>
        <li className="me-2">
          <a
            onClick={() => {
              setPane(EConverter.GPA);
              handleAnalytics(EConverter.GPA);
            }}
            href="#"
            className="inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300"
          >
            RGUKT GPA CALCULATE
          </a>
        </li>
      </ul>
      {component}
    </>
  );
};
export default TabbedNav;
