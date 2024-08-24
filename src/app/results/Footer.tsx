const Footer = () => {
  const handleClearCache = () => {
    if ("serviceWorker" in navigator) {
      console.log("serving");
      navigator.serviceWorker
        .getRegistrations()
        .then((registrations) => {
          registrations.forEach((registration) => {
            registration.active?.postMessage({ action: "CLEAR_CACHE" });
          });
        })
        .catch((error) => {
          console.error("Service worker error:", error);
        });
    }
  };

  return (
    <div style={{ position: "relative", bottom: "0" }}>
      <button
        onClick={handleClearCache}
        style={{
          float: "right",
          padding: "5",
          border: "2px solid",
          borderRadius: "5px",
        }}
      >
        Clear Cache
      </button>
    </div>
  );
};
export default Footer;
