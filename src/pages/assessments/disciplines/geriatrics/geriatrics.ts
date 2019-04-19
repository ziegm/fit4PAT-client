import {Component} from '@angular/core';
import {App, IonicPage, NavParams} from 'ionic-angular';
import {WorkflowPage} from "../../../../workflow/workflow-page";
import {MyApp} from "../../../../app/app.component";

@IonicPage()
@Component({
  selector: 'page-geriatrics',
  templateUrl: 'geriatrics.html',
})
export class GeriatricsPage extends WorkflowPage {
  private rootNav:any;
  private isSearchbarVisible = false;
  private readonly assessments: string[] = ['de Morton Mobility Index (DEMMI)',
                                            'Dynamic Gait Index (DGI)',
                                            'Timed Walking Test (10-Meter-Gehtest)'];

  constructor(navParams: NavParams, app: App) {
    super(navParams.data);
    this.rootNav = app.getRootNav();
  }

  navToAssessmentTab(){
    this.rootNav.push(MyApp, this.workflowParameters);
  }

  private onSearchbarVisibilityChange(isVisible: boolean): void {
    this.isSearchbarVisible = isVisible;
  }
}
