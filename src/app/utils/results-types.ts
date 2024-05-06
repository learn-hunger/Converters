import { EGrades } from "./results-constants";


export interface ISemResult {
    results: ISemSubjects,
    sGpa: number,
}
export interface ISemResultObject {
    [key: number]: ISemResult
}
export interface ISemSubjects {
    [key: number]: ISubject
}
export interface ISubject {
    year: string,
    branch: string,
    subject: string,
    subjectCode: string,
    grade: keyof typeof EGrades,
    credits: number | null,
}

