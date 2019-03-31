import {Component} from '@angular/core';
import {IonicPage, NavParams} from 'ionic-angular';
import {PatientHelper} from "../../../../components/patient/patient-helper";
import Patient = fhir.Patient;


@IonicPage()
@Component({
  selector: 'page-evaluation-dgi',
  templateUrl: 'evaluation-dgi.html',
})
export class EvaluationDgiPage {
  private patient: Patient;

  constructor(navParams: NavParams) {
    this.patient = navParams.data;
  }

  private viewPatient(patient: Patient) {
    return PatientHelper.viewPatient(patient);
  }

  openLink(){
    window.open('https://www.sralab.org/rehabilitation-measures/dynamic-gait-index', '_system');
  }
}
