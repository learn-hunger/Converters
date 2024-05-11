import React from "react";
import { formClassNames } from "../../utils/results-constants";
import { ISubject } from "../../utils/results-types";

const CreditModal: React.FC<{
  setCredit: (e: React.ChangeEvent<HTMLInputElement>) => void;
  data: ISubject;
}> = ({ setCredit, data }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="border border-red-900 grid grid-flow-col grid-rows-3 bg-white p-8 rounded-lg w-full max-w-xl">
        <div className="font-bold capitalize gap-0 m-0">
          <div>
            Oops! we are unable to fetch credits for this subject. enter credits
            manually
          </div>
        </div>
        <div className="font-bold uppercase grid grid-flow-row  grid-cols-4 md:grid-cols-7 sm:grid-cols-4 gap-0">
          <div className={formClassNames.collapse + formClassNames.common}>
            Year
          </div>
          <div className={formClassNames.collapse + formClassNames.common}>
            Branch
          </div>
          <div className={formClassNames.subjectName + formClassNames.common}>
            Subject Name
          </div>
          <div className={formClassNames.collapse + formClassNames.common}>
            Subject Code
          </div>
          <div className={formClassNames.common}>Grade</div>
          <div className={formClassNames.common}>Credits</div>
        </div>
        <div className="grid grid-cols-4 md:grid-cols-7 sm:grid-cols-4 gap-0">
          <div className={formClassNames.collapse + formClassNames.common}>
            {data.year}
          </div>
          <div className={formClassNames.collapse + formClassNames.common}>
            {data.branch}
          </div>
          <div className={formClassNames.subjectName + formClassNames.common}>
            {data.subject}
          </div>
          <div className={formClassNames.collapse + formClassNames.common}>
            {data.subjectCode}
          </div>
          <div className={formClassNames.common}>{data.grade}</div>
          <input
            type="number"
            className={`${formClassNames.common} border-blue-900 bg-blue-200 shadow-inner`}
            onChange={setCredit}
          />
        </div>
      </div>
    </div>
  );
};

export default CreditModal;
