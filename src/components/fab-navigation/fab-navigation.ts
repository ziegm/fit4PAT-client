import {Component, Input} from '@angular/core';
import {AssessmentTabPage} from "../../pages/assessments/assessment-tab/assessment-tab";
import {FormDemmiPage} from "../../pages/assessments/assessment-forms/form-demmi/form-demmi";
import {FormDgiPage} from "../../pages/assessments/assessment-forms/form-dgi/form-dgi";
import {FormWalkingtestPage} from "../../pages/assessments/assessment-forms/form-walkingtest/form-walkingtest";
import {App} from "ionic-angular";


@Component({
  selector: 'fab-navigation',
  templateUrl: 'fab-navigation.html'
})
export class FabNavigationComponent {

  private rootNav: any;
  @Input() private workflowParameters;

  constructor(app: App) {
    this.rootNav = app.getRootNav();
  }

  private navToAssessmentTab() {
    this.rootNav.push(AssessmentTabPage, this.workflowParameters);
  }

  private navToDemmi() {
    this.rootNav.push(FormDemmiPage, this.workflowParameters);
  }

  private navToDgi() {
    this.rootNav.push(FormDgiPage, this.workflowParameters);
  }

  private navToWalkingtest() {
    this.rootNav.push(FormWalkingtestPage, this.workflowParameters);
  }
}
