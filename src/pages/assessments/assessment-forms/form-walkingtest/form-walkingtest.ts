import { Component } from '@angular/core';
import {App, IonicPage, NavController, NavParams} from 'ionic-angular';
import {EvaluationWalkingtestPage} from "../../assessment-evaluations/evaluation-walkingtest/evaluation-walkingtest";

/**
 * Generated class for the FormWalkingtestPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-form-walkingtest',
  templateUrl: 'form-walkingtest.html',
})
export class FormWalkingtestPage {

  private rootNav:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public app: App) {
    this.rootNav = app.getRootNav();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FormWalkingtestPage');
  }

  navToEvaluationWalkingtest(){
    this.rootNav.push(EvaluationWalkingtestPage);
  }

}
