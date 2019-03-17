import {Component, Input} from '@angular/core';
import {RestProvider} from "../../providers/rest/rest";
import Patient = fhir.Patient;
import Bundle = fhir.Bundle;

/**
 * Generated class for the PatientStationaryListComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'patient-stationary-list',
  templateUrl: 'patient-stationary-list.html'
})
export class PatientStationaryListComponent {

  private patients: Patient[] = [];
  @Input() ward: string;

  constructor(private restProvider: RestProvider) {
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
        }
        this.patients.sort((a: Patient, b: Patient) => {
          return this.viewPatientStationary(a) > this.viewPatientStationary(b) ? 1 : -1;
        })
      });
  }

  viewPatientStationary(patient: Patient): string {
    const room = patient.identifier.filter(identifier => identifier.type.text === "room")[0];
    const gender = patient.gender === "female" ? "w" : "m";
    const birthDate = new Date(patient.birthDate).toLocaleDateString("de-CH");
    const caseId = patient.identifier.filter(identifier => identifier.type.text === "case-id")[0];
    return room.value + ": " + patient.name[0].family + " " + patient.name[0].given[0] + ", " +
      gender + ", " + birthDate + ", " + caseId.value + " (Fall-ID)";
  }
}

