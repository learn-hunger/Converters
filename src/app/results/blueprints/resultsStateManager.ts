import { gradeMap } from "../../utils/results-constants";
import { ISemResultObject, ISemSubjects, ISubject } from "../../utils/results-types";

export class ResultsStateManager {
    public static result: ISemResultObject = {};

    public addResult(result: ISemSubjects): void {
        const semResult = ResultsStateManager.result
        semResult[Object.keys(semResult).length] = {
            results: result,
            sGpa: this.sGpaCalculator(result)
        }
    }

    private sGpaCalculator(result: ISemSubjects): number {
        let sum = 0;
        let totalCredits = 0;
        Object.values(result).forEach((i: ISubject) => {
            sum += i.credits ? i.credits * gradeMap[i.grade] : 0;
            totalCredits += i.credits ? i.credits * 10 : 0;
        })
        const sGpa = (sum / totalCredits) * 10;
        return sGpa;
    }
    public getResult(index: number) {
        return ResultsStateManager.result[index];
    }
    public removeSemResult(index: number) {
        delete ResultsStateManager.result[index];
    }
}