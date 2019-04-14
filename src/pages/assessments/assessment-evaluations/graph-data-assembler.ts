import {AssessmentResponse} from "../../../responses/assessment-response";
import {ChartPoint} from "chart.js";


export class GraphDataAssembler {

  public static assemble(responses: AssessmentResponse[],
                         executeDate: (response: AssessmentResponse) => Date,
                         calcValue: (response: AssessmentResponse) => number): ChartPoint[] {
    return responses.map((response) => {
      const bla = calcValue(response);
      return {
        x: executeDate(response),
        y: calcValue(response)
      }
    });
  }
}
