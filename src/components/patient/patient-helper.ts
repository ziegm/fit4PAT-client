import Patient = fhir.Patient;
import * as moment from 'moment';
import {now} from 'moment';

/**
 * Helper for transforming a fhir patient resource into displayable representations.
 */
export class PatientHelper {

  /**
   *  View representation of a patient in the format:
   *  [Room:] Family name, given name
   *  If no patient is selected an empty string is returned.
   * @param patient   The patient to be represented.
   */
  public static viewPatientName(patient: Patient): string {
    if (patient !== undefined) {
      const roomIdentifier = patient.identifier.filter(identifier => identifier.type.text === "room")[0];
      return this.room(roomIdentifier) + patient.name[0].family + " " + patient.name[0].given[0];
    }
    return "";
  }

  /**
   * View representation of a patients additional information in the format:
   * Gender, birthdate (age), case id (Fall-ID)
   * If no patient is selected an empty string is returned.
   * @param patient   The patient to be represented.
   */
  public static viewPatientInfos(patient: Patient): string {
    if (patient !== undefined) {
      const roomIdentifier = patient.identifier.filter(identifier => identifier.type.text === "room")[0];
      const gender = patient.gender === "female" ? "w" : "m";
      const options = { day: "2-digit", month: "2-digit", year: "numeric"}
      const birthDate = new Date(patient.birthDate).toLocaleDateString("de-CH", options);
      const caseId = patient.identifier.filter(identifier => identifier.type.text === "case-id")[0];
      return gender + ", " + birthDate + " (" + this.patientAge(patient) + " Jahre), " + caseId.value + " (Fall-ID)";
    }
    return "";
  }

  /**
   * Returns a room with colon and space if it exists. Otherwise an empty string is returned.
   * @param room    The room identifier.
   */
  private static room(room: fhir.Identifier): string {
    return room.value === undefined ? "" : room.value + ": ";
  }

  /**
   * Calculates and returns the patients age.
   * @param patient
   */
  public static patientAge(patient: Patient): number {
    return moment(now()).diff(moment(new Date(patient.birthDate)), 'years');
  }
}
