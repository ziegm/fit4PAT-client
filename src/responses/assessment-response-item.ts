import QuestionnaireResponseItem = fhir.QuestionnaireResponseItem;
import QuestionnaireResponseItemAnswer = fhir.QuestionnaireResponseItemAnswer;
import {NumberResponseItemAnswer} from "./number-response-item-answer";

/**
 * Implementing the fhir type defnitition QuestionnaireResponseItem for usage as class in this project.
 */
export class AssessmentResponseItem implements QuestionnaireResponseItem {
  answer: QuestionnaireResponseItemAnswer[] = [];
  linkId: string;

  /**
   * Construct a new AssessmentResponseItem with its item id.
   * @param linkId    The item link id in the format itemXX
   */
  constructor(linkId: string) {
    this.linkId = linkId;
  }

  /**
   * Add an answer to an AssessmentResponseItem
   * @param answer    The answer given to a AssessmentResponseItem
   */
  addAnswer(answer: number) {
    this.answer[0] = new NumberResponseItemAnswer(answer);
  }
}
