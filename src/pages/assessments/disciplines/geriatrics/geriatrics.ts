import {Component} from '@angular/core';
import {App, IonicPage, NavParams} from 'ionic-angular';
import {FormDemmiPage} from "../../assessment-forms/form-demmi/form-demmi";
import {FormDgiPage} from "../../assessment-forms/form-dgi/form-dgi";
import {FormWalkingtestPage} from "../../assessment-forms/form-walkingtest/form-walkingtest";
import {WorkflowPage} from "../../../../workflow/workflow-page";

@IonicPage()
@Component({
  selector: 'page-geriatrics',
  templateUrl: 'geriatrics.html',
})
export class GeriatricsPage extends WorkflowPage {

  private rootNav:any;

  constructor(navParams: NavParams, app: App) {
    super(navParams.data);
    this.rootNav = app.getRootNav();
  }

  navToDemmi() {
    this.rootNav.push(FormDemmiPage, this.workflowParameters);
  }

  navToDgi() {
    this.rootNav.push(FormDgiPage, this.workflowParameters);
  }

  navToWalkingtest() {
    this.rootNav.push(FormWalkingtestPage, this.workflowParameters);
  }
}
