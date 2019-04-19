import {Component, Input} from '@angular/core';
import {RestProvider} from "../../../providers/rest/rest";
import {App, NavController, ViewController} from "ionic-angular";
import {AssessmentFormList} from "../../../pages/assessments/assessment-forms/assessment-form-list";
import {PatientHelper} from "../patient-helper";
import {FormDgiPage} from "../../../pages/assessments/assessment-forms/form-dgi/form-dgi";
import {FormDemmiPage} from "../../../pages/assessments/assessment-forms/form-demmi/form-demmi";
import {FormWalkingtestPage} from "../../../pages/assessments/assessment-forms/form-walkingtest/form-walkingtest";
import {PatientDetailPage} from "../../../pages/patients/patient-detail/patient-detail";
import {WorkflowParameters} from "../../../workflow/workflow-parameters";
import {WorkflowSelector} from "../../../workflow/workflow-selector";
import Patient = fhir.Patient;
import Bundle = fhir.Bundle;


@Component({
  selector: 'patient-list',
  templateUrl: 'patient-list.html'
})
export class PatientListComponent {
  private patients: Patient[] = [];

  @Input() private ward: string;
  private noPatientMessage = "";
  @Input() private workflowParameters: WorkflowParameters;
  private rootNav: any;
  @Input() private search = "";

  constructor(private restProvider: RestProvider, private navCtrl: NavController, app: App) {
    this.rootNav = app.getRootNav();
  }

  private ngOnChanges(): void {
    this.getPatients(this.search);
  }

  private getPatients(searchParam?: string): void {
    this.patients = [];
    this.restProvider.getPatients(this.ward, searchParam)
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
          return this.viewPatientName(a) > this.viewPatientName(b) ? 1 : -1;
        })
      });
  }

  private viewPatientName(patient:Patient) {
    return PatientHelper.viewPatientName(patient);
  }
  private viewPatientInfos(patient:Patient) {
    return PatientHelper.viewPatientInfos(patient);
  }

  private takeOverPatient(patient: Patient) {
    switch (this.workflowParameters.workflowSelector) {
      case WorkflowSelector.FromAssessment:
        this.patientToAssessment(patient);
      break;
      case WorkflowSelector.FromPatient:
        this.workflowParameters.patient = patient;
        this.rootNav.push(PatientDetailPage, this.workflowParameters);
      break;
    }
  }

  private patientToAssessment(patient: Patient) {
    this.workflowParameters.patient = patient;
    let viewController: ViewController = this.navCtrl.getViews().find((view) =>
      AssessmentFormList.isAssessmentForm(view));
    this.navToAssessmentForm(viewController);
  }

  private navToAssessmentForm(viewController: ViewController) {
    if(viewController.component.name === "FormDgiPage") {
      this.rootNav.push(FormDgiPage, this.workflowParameters);
    } else if(viewController.component.name === "FormDemmiPage") {
      this.rootNav.push(FormDemmiPage, this.workflowParameters);
    } else {
      this.rootNav.push(FormWalkingtestPage, this.workflowParameters);
    }
  }

  private filter(search: string): void {
    if (search) {
      this.patients = this.patients.filter(patient => {
        return PatientHelper.viewPatientName(patient).toLowerCase().includes(search.toLowerCase());
      });
    }
  }
}
