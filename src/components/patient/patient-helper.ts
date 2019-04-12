import Patient = fhir.Patient;
import * as moment from 'moment';
import {now} from 'moment';

export class PatientHelper {

  /*public static viewPatient(patient: Patient): string {
    const roomIdentifier = patient.identifier.filter(identifier => identifier.type.text === "room")[0];
    const gender = patient.gender === "female" ? "w" : "m";
    const birthDate = new Date(patient.birthDate).toLocaleDateString("de-CH");
    const caseId = patient.identifier.filter(identifier => identifier.type.text === "case-id")[0];
    return this.room(roomIdentifier) + patient.name[0].family + " " + patient.name[0].given[0] +
    ", " + gender + ", " + birthDate +" (" + this.calcAge(patient.birthDate) + "), " + caseId.value + " (Fall-ID)";
  }*/

  public static viewPatientName(patient: Patient): string {
    if (patient !== undefined) {
      const roomIdentifier = patient.identifier.filter(identifier => identifier.type.text === "room")[0];
      return this.room(roomIdentifier) + patient.name[0].family + " " + patient.name[0].given[0];
    }
    return "";
  }

  public static viewPatientInfos(patient: Patient): string {
    if (patient !== undefined) {
      const roomIdentifier = patient.identifier.filter(identifier => identifier.type.text === "room")[0];
      const gender = patient.gender === "female" ? "w" : "m";
      const options = { day: "2-digit", month: "2-digit", year: "numeric"}
      const birthDate = new Date(patient.birthDate).toLocaleDateString("de-CH", options);
      const caseId = patient.identifier.filter(identifier => identifier.type.text === "case-id")[0];
      return gender + ", " + birthDate + " (" + this.calcAge(patient.birthDate) + "), " + caseId.value + " (Fall-ID)";
    }
    return "";
  }

  private static room(room: fhir.Identifier): string {
    return room.value === undefined ? "" : room.value +": ";
  }

  private static calcAge(birthDate: string): string {
    return moment(new Date(birthDate)).locale('de-ch').fromNow(true);
  }

  public static patientAge(patient: Patient): number {
    return moment(now()).diff(moment(new Date(patient.birthDate)), 'years');
  }
}
