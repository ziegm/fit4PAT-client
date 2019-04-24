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
export class PatientDetailPage extends WorkflowPage {
  private rootNav: any;
  private patient: Patient;
  private isSearchbarVisible = false;
  private responses: AssessmentResponse[] = [];
  private noAssessmentMessage = "Es wurden noch keine Assessments durchgeführt."

  constructor(navParams: NavParams, app: App, private restProvider: RestProvider) {
    super(navParams.data);
    this.patient = (navParams.data as WorkflowParameters).patient;
    this.rootNav = app.getRootNav();
    this.loadAssessmentList();
  }

  private viewPatientName(patient: Patient) {
    return PatientHelper.viewPatientName(patient);
  }

  private viewPatientInfos(patient: Patient) {
    return PatientHelper.viewPatientInfos(patient);
  }

  private loadAssessmentList(): void {
    this.addLatestResponse("de Morton Mobility Index");
    this.addLatestResponse("Dynamic Gait Index");
    this.addLatestResponse("Timed Walking Test");
  }

  private addLatestResponse(assessmentType: string): void {
    let resp: AssessmentResponse[] = [];
    this.restProvider.getQuestionnaireResponses(this.patient, assessmentType).then(data => {
      if ((data as Bundle).total !== 0) {
        resp = (data as Bundle).entry.map(entry => (entry.resource as AssessmentResponse));
      }
      if (resp.length > 0) {
        this.responses.push(resp[0]);
      }
      this.responses.sort((a, b) => {
        return new Date(b.authored).getTime() - new Date(a.authored).getTime();
      });
    });
  }

  private viewAssessmentName(assessement: AssessmentResponse): string {
    return assessement.identifier.type.text;
  }

  private viewAssessmentInfos(assessment: AssessmentResponse): string {
    return "Letzte Durchführung: " + AssessmentHelper.actualDate(assessment.authored);
  }

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
