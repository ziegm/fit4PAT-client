import {AssessmentResponse} from "../assessment-response";

/**
 * Specific questionnaire response for the Walkingtest assessment.
 */
export class WalkingtestResponse extends AssessmentResponse {

  constructor() {
    // Super constructor takes the number of answers of an assessment
    super(5);
  }

  /**
   * Sets the specific type of this assessment.
   */
  protected setAssessmentType() {
    this.identifier = {type: {text: "Timed Walking Test"}}
  }

  /**
   * Default answers of this assessment.
   */
  protected defaultAnswers(): void {
    this.item[3].addAnswer("keine");
    this.item[4].addAnswer("-");
  }
}
