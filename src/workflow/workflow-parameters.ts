import Patient = fhir.Patient;
import {WorkflowSelector} from "./workflow-selector";
import {AssessmentResponse} from "../responses/assessment-response";

export type WorkflowParameters = {
  workflowSelector?: WorkflowSelector;
  patient?: Patient;
  assessmentResponse?: AssessmentResponse;
  isSearchVisible?: boolean;
}
