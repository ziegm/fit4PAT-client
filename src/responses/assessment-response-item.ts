import QuestionnaireResponseItem = fhir.QuestionnaireResponseItem;
import QuestionnaireResponseItemAnswer = fhir.QuestionnaireResponseItemAnswer;
import {NumberResponseItemAnswer} from "./number-response-item-answer";
import {StringResponseItemAnswer} from "./string-response-item-answer";

/**
 * Implementing the fhir type definition QuestionnaireResponseItem for usage as class in this project.
 */
export class AssessmentResponseItem implements QuestionnaireResponseItem {
  answer: QuestionnaireResponseItemAnswer[] = [];
  linkId: string;

  /**
   * Construct a new AssessmentResponseItem with its item id.
   * @param linkId    The item link id in the format itemXX.
   */
  constructor(linkId: string) {
    this.linkId = linkId;
  }

  /**
   * Add an answer to an AssessmentResponseItem
   * @param answer    The answer given to a AssessmentResponseItem.
   */
  addAnswer(answer: number): void;
  addAnswer(answer: string): void;
  addAnswer(answer): void {
    if (answer !== undefined) {
      if (typeof answer === "string") {
        this.answer[0] = new StringResponseItemAnswer(answer);
      } else if (typeof answer === "number") {
        this.answer[0] = new NumberResponseItemAnswer(parseInt(answer.toString()));
      }
    }
  }
}
