import { useEffect, useRef, useState } from "react";
import { extractTextFromImg } from "../../shared/functions/img-extract";
import { extractTextFromPDF } from "../../shared/functions/pdfextract";
import handleAnalytics from "../../results/utils/analytics";
import {
  analytics,
  EAnalytics,
} from "../../results/utils/converters-constants";

const ImageToText = () => {
  const outputTextRef = useRef<HTMLTextAreaElement>(null);
  const [outputText, setOutputText] = useState("");
  useEffect(() => {
    const textarea = outputTextRef.current;
    if (textarea) {
      // Reset height to auto to shrink if necessary
      textarea.style.height = "auto";
      // Set height to scrollHeight to fit all content
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [outputText]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files?.length > 0) {
      Object.keys(files).forEach(async (i: string, index: number) => {
        const pdfProcessing = () => {
          const reader = new FileReader();
          reader.readAsArrayBuffer(files[index]);
          reader.onload = async (event) => {
            const result = event.target?.result;
            if (result && result instanceof ArrayBuffer) {
              const typedarray = new Uint8Array(result);
              try {
                const text = await extractTextFromPDF(typedarray);
                setOutputText(text);
                handleAnalytics(analytics[EAnalytics.TEXT_PDF_SUCCESS]);
              } catch (err) {
                const analyticsData = Object.assign(
                  {},
                  analytics[EAnalytics.TEXT_PDF_ERROR],
                );
                analyticsData.data = err as string;
                handleAnalytics(analyticsData);
                window.alert(`I think ${files[index].name} was not supported`);
              }
            }
          };
        };
        const imageProcessing = async () => {
          try {
            const page = await extractTextFromImg(files[index]);
            const text = page.lines.map((i) => {
              return i.text;
            });
            setOutputText(text.join(""));
            handleAnalytics(analytics[EAnalytics.TEXT_IMAGE_SUCCESS]);
          } catch (err) {
            const analyticsData = Object.assign(
              {},
              analytics[EAnalytics.TEXT_IMAGE_ERROR],
            );
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

  const copyToClipboard = async () => {
    if (outputTextRef.current) {
      if (document.execCommand) {
        outputTextRef.current.select();
        document.execCommand("copy");
      } else if (navigator.clipboard.writeText) {
        try {
          await navigator.clipboard.writeText(outputTextRef.current.value);
        } catch (err) {}
      }
    }
  };
  return (
    <div className="container relative m-auto" style={{ overflowX: "hidden" }}>
      <div className="p-10 m-auto">
        <div>
          <input
            type="file"
            accept=".pdf,.png,.jpeg,.jpg"
            multiple
            onChange={handleFileUpload}
          />
        </div>
      </div>
      <div style={{ width: "100%" }} className="relative">
        <button
          className="absolute right-0 border border-black p-1 bg-gray-800 text-white rounded"
          onClick={copyToClipboard}
        >
          Copy
        </button>
        <textarea
          style={{ width: "100%", margin: "auto", display: "block" }}
          ref={outputTextRef}
          value={outputText}
        />
      </div>
    </div>
  );
};

export default ImageToText;
