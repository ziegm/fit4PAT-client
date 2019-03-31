import {AssessmentResponse} from "../assessment-response";

export class WalkingtestResponse extends AssessmentResponse {

  protected setAssessmentType() {
    this.identifier = {type: {text: "Timed Walking Test"}}
  }
}
