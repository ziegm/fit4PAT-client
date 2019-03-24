import { Component } from '@angular/core';
import {App, NavParams} from "ionic-angular";
import {PatientTabPage} from "../../pages/patients/patient-tab/patient-tab";
import {WorkflowPage} from "../../workflow/workflow-page";

@Component({
  selector: 'patient-selector',
  templateUrl: 'patient-selector.html'
})
export class PatientSelectorComponent extends WorkflowPage {

  private rootNav: any;

  constructor(private app: App, navParams: NavParams) {
    super(navParams);
    this.rootNav = app.getRootNav();
  }

  navToPatientTab() {
    this.rootNav.push(PatientTabPage, this.workflowSelector);
  }

}
