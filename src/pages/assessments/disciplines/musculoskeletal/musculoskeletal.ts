import {Component} from '@angular/core';
import {App, IonicPage, NavParams} from 'ionic-angular';
import {FormWalkingtestPage} from "../../assessment-forms/form-walkingtest/form-walkingtest";
import {WorkflowPage} from "../../../../workflow/workflow-page";

@IonicPage()
@Component({
  selector: 'page-musculoskeletal',
  templateUrl: 'musculoskeletal.html',
})
export class MusculoskeletalPage extends WorkflowPage {

  private rootNav:any;

  constructor(navParams: NavParams, app: App) {
    super(navParams.data);
    this.rootNav = app.getRootNav();
  }

  navToWalkingtest() {
    this.rootNav.push(FormWalkingtestPage, this.workflowParameters);
  }
}
