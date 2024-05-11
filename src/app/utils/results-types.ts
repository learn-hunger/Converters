import { EGrades } from "./results-constants";

export interface ISemResult {
  results: ISubject[];
  sGpa: number;
  sem: string;
}

export interface ISubject {
  year: string;
  branch: string;
  subject: string;
  subjectCode: string;
  grade: keyof typeof EGrades;
  credits: number | null;
}

export interface ISetCredits {
  semIndex: number;
  subjectIndex: number;
  credits: ISubject["credits"];
}
