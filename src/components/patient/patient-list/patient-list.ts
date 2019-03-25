import {Component, Input} from '@angular/core';
import {RestProvider} from "../../../providers/rest/rest";
import {WorkflowSelector} from "../../../workflow/workflow-selector";
import {App, NavController, ViewController} from "ionic-angular";
import {AssessmentFormList} from "../../../pages/assessments/assessment-forms/assessment-form-list";
import {PatientHelper} from "../patient-helper";
import {FormDgiPage} from "../../../pages/assessments/assessment-forms/form-dgi/form-dgi";
import {FormDemmiPage} from "../../../pages/assessments/assessment-forms/form-demmi/form-demmi";
import {FormWalkingtestPage} from "../../../pages/assessments/assessment-forms/form-walkingtest/form-walkingtest";
import Patient = fhir.Patient;
import Bundle = fhir.Bundle;


@Component({
  selector: 'patient-list',
  templateUrl: 'patient-list.html'
})
export class PatientListComponent {
  private patients: Patient[] = [];
  @Input() ward: string;
  private noPatientMessage = "";
  @Input() workflowSelector: WorkflowSelector;
  private rootNav: any;

  constructor(private restProvider: RestProvider, private navCtrl: NavController, app: App) {
    this.rootNav = app.getRootNav();
  }

  ngOnChanges() {
    this.getPatients();
  }

  getPatients() {
    this.restProvider.getPatients(this.ward)
      .then(data => {
        if((data as Bundle).entry !== undefined) {
          (data as Bundle).entry.forEach(entry =>{
            this.patients.push(entry.resource as Patient);
          });
        } else {
          this.patients = [];
          this.noPatientMessage = "Es existieren momentan keine Patienten mit Physiotherapie-Verordnung.";
        }
        this.patients.sort((a: Patient, b: Patient) => {
          return this.viewPatient(a) > this.viewPatient(b) ? 1 : -1;
        })
      });
  }

  private viewPatient(patient:Patient) {
    return PatientHelper.viewPatient(patient);
  }

  private takeOverPatient(patient:Patient) {
    let viewController:ViewController = this.navCtrl.getViews().find((view) =>
      AssessmentFormList.isAssessmentForm(view));
    this.navToAssessmentForm(viewController, patient);
  }

  private navToAssessmentForm(viewController:ViewController, patient:Patient) {
    if(viewController.component.name === "FormDgiPage") {
      this.rootNav.push(FormDgiPage, patient);
    } else if(viewController.component.name === "FormDemmiPage") {
      this.rootNav.push(FormDemmiPage, patient);
    } else {
      this.rootNav.push(FormWalkingtestPage, patient);
    }
  }
}
