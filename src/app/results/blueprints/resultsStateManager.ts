import { gradeMap } from "../../utils/results-constants";
import { ISemResult, ISetCredits, ISubject } from "../../utils/results-types";

export class ResultsStateManager {
  public static result: ISemResult[] = [];

  public addResult(result: ISubject[]): void {
    const semResult = ResultsStateManager.result;
    semResult.push({
      results: result,
      sGpa: this.sGpaCalculator(result),
      sem: "sem" + Object.keys(semResult).length,
    });
  }

  private sGpaCalculator(result: ISubject[]): number {
    let sum = 0;
    let totalCredits = 0;
    result.forEach((i: ISubject) => {
      sum += i.credits ? i.credits * gradeMap[i.grade] : 0;
      totalCredits += i.credits ? i.credits * 10 : 0;
    });
    const sGpa = (sum / totalCredits) * 10;
    return sGpa;
  }
  public getResult(index: number) {
    return ResultsStateManager.result[index];
  }
  public removeSemResult(index: number) {
    ResultsStateManager.result.splice(index, 1);
  }

  public get getCgpa(): number {
    const cgpa = ResultsStateManager.result.reduce((sum, i) => {
      return sum + i.sGpa;
    }, 0);
    return cgpa / ResultsStateManager.result.length;
  }

  public setCredits(data: ISetCredits) {
    ResultsStateManager.result[data.semIndex].results[
      data.subjectIndex
    ].credits = data.credits;
    ResultsStateManager.result[data.semIndex].sGpa = this.sGpaCalculator(
      ResultsStateManager.result[data.semIndex].results,
    );
  }
}
