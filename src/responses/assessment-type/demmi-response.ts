import {AssessmentResponse} from "../assessment-response";

/**
 * Specific questionnaire response for the Demmi assessment.
 */
export class DemmiResponse extends AssessmentResponse {

  constructor() {
    // Super constructor takes the number of answers of an assessment
    super(17);
  }

  /**
   * Sets the specific type of this assessment.
   */
  protected setAssessmentType(): void {
    this.identifier = {type: {text: "de Morton Mobility Index"}}
  }

  /**
   * Default answers of this assessment.
   */
  protected defaultAnswers(): void {
    this.item[15].addAnswer("keine");
    this.item[16].addAnswer("-");
  }
}
