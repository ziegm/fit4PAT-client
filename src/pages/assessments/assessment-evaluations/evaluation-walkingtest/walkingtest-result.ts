import {AssessmentResponse} from "../../../../responses/assessment-response";

/**
 * The result calculation of Walkingtests result value.
 */
export class WalkingtestResult {

  /**
   * Returns the value of a try of an assessment response by its iteration.
   * @param iteration             The iteration number (0 - 2).
   * @param assessmentResponse    The assessment response.
   */
  public static try(iteration: number, assessmentResponse: AssessmentResponse): number {
    return assessmentResponse.item[iteration].answer[0].valueInteger;
  }

  /**
   * Calculates the average duration of all three tries of a walking test.
   * @param assessmentResponse    The assessment response.
   */
  public static calcAverage(assessmentResponse: AssessmentResponse): number {
    return (WalkingtestResult.try(0, assessmentResponse)
      + WalkingtestResult.try(1, assessmentResponse)
      + WalkingtestResult.try(2, assessmentResponse)) / 3;
  }

  /**
   * Calculates the rounded average duration of all three tries of a walking test.
   * @param assessmentResponse    The assessment response.
   */
  public static calcAverageRounded(assessmentResponse: AssessmentResponse): string {
    return WalkingtestResult.calcAverage(assessmentResponse).toFixed(0);
  }

  /**
   * Calculates the speed of the average of all three tries of a walking test.
   * @param assessmentResponse    The assessment response.
   */
  public static calcSpeed(assessmentResponse: AssessmentResponse): string {
    return (1 / (WalkingtestResult.calcAverage(assessmentResponse) / 6)).toFixed(2);
  }
}
