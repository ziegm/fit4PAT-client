import {Component} from '@angular/core';
import {NavController, NavParams, ViewController} from 'ionic-angular';
import {PatientDetailPage} from "../../../patients/patient-detail/patient-detail";
import {WorkflowPage} from "../../../../workflow/workflow-page";
import {NoPatientErrorProvider} from "../../../../providers/no-patient-error/no-patient-error";

@Component({
  selector: 'page-more-nav-to-patient-detail',
  templateUrl: 'more-nav-to-patient-detail.html',
})
export class MoreNavToPatientDetailPage extends WorkflowPage {

  constructor(private navController: NavController, private viewCtrl: ViewController, navParams: NavParams,
              private noPatient: NoPatientErrorProvider) {
    super(navParams.data);
  }

  private navToPatientDetail(): void {
    if (this.noPatient.hasPatient(this.workflowParameters.patient)) {
      this.navController.push(PatientDetailPage, this.workflowParameters);
    }
    this.viewCtrl.dismiss();
  }
}
