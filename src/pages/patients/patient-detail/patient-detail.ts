import {Component} from '@angular/core';
import {App, NavParams} from 'ionic-angular';
import {PatientHelper} from "../../../components/patient/patient-helper";
import {AssessmentTabPage} from "../../assessments/assessment-tab/assessment-tab";
import {FormDgiPage} from "../../assessments/assessment-forms/form-dgi/form-dgi";
import {FormWalkingtestPage} from "../../assessments/assessment-forms/form-walkingtest/form-walkingtest";
import {FormDemmiPage} from "../../assessments/assessment-forms/form-demmi/form-demmi";
import {WorkflowPage} from "../../../workflow/workflow-page";
import Patient = fhir.Patient;


@Component({
  selector: 'page-patient-detail',
  templateUrl: 'patient-detail.html',
})
export class PatientDetailPage extends WorkflowPage{
  private rootNav: any;
  private patient: Patient;
  private isSearchbarVisible = false;

  constructor(navParams: NavParams, app: App) {
    super(navParams.data);
    this.patient = navParams.data;
    this.rootNav = app.getRootNav();
  }

  private viewPatientName(patient:Patient) {
    return PatientHelper.viewPatientName(patient);
  }
  private viewPatientInfos(patient:Patient) {
    return PatientHelper.viewPatientInfos(patient);
  }

  private navToAssessmentTab() {
    this.rootNav.push(AssessmentTabPage, {patient: this.patient});
  }

  private navToDemmi() {
    this.rootNav.push(FormDemmiPage, {patient: this.patient});
  }

  private navToDgi() {
    this.rootNav.push(FormDgiPage, {patient: this.patient});
  }

  private navToWalkingtest() {
    this.rootNav.push(FormWalkingtestPage, {patient: this.patient});
  }

  private onSearchbarVisibilityChange(isVisible: boolean): void {
    this.isSearchbarVisible = isVisible;
  }
}
