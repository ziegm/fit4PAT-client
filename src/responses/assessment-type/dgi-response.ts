import {AssessmentResponse} from "../assessment-response";

/**
 * Specific questionnaire response for the Dgi assessment.
 */
export class DgiResponse extends AssessmentResponse {

  constructor() {
    // Super constructor takes the number of answers of an assessment
    super(10);
  }

  /**
   * Sets the specific type of this assessment.
   */
  protected setAssessmentType() {
    this.identifier = {type: {text: "Dynamic Gait Index"}}
  }

  /**
   * Default answers of this assessment.
   */
  protected defaultAnswers(): void {
    this.item[8].addAnswer("keine");
    this.item[9].addAnswer("-");
  }
}
