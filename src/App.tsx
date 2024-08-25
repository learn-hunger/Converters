import TagManager from "react-gtm-module";
import "./App.css";
import TabbedNav from "./Tabbed-nav";
function App() {
  const tagManagerArgs = {
    gtmId: "GTM-K8F8DGJR",
    dataLayer: {
      event: "initialised",
    },
  };

  TagManager.initialize(tagManagerArgs);
  return <TabbedNav />;
}

export default App;
