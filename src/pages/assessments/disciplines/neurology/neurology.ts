import { Component } from '@angular/core';
import {App, IonicPage, NavController, NavParams} from 'ionic-angular';
import {FormDemmiPage} from "../../assessment-forms/form-demmi/form-demmi";
import {FormDgiPage} from "../../assessment-forms/form-dgi/form-dgi";
import {FormWalkingtestPage} from "../../assessment-forms/form-walkingtest/form-walkingtest";
import {WorkflowPage} from "../../../../workflow/workflow-page";

/**
 * Generated class for the NeurologyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-neurology',
  templateUrl: 'neurology.html',
})
export class NeurologyPage extends WorkflowPage {

  private rootNav:any;

  constructor(public navCtrl: NavController, navParams: NavParams, public app: App) {
    super(navParams);
    this.rootNav = app.getRootNav();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NeurologyPage');
  }

  navToDemmi() {
    this.rootNav.push(FormDemmiPage, this.workflowSelector);
  }

  navToDgi() {
    this.rootNav.push(FormDgiPage, this.workflowSelector);
  }

  navToWalkingtest() {
    this.rootNav.push(FormWalkingtestPage, this.workflowSelector);
  }

}
