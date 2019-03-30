import {AssessmentResponse} from "../assessment-response";

export class DemmiResponse extends AssessmentResponse {

  protected setAssessmentType() {
    this.identifier = {type: {text: "de Morton Mobility Index"}}
  }
}
