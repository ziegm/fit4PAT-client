import {AssessmentResponse} from "../assessment-response";

export class DgiResponse extends AssessmentResponse {

  constructor() {
    super(10);
  }

  protected setAssessmentType() {
    this.identifier = {type: {text: "Dynamic Gait Index"}}
  }

  protected defaultAnswers(): void {
    this.item[8].addAnswer("keine");
    this.item[9].addAnswer("-");
  }
}
