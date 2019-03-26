import { Component } from '@angular/core';
import {App, IonicPage, NavController, NavParams} from 'ionic-angular';
import {MyApp} from "../../../../app/app.component";
import {WorkflowPage} from "../../../../workflow/workflow-page";

@IonicPage()
@Component({
  selector: 'page-others',
  templateUrl: 'others.html',
})
export class OthersPage extends WorkflowPage{

  private rootNav:any;

  constructor(public navCtrl: NavController, app: App, navParams: NavParams) {
    super(navParams.data);
    this.rootNav = app.getRootNav();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OthersPage');
  }

  navToAssessmentTab(){
    this.rootNav.push(MyApp, this.workflowParameters);
  }

}
