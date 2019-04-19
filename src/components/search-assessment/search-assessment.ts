import {Component, Input} from '@angular/core';
import {FormWalkingtestPage} from "../../pages/assessments/assessment-forms/form-walkingtest/form-walkingtest";
import {App} from "ionic-angular";
import {WorkflowParameters} from "../../workflow/workflow-parameters";
import {FormDemmiPage} from "../../pages/assessments/assessment-forms/form-demmi/form-demmi";
import {FormDgiPage} from "../../pages/assessments/assessment-forms/form-dgi/form-dgi";

@Component({
  selector: 'search-assessment',
  templateUrl: 'search-assessment.html'
})
export class SearchAssessmentComponent {
  private rootNav: any;
  @Input() private workflowParameters: WorkflowParameters;
  @Input() private isSearchbarVisible = false;
  @Input() private assessments: string[];
  private results: string[];

  constructor(app: App) {
    this.rootNav = app.getRootNav();
  }

  private ngOnChanges(): void {
    this.results = this.assessments;
  }

  private navToAssessment(name: string) {
    switch(name) {
      case 'de Morton Mobility Index (DEMMI)':
        this.rootNav.push(FormDemmiPage, this.workflowParameters);
        break;
      case 'Dynamic Gait Index (DGI)':
        this.rootNav.push(FormDgiPage, this.workflowParameters);
        break;
      case 'Timed Walking Test (10-Meter-Gehtest)':
        this.rootNav.push(FormWalkingtestPage, this.workflowParameters);
        break;
    }
  }

  private onSearchbarVisibilityChange(isVisible: boolean): void {
    this.isSearchbarVisible = isVisible;
    this.results = this.assessments;
  }

  private getAssessments(event): void {
    if (event.target.value !== undefined) {
      this.results = this.assessments.filter(assessment => {
        return assessment.toLowerCase().includes(event.target.value.toLowerCase());
      });
    } else {
      this.results = this.assessments;
    }
  }
}
