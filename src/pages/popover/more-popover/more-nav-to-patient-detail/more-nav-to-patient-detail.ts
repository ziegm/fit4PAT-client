import {Component} from '@angular/core';
import {App, NavParams, ViewController} from 'ionic-angular';
import {PatientDetailPage} from "../../../patients/patient-detail/patient-detail";
import {WorkflowPage} from "../../../../workflow/workflow-page";
import {NoPatientErrorProvider} from "../../../../providers/no-patient-error/no-patient-error";

@Component({
  selector: 'page-more-nav-to-patient-detail',
  templateUrl: 'more-nav-to-patient-detail.html',
})
/**
 * Popover with link to the already filled out assessments of a patient.
 */
export class MoreNavToPatientDetailPage extends WorkflowPage {
  private rootNav:any;

  constructor(app: App, navParams: NavParams,
              private noPatient: NoPatientErrorProvider, private viewCtrl: ViewController) {
    super(navParams.data);
    this.rootNav = app.getRootNav();
  }

  private navToPatientDetail(): void {
    if (this.noPatient.hasPatient(this.workflowParameters.patient)) {
      this.rootNav.push(PatientDetailPage, this.workflowParameters);
    }
    this.viewCtrl.dismiss();
  }
}
