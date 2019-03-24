import {Component} from '@angular/core';

import {PatientTabPage} from '../patients/patient-tab/patient-tab';
import {AssessmentTabPage} from '../assessments/assessment-tab/assessment-tab';
import {WorkflowSelector} from "../../workflow/workflow-selector";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = AssessmentTabPage;
  tab2Root = PatientTabPage;
  fromAssessment = WorkflowSelector.FromAssessment;
  fromPatient = WorkflowSelector.FromPatient;

  constructor() {

  }
}
