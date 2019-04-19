import {Component} from '@angular/core';
import {App, IonicPage, NavParams} from 'ionic-angular';
import {WorkflowPage} from "../../../../workflow/workflow-page";
import {MyApp} from "../../../../app/app.component";


@IonicPage()
@Component({
  selector: 'page-cardiology',
  templateUrl: 'cardiology.html',
})
export class CardiologyPage extends WorkflowPage {
  private rootNav: any;
  private isSearchbarVisible = false;
  private readonly assessments: string[] = ['Timed Walking Test (10-Meter-Gehtest)'];

  constructor(navParams: NavParams, app: App) {
    super(navParams.data);
    this.rootNav = app.getRootNav();
  }

  private navToAssessmentTab(){
    this.rootNav.push(MyApp, this.workflowParameters);
  }

  private onSearchbarVisibilityChange(isVisible: boolean): void {
    this.isSearchbarVisible = isVisible;
  }
}
