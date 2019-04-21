import {Component, Input} from '@angular/core';
import {RestProvider} from "../../../providers/rest/rest";
import {App, NavController} from "ionic-angular";
import {PatientHelper} from "../patient-helper";
import {PatientDetailPage} from "../../../pages/patients/patient-detail/patient-detail";
import {WorkflowParameters} from "../../../workflow/workflow-parameters";
import {WorkflowSelector} from "../../../workflow/workflow-selector";
import {PatientToAssessmentNavProvider} from "../../../providers/patient-to-assessment-nav/patient-to-assessment-nav";
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

  constructor(private restProvider: RestProvider, private navCtrl: NavController, app: App,
              private toAssessment: PatientToAssessmentNavProvider) {
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
        this.workflowParameters.patient = patient;
        this.toAssessment.navToAssessment(this.workflowParameters, this.navCtrl);
      break;
      case WorkflowSelector.FromPatient:
        this.workflowParameters.patient = patient;
        this.rootNav.push(PatientDetailPage, this.workflowParameters);
      break;
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
