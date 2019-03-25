import Patient = fhir.Patient;

export class PatientHelper {

  public static viewPatient(patient: Patient): string {
    const roomIdentifier = patient.identifier.filter(identifier => identifier.type.text === "room")[0];
    const gender = patient.gender === "female" ? "w" : "m";
    const birthDate = new Date(patient.birthDate).toLocaleDateString("de-CH");
    const caseId = patient.identifier.filter(identifier => identifier.type.text === "case-id")[0];
    return this.room(roomIdentifier) + patient.name[0].family + " " + patient.name[0].given[0] + ", " +
      gender + ", " + birthDate + ", " + caseId.value + " (Fall-ID)";
  }

  private static room(room: fhir.Identifier): string {
    return room.value === undefined ? "" : room.value +": ";
  }
}
