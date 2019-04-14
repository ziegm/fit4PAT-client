import {AssessmentResponse} from "../../../../responses/assessment-response";

export class WalkingtestResult {

  public static try(iteration: number, assessmentResponse: AssessmentResponse): number {
    return assessmentResponse.item[iteration].answer[0].valueInteger;
  }

  public static calcAverage(assessmentResponse: AssessmentResponse): number {
    return (WalkingtestResult.try(0, assessmentResponse)
      + WalkingtestResult.try(1, assessmentResponse)
      + WalkingtestResult.try(2, assessmentResponse)) / 3;
  }

  public static calcAverageRounded(assessmentResponse: AssessmentResponse): string {
    return WalkingtestResult.calcAverage(assessmentResponse).toFixed(0);
  }

  public static calcSpeed(assessmentResponse: AssessmentResponse): string {
    return (1 / (WalkingtestResult.calcAverage(assessmentResponse) / 6)).toFixed(2);
  }
}
