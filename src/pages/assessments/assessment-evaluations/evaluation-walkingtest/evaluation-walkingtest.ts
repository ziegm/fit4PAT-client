import {Component} from '@angular/core';
import {IonicPage, NavParams} from 'ionic-angular';
import {PatientHelper} from "../../../../components/patient/patient-helper";
import Patient = fhir.Patient;


@IonicPage()
@Component({
  selector: 'page-evaluation-walkingtest',
  templateUrl: 'evaluation-walkingtest.html',
})
export class EvaluationWalkingtestPage {
  private patient: Patient;

  constructor(navParams: NavParams) {
    this.patient = navParams.data;
  }

  private viewPatient(patient: Patient) {
    return PatientHelper.viewPatient(patient);
  }

  openLink(){
    window.open('https://www.sralab.org/rehabilitation-measures/10-meter-walk-test', '_system');
  }
}
