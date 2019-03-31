import {AssessmentResponse} from "../assessment-response";

export class DgiResponse extends AssessmentResponse {

  protected setAssessmentType() {
    this.identifier = {type: {text: "Dynamic Gait Index"}}
  }
}
