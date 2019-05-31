import {AssessmentResponse} from "../../../responses/assessment-response";
import {ChartPoint} from "chart.js";

/**
 * Converts the assessment response to chart points for the evaluation graph.
 */
export class GraphDataAssembler {
  /**
   * Returns an array of chart points where the x- and y-coordinates are calculated by the
   * functions executeDate and calcValue.
   * @param responses     The assessment response object.
   * @param executeDate   A closure calculating the execution date of the assessment for the x-axis.
   * @param calcValue     A closure calculating the evaluation result of the assessment for the y-axis.
   */
  public static assemble(responses: AssessmentResponse[],
                         executeDate: (response: AssessmentResponse) => Date,
                         calcValue: (response: AssessmentResponse) => number): ChartPoint[] {
    return responses.map((response) => {
      return {
        x: executeDate(response),
        y: calcValue(response)
      }
    });
  }
}
