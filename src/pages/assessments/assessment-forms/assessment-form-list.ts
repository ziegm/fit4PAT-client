import {ViewController} from "ionic-angular";

export class AssessmentFormList {
  private static readonly assessmentForms:[string] = ["FormDemmiPage", "FormDgiPage", "FormWalkingtestPage"];

  public static isAssessmentForm(viewController:ViewController) : boolean {
    return this.assessmentForms.find((form) => viewController.component.name === form) !== undefined;
  }
}
