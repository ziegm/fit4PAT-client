import {AssessmentResponse} from "../../../../responses/assessment-response";

/**
 * The result calculation of Demmis result value.
 */
export class DemmiResult {
  /**
   * Calculates the raw result of a Demmi.
   * @param assessmentResponse    The assessment response.
   */
  public static calcRawValue(assessmentResponse: AssessmentResponse): number {
      return DemmiResult.answers(assessmentResponse).reduce((accumulator, currentValue) => {
        return accumulator + currentValue;
      });
  }

  /**
   * Retrieves the numerical answers of the Demmi.
   * @param assessmentResponse    The assessment response.
   */
  private static answers(assessmentResponse: AssessmentResponse): number[] {
    return assessmentResponse.item.map((item, index) => {
      // Filters out the non numeric answers like comment etc.
      if (index < 15 && item.answer !== undefined && item.answer[0].valueInteger !== undefined) {
        return +item.answer[0].valueInteger.toFixed(0);
      } else {
        return 0;
      }
    });
  }
}
