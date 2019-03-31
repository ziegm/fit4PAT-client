import {Component} from '@angular/core';
import {IonicPage, NavParams} from 'ionic-angular';
import {PatientHelper} from "../../../../components/patient/patient-helper";
import Patient = fhir.Patient;


@IonicPage()
@Component({
  selector: 'page-evaluation-demmi',
  templateUrl: 'evaluation-demmi.html',
})
export class EvaluationDemmiPage {
  private patient: Patient;

  constructor(navParams: NavParams) {
    this.patient = navParams.data;
  }

  private viewPatient(patient: Patient) {
    return PatientHelper.viewPatient(patient);
  }
}
