import { ISubject } from "./results-types";

const gradesRegex = /(?<=(.*?))(Ex|A|B|C|D|P|WH|R|F|AB|MP)$/;
const subjectCodeRegex = /(.*)(?=(Ex|A|B|C|D|P|WH|R|F|AB|MP)$)/;
const branchRegex = /(CSE|ECE|EEE|MECH|CIVIL|CHEM)(?=(.*?))/;
const subjectRegex = /(?<=(CSE|ECE|EEE|MECH|CIVIL|CHEM))(.*?)(?=(\d))/;
const level1Regex = /(?<=Grade\n)[\s\S]*?(.*?)(?=\nP=PASS)/;

const imgSubCodeRegx = /(\d{2}\w+\d{2})/;
const imgCreditsRegex = /(?<=.+)(\d\.?\d?)/;
const imgSubRegex = /((\w{3,}\s)+)/;
const imgGradeRegex = /(Ex|A|B|C|D|P|WH|R|F|AB|MP|€|8|fri|E)(?=\s*$)/;

export { imgCreditsRegex, imgGradeRegex, imgSubCodeRegx, imgSubRegex };

export const imgSubRowDefaultValues: ISubject = {
  year: "Engineering",
  branch: "branch",
  subject: "subject",
  subjectCode: "subjectCode",
  grade: null,
  credits: null,
};
enum EGrades {
  Ex,
  A,
  B,
  C,
  D,
  R,
  MP,
  F,
  WH,
  P,
}

export enum EErrorMessages {
  CGPA = "Add pdf",
}

export enum EOtherVariables {
  SGPA_FIXED = 2,
  CGPA_FIXED = 2,
  IMG_ROW_MIN_LENGTH = 6,
}

//TODO DRY CODE NEEDED HERE
const gradeMap: Record<keyof typeof EGrades, number> = {
  Ex: 10,
  A: 9,
  B: 8,
  C: 7,
  D: 6,
  R: 0,
  MP: 0,
  F: 0,
  WH: 0,
  P: 0,
};

export const zeroCredits: Partial<Record<keyof typeof EGrades, number>> = {
  R: 0,
  MP: 0,
  F: 0,
  WH: 0,
  P: 0,
};

export const formClassNames = {
  collapse: "hidden md:block sm:hidden ",
  subjectName: "col-span-2 ",
  rowColors: ["bg-red-500", "bg-blue-500"],
  common: "border border-gray-900 text-center ",
};

export {
  EGrades,
  branchRegex,
  gradeMap,
  gradesRegex,
  level1Regex,
  subjectCodeRegex,
  subjectRegex,
};

export const subjectCredits: { [key: string]: number } = {
  "20MA1102": 4,
  "20EE1109": 4,
  "20CS1101": 4,
  "20ME1114": 2.5,
  "20EG1181": 2.5,
  "20EE1189": 1.5,
  "20CS1181": 1.5,
  "20HS1101": 0,
  "20MA1202": 4,
  "20PY1201": 4,
  "20BM1201": 3,
  "20CS1201": 4,
  "20CS1202": 3,
  "20PY1281": 1.5,
  "20CS1281": 1.5,
  "20CS1282": 1.5,
  "20BE1201": 0,
  "20MA2102": 4,
  "20EC2110": 3,
  "20CS2101": 4,
  "20CS2102": 3,
  "20CS2103": 3,
  "20CS2181": 1.5,
  "20EC2180": 1.5,
  "20CS2182": 1.5,
  "20BM2202": 3,
  "20CS2201": 3,
  "20CS2202": 3,
  "20CS2203": 3,
  "20CS2204": 3,
  "20CS2281": 1.5,
  "20CS2282": 1.5,
  "20CS2283": 1.5,
  "20CS3101": 3,
  "20CS3102": 3,
  "20CS3103": 3,
  "20CS3104": 3,
  "20CS31XX": 3,
  "20CS3181": 1.5,
  "20CS3182": 1.5,
  "20CS3183": 1.5,
  "20EG3182": 1.5,
  "20CS3201": 4,
  "20CS3202": 4,
  "20CS32XX": 3,
  "20XX32XX": 3,
  EG3283: 1.5,
  "20CS3291": 3,
  "20CS3203": 0,
  "20CS3292": 3,
  "20CS4101": 4,
  "20CS41XX": 3,
  "20XX41XX": 3,
  "20CS4193": 6,
  "20CS42XX": 3,
  "20XX42XX": 3,
  "20CS4294": 6,
  "20CS4299": 2,
  "20CS3121": 3,
  "20CS3122": 3,
  "20CS3123": 3,
  "20CS3124": 3,
  "20CS3221": 3,
  "20CS3223": 3,
  "20CS3225": 3,
  "20CS3231": 3,
  "20CS3232": 3,
  "20CS3233": 3,
  "20CS3234": 3,
  "20CS3235": 3,
  "20CS4141": 3,
  "20CS4142": 3,
  "20CS4143": 3,
  "20CS4144": 3,
  "20CS4145": 3,
  "20CS4251": 3,
  "20CS4252": 3,
  "20CS4253": 3,
  "20CS4254": 3,
  "20CS4255": 3,
  "20CS4257": 3,
  "20CS4261": 3,
  "20CS4262": 3,
  "20CS4263": 3,
  "20CS4264": 3,
  "20CS4265": 3,
  "20CS4266": 3,
  "20CSXX71": 3,
  "20CSXX72": 3,
  "20CSXX73": 3,
  "20CSXX74": 3,
  "20CSXX75": 3,
  "20CSXX09": 2,
  "20CSXX89": 1.5,
  "20CSXX10": 4,
  "20CSXX08": 3,
  "20CSXX88": 1.5,
  "20CSXX11": 3,
  "20CSXX07": 3,
};
