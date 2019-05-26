import {Component} from '@angular/core';
import {App, NavParams} from 'ionic-angular';
import {PatientHelper} from "../../../components/patient/patient-helper";
import {WorkflowPage} from "../../../workflow/workflow-page";
import {WorkflowParameters} from "../../../workflow/workflow-parameters";
import {RestProvider} from "../../../providers/rest/rest";
import {AssessmentResponse} from "../../../responses/assessment-response";
import {AssessmentHelper} from "../../assessments/assessment-helper";
import {EvaluationDemmiPage} from "../../assessments/assessment-evaluations/evaluation-demmi/evaluation-demmi";
import {EvaluationDgiPage} from "../../assessments/assessment-evaluations/evaluation-dgi/evaluation-dgi";
import {EvaluationWalkingtestPage} from "../../assessments/assessment-evaluations/evaluation-walkingtest/evaluation-walkingtest";
import Patient = fhir.Patient;
import Bundle = fhir.Bundle;

@Component({
  selector: 'page-patient-detail',
  templateUrl: 'patient-detail.html',
})
/**
 * Displays a patients detailed information.
 */
export class PatientDetailPage extends WorkflowPage {
  private rootNav: any;
  private patient: Patient;
  private isSearchbarVisible = false;
  private responses: AssessmentResponse[] = [];
  private noAssessmentMessage = "Es wurden noch keine Assessments durchgeführt.";

  constructor(navParams: NavParams, app: App, private restProvider: RestProvider) {
    super(navParams.data);
    this.patient = (navParams.data as WorkflowParameters).patient;
    this.rootNav = app.getRootNav();
    this.loadAssessmentList();
  }

  /**
   *  View representation of a patient in the format:
   *  [Room:] Family name, given name
   * @param patient   The patient to be represented.
   */
  private viewPatientName(patient: Patient): string {
    return PatientHelper.viewPatientName(patient);
  }

  /**
   * View representation of a patients additional information in the format:
   * Gender, birthdate (age), case id (Fall-ID)
   * @param patient   The patient to be represented.
   */
  private viewPatientInfos(patient: Patient): string {
    return PatientHelper.viewPatientInfos(patient);
  }

  /**
   * Loads the last assessment response of each type for a patient ordererd by date descending.
   */
  private loadAssessmentList(): void {
    this.addLatestResponse("de Morton Mobility Index");
    this.addLatestResponse("Dynamic Gait Index");
    this.addLatestResponse("Timed Walking Test");
  }

  /**
   * Loads the latest response by patient and assessment type, adds it to the assessment list
   * and sorts the responses by date descending.
   * @param assessmentType
   */
  private addLatestResponse(assessmentType: string): void {
    // Clears the local response list.
    let resp: AssessmentResponse[] = [];

    // Loads the response list by patient and assessment type sorted by date descending.
    this.restProvider.getQuestionnaireResponses(this.patient, assessmentType).then(data => {
      // Writes the returned list entries into the response list.
      if ((data as Bundle).total !== 0) {
        resp = (data as Bundle).entry.map(entry => (entry.resource as AssessmentResponse));
      }
      // Writes the first (latest) response into the responses list.
      if (resp.length > 0) {
        this.responses.push(resp[0]);
      }
      // Sorts the responses list by date descending.
      this.responses.sort((a, b) => {
        return new Date(b.authored).getTime() - new Date(a.authored).getTime();
      });
    });
  }

  /**
   * Retrieve the assessment name from an assessment response.
   * @param assessement   The assessment response.
   */
  private viewAssessmentName(assessement: AssessmentResponse): string {
    return assessement.identifier.type.text;
  }

  /**
   * Retrieve the assessments information from an assessment response.
   * @param assessement   The assessment response.
   */
  private viewAssessmentInfos(assessment: AssessmentResponse): string {
    return "Letzte Durchführung: " + AssessmentHelper.actualDate(assessment.authored);
  }

  /**
   * Navigate to the assessment evaluation page based on the chosen assessment type.
   * @param assessment    The chosen assessment.
   */
  private navToEvaluation(assessment: AssessmentResponse): void {
    switch (assessment.identifier.type.text) {
      case "de Morton Mobility Index":
        this.rootNav.push(EvaluationDemmiPage, this.workflowParameters);
        break;
      case "Dynamic Gait Index":
        this.rootNav.push(EvaluationDgiPage, this.workflowParameters);
        break;
      case "Timed Walking Test":
        this.rootNav.push(EvaluationWalkingtestPage, this.workflowParameters);
        break;
    }
  }
}
