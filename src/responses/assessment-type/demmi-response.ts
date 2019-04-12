import {AssessmentResponse} from "../assessment-response";

export class DemmiResponse extends AssessmentResponse {

  constructor() {
    super(17);
  }

  protected setAssessmentType() {
    this.identifier = {type: {text: "de Morton Mobility Index"}}
  }

  protected defaultAnswers(): void {
    this.item[15].addAnswer("keine");
    this.item[16].addAnswer("-");
  }
}
