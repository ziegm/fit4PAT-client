import {Injectable} from '@angular/core';
import {App, NavController, ViewController} from "ionic-angular";
import {AssessmentFormList} from "../../pages/assessments/assessment-forms/assessment-form-list";
import {FormDgiPage} from "../../pages/assessments/assessment-forms/form-dgi/form-dgi";
import {FormDemmiPage} from "../../pages/assessments/assessment-forms/form-demmi/form-demmi";
import {FormWalkingtestPage} from "../../pages/assessments/assessment-forms/form-walkingtest/form-walkingtest";
import {WorkflowParameters} from "../../workflow/workflow-parameters";

@Injectable()
export class PatientToAssessmentNavProvider {
  private rootNav: any;

  constructor(app: App) {
    this.rootNav = app.getRootNav();
  }

  public navToAssessment(workflowParameters: WorkflowParameters, navCtrl: NavController) {
    let viewController: ViewController = navCtrl.getViews().find((view) =>
      AssessmentFormList.isAssessmentForm(view));
    this.navToAssessmentForm(viewController, workflowParameters);
  }

  private navToAssessmentForm(viewController: ViewController, workflowParameters: WorkflowParameters) {
    if(viewController.component.name === "FormDgiPage") {
      this.rootNav.push(FormDgiPage, workflowParameters);
    } else if(viewController.component.name === "FormDemmiPage") {
      this.rootNav.push(FormDemmiPage, workflowParameters);
    } else {
      this.rootNav.push(FormWalkingtestPage, workflowParameters);
    }
  }
}
