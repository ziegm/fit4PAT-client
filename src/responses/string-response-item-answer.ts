import QuestionnaireResponseItemAnswer = fhir.QuestionnaireResponseItemAnswer;

/**
 * Implementing the fhir type defnitition QuestionnaireResponseItemAnswer for usage as class in this project.
 */
export class StringResponseItemAnswer implements QuestionnaireResponseItemAnswer {
  valueString: string;

  /**
   * Construct a new answer. Since we only need string answers, we only use the
   * valueString instance variable.
   *
   * @param valueString    The value of the answer
   */
  constructor(valueString: string) {
    this.valueString = valueString;
  }
}
