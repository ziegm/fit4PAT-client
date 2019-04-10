import Patient = fhir.Patient;
import {WorkflowSelector} from "./workflow-selector";

export type WorkflowParameters = {
  workflowSelector?: WorkflowSelector;
  patient?: Patient;
  isSearchVisible?: boolean;
}
