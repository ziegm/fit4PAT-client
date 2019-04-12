import {AssessmentResponse} from "../assessment-response";

export class WalkingtestResponse extends AssessmentResponse {

  constructor() {
    super(5);
  }

  protected setAssessmentType() {
    this.identifier = {type: {text: "Timed Walking Test"}}
  }

  protected defaultAnswers(): void {
    this.item[3].addAnswer("keine");
    this.item[4].addAnswer("-");
  }
}
