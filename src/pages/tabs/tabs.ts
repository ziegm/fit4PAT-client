import {Component, ViewChild} from '@angular/core';
import {PatientTabPage} from '../patients/patient-tab/patient-tab';
import {AssessmentTabPage} from '../assessments/assessment-tab/assessment-tab';
import {WorkflowSelector} from "../../workflow/workflow-selector";
import {WorkflowParameters} from "../../workflow/workflow-parameters";
import {Tabs} from "ionic-angular";

@Component({
  templateUrl: 'tabs.html',
})
/**
 * Represents the two tabs Assessment and Patient.
 */
export class TabsPage {
  private tab1Root = AssessmentTabPage;
  private tab2Root = PatientTabPage;
  private _fromAssessment: WorkflowParameters = { workflowSelector: WorkflowSelector.FromAssessment };
  private _fromPatient: WorkflowParameters = { workflowSelector: WorkflowSelector.FromPatient };

  // The Tabs-reference is required to be able to programmatically
  // change the selected tab.
  @ViewChild("tabs") private _tabRef: Tabs;

  get tabRef(): Tabs {
    return this._tabRef;
  }

  get fromAssessment(): WorkflowParameters {
    return this._fromAssessment;
  }

  get fromPatient(): WorkflowParameters {
    return this._fromPatient;
  }
}
