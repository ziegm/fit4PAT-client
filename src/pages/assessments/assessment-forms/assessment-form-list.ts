import {ViewController} from "ionic-angular";

/**
 * Provides a check, if the page stack contains an assessment form.
 */
export class AssessmentFormList {
  private static readonly assessmentForms:[string] = ["FormDemmiPage", "FormDgiPage", "FormWalkingtestPage"];

  /**
   * Returns true if the page stack contains any of the form pages defined in the assessmentForms
   * instance variable.
   * @param viewController    The view controller.
   */
  public static isAssessmentForm(viewController: ViewController): boolean {
    return this.assessmentForms.find((form) => viewController.component.name === form) !== undefined;
  }
}
