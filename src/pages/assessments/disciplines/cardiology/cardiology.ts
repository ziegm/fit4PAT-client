import { Component } from '@angular/core';
import {App, IonicPage, NavController, NavParams} from 'ionic-angular';
import {FormWalkingtestPage} from "../../assessment-forms/form-walkingtest/form-walkingtest";
import {WorkflowPage} from "../../../../workflow/workflow-page";

/**
 * Generated class for the CardiologyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cardiology',
  templateUrl: 'cardiology.html',
})
export class CardiologyPage extends WorkflowPage {

  private rootNav:any;

  constructor(public navCtrl: NavController, navParams: NavParams, public app: App) {
    super(navParams);
    this.rootNav = app.getRootNav();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CardiologyPage');
  }

  navToWalkingtest() {
    this.rootNav.push(FormWalkingtestPage, this.workflowSelector);
  }

}
