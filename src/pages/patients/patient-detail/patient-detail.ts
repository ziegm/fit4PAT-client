import {Component} from '@angular/core';
import {App, NavParams} from 'ionic-angular';
import {PatientHelper} from "../../../components/patient/patient-helper";
import {AssessmentTabPage} from "../../assessments/assessment-tab/assessment-tab";
import Patient = fhir.Patient;


@Component({
  selector: 'page-patient-detail',
  templateUrl: 'patient-detail.html',
})
export class PatientDetailPage {
  private rootNav: any;
  private patient: Patient;
  private isSearchbarVisible = false;

  constructor(navParams: NavParams, app: App) {
    this.patient = navParams.data;
    this.rootNav = app.getRootNav();
  }

  private viewPatient(patient:Patient) {
    return PatientHelper.viewPatient(patient);
  }

  private navToAssessmentTab() {
    this.rootNav.push(AssessmentTabPage, {patient: this.patient});
  }

  private onSearchbarVisibilityChange(isVisible: boolean): void {
    this.isSearchbarVisible = isVisible;
  }
}
