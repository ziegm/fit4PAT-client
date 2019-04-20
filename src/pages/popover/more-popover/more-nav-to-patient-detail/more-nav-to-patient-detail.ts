import {Component} from '@angular/core';
import {NavController, NavParams, ViewController} from 'ionic-angular';
import {PatientDetailPage} from "../../../patients/patient-detail/patient-detail";
import {WorkflowPage} from "../../../../workflow/workflow-page";

@Component({
  selector: 'page-more-nav-to-patient-detail',
  templateUrl: 'more-nav-to-patient-detail.html',
})
export class MoreNavToPatientDetailPage extends WorkflowPage {

  constructor(private navController: NavController, private viewCtrl: ViewController, navParams: NavParams) {
    super(navParams.data);
  }

  private navToPatientDetail(): void {
    this.navController.push(PatientDetailPage, this.workflowParameters);
    this.viewCtrl.dismiss();
  }
}
