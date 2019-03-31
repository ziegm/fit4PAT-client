import {Component} from '@angular/core';
import {PatientTabPage} from '../patients/patient-tab/patient-tab';
import {AssessmentTabPage} from '../assessments/assessment-tab/assessment-tab';
import {WorkflowSelector} from "../../workflow/workflow-selector";

@Component({
  templateUrl: 'tabs.html',
})

export class TabsPage {
  private tab1Root = AssessmentTabPage;
  private tab2Root = PatientTabPage;
  private fromAssessment = { workflowSelector: WorkflowSelector.FromAssessment }
  private fromPatient = { workflowSelector: WorkflowSelector.FromPatient }
}
