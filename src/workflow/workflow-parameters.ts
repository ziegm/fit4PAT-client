import Patient = fhir.Patient;

export type WorkflowParameters = {
  workflowSelector?: WorkflowParameters;
  patient?: Patient;
}
