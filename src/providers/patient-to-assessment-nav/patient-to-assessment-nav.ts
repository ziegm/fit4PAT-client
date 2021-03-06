import {Injectable} from '@angular/core';
import {App, NavController, ViewController} from "ionic-angular";
import {AssessmentFormList} from "../../pages/assessments/assessment-forms/assessment-form-list";
import {FormDgiPage} from "../../pages/assessments/assessment-forms/form-dgi/form-dgi";
import {FormDemmiPage} from "../../pages/assessments/assessment-forms/form-demmi/form-demmi";
import {FormWalkingtestPage} from "../../pages/assessments/assessment-forms/form-walkingtest/form-walkingtest";
import {WorkflowParameters} from "../../workflow/workflow-parameters";

/**
 * Decides which assessment form to navigate to, after a patient was selected.
 * The decision is based on the assessment form, the user has come from.
 */
@Injectable()
export class PatientToAssessmentNavProvider {
  private rootNav: any;

  constructor(app: App) {
    this.rootNav = app.getRootNav();
  }

  /**
   * Finds the assessment form, a user comes from, in the view list and decides to which assessment
   * form to go next.
   * @param workflowParameters  The workflow parameters, to be passed to the assessment form.
   * @param navCtrl             The navigation controller, to get the view list from.
   */
  public navToAssessment(workflowParameters: WorkflowParameters, navCtrl: NavController): void {
    let viewController: ViewController = navCtrl.getViews().find((view) =>
      AssessmentFormList.isAssessmentForm(view));
    this.navToAssessmentForm(viewController, workflowParameters);
  }

  /**
   * Decides by the assessment forms name, to which assessment form to navigate next.
   * @param viewController      The view controller of the assessment form, where the user comes from.
   * @param workflowParameters  The workflow parameters, to be passed to the assessment form.
   */
  private navToAssessmentForm(viewController: ViewController, workflowParameters: WorkflowParameters): void {
    if(viewController.component.name === "FormDgiPage") {
      this.rootNav.push(FormDgiPage, workflowParameters);
    } else if(viewController.component.name === "FormDemmiPage") {
      this.rootNav.push(FormDemmiPage, workflowParameters);
    } else {
      this.rootNav.push(FormWalkingtestPage, workflowParameters);
    }
  }
}
