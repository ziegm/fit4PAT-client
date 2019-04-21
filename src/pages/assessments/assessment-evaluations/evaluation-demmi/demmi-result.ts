import {AssessmentResponse} from "../../../../responses/assessment-response";

export class DemmiResult {
  public static calcRawValue(assessmentResponse: AssessmentResponse): number {
      return DemmiResult.answers(assessmentResponse).reduce((accumulator, currentValue) => {
        return accumulator + currentValue;
      });
  }

  public static answers(assessmentResponse: AssessmentResponse): number[] {
    return assessmentResponse.item.map((item, index) => {
      if (index < 15 && item.answer !== undefined && item.answer[0].valueInteger !== undefined) {
        return +item.answer[0].valueInteger.toFixed(0);
      } else {
        return 0;
      }
    });
  }
}
