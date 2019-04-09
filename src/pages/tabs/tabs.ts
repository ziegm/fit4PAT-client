import {Component, ViewChild} from '@angular/core';
import {PatientTabPage} from '../patients/patient-tab/patient-tab';
import {AssessmentTabPage} from '../assessments/assessment-tab/assessment-tab';
import {WorkflowSelector} from "../../workflow/workflow-selector";
import {WorkflowParameters} from "../../workflow/workflow-parameters";
import {Tabs} from "ionic-angular";
import {fn} from "moment";

@Component({
  templateUrl: 'tabs.html',
})

export class TabsPage {
  private tab1Root = AssessmentTabPage;
  private tab2Root = PatientTabPage;
  @ViewChild("tabs") private _tabRef: Tabs;
  private _fromAssessment: WorkflowParameters = { workflowSelector: WorkflowSelector.FromAssessment };
  private _fromPatient: WorkflowParameters = { workflowSelector: WorkflowSelector.FromPatient };
  private isSearchbarVisible = false;

  get tabRef(): Tabs {
    return this._tabRef;
  }

  get fromAssessment(): WorkflowParameters {
    return this._fromAssessment;
  }

  get fromPatient(): WorkflowParameters {
    return this._fromPatient;
  }

  private onSearchbarVisibilityChangeAnother(isVisible: boolean): void {
    if(this.tab1Root) {

      //this.tab1Root.onSearchbarVisibilityChange(isVisible);
    } else {
      PatientTabPage.prototype.isSearchbarVisible = isVisible;
    }
    //this.isSearchbarVisible = isVisible;
  }
}
