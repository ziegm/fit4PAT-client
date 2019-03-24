import {Component, Input} from '@angular/core';
import {RestProvider} from "../../providers/rest/rest";
import {WorkflowSelector} from "../../workflow/workflow-selector";
import {NavController} from "ionic-angular";
import {AssessmentForm} from "../../pages/assessments/assessment-forms/assessment-form";
import {FormDgiPage} from "../../pages/assessments/assessment-forms/form-dgi/form-dgi";
import Patient = fhir.Patient;
import Bundle = fhir.Bundle;


@Component({
  selector: 'patient-stationary-list',
  templateUrl: 'patient-stationary-list.html'
})
export class PatientStationaryListComponent {

  private patients: Patient[] = [];
  @Input() ward: string;
  private noPatientMessage = "";
  @Input() workflowSelector: WorkflowSelector;

  constructor(private restProvider: RestProvider, private navCtrl: NavController) {

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
          return this.viewPatientStationary(a) > this.viewPatientStationary(b) ? 1 : -1;
        })
      });
  }

  viewPatientStationary(patient: Patient): string {
    const roomIdentifier = patient.identifier.filter(identifier => identifier.type.text === "room")[0];
    const gender = patient.gender === "female" ? "w" : "m";
    const birthDate = new Date(patient.birthDate).toLocaleDateString("de-CH");
    const caseId = patient.identifier.filter(identifier => identifier.type.text === "case-id")[0];
    return this.room(roomIdentifier) + patient.name[0].family + " " + patient.name[0].given[0] + ", " +
      gender + ", " + birthDate + ", " + caseId.value + " (Fall-ID)";
  }

  room(room: fhir.Identifier): string {
    return room.value === undefined ? "" : room.value +": ";
  }

  takeOverPatient(patient:Patient) {
    this.popUntilPageType('AssessmentForm');
  }

  popUntilPageType(type: string): void {
    let viewController = this.navCtrl.getViews().find((view) => view.component.name === 'FormDgiPage');
    this.navCtrl.popTo(viewController);
  }
}

