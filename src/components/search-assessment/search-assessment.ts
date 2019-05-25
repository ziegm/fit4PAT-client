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
/**
 * Component for displaying a list of assessments.
 */
export class SearchAssessmentComponent {
  private rootNav: any;
  @Input() private workflowParameters: WorkflowParameters;
  @Input() private isSearchbarVisible = false;
  @Input() private assessments: string[];
  private results: string[];

  constructor(app: App) {
    this.rootNav = app.getRootNav();
  }

  /**
   * Loads the assessment taken over from the surrounding components (discipline pages).
   */
  private ngOnChanges(): void {
    this.results = this.assessments;
  }

  /**
   * Decides by name to which form page to navigate.
   * @param name    The name of the form.
   */
  private navToAssessment(name: string): void {
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

  /**
   * Toggles the visibility of the search bar.
   * @param isVisible   true or false.
   */
  private onSearchbarVisibilityChange(isVisible: boolean): void {
    this.isSearchbarVisible = isVisible;
    this.results = this.assessments;
  }

  /**
   * Searches inside the loaded assessment list for an assessment name and removes
   * not fitting assessments.
   * @param search    The search string.
   */
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
