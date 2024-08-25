import TagManager from "react-gtm-module";
import { IAnalytics } from "./converters-types";

const handleAnalytics = (event: IAnalytics) => {
  TagManager.dataLayer({
    dataLayer: event,
  });
};
export default handleAnalytics;
