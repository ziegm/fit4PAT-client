import { Component } from '@angular/core';
import {App, IonicPage, NavController, NavParams} from 'ionic-angular';
import {FormWalkingtestPage} from "../../assessment-forms/form-walkingtest/form-walkingtest";
import {WorkflowPage} from "../../../../workflow/workflow-page";

/**
 * Generated class for the MusculoskeletalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-musculoskeletal',
  templateUrl: 'musculoskeletal.html',
})
export class MusculoskeletalPage extends WorkflowPage {

  private rootNav:any;

  constructor(public navCtrl: NavController, navParams: NavParams, public app: App) {
    super(navParams);
    this.rootNav = app.getRootNav();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MusculoskeletalPage');
  }

  navToWalkingtest() {
    this.rootNav.push(FormWalkingtestPage, this.workflowSelector);
  }

}
