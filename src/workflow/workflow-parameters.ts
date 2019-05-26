import Patient = fhir.Patient;
import {WorkflowSelector} from "./workflow-selector";
import {AssessmentResponse} from "../responses/assessment-response";

/**
 * Type definition for the workflow parameters with information, needed for the
 * control of the navigation process, that are passed between pages.
 */
export type WorkflowParameters = {
  // The workflow currently used (from patient / from assessment).
  workflowSelector?: WorkflowSelector;
  // The currently selected patient.
  patient?: Patient;
  // The latest filled out assessment response.
  assessmentResponse?: AssessmentResponse;
  // Should the search be displayed on the current page?
  isSearchVisible?: boolean;
}
