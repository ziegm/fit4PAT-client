import { Component } from '@angular/core';
import {App, IonicPage, NavController, NavParams} from 'ionic-angular';
import {FormWalkingtestPage} from "../form-walkingtest/form-walkingtest";
import {EvaluationDemmiPage} from "../../assessment-evaluations/evaluation-demmi/evaluation-demmi";

/**
 * Generated class for the FormDemmiPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-form-demmi',
  templateUrl: 'form-demmi.html',
})
export class FormDemmiPage {

  private rootNav:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public app: App) {
    this.rootNav = app.getRootNav();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FormDemmiPage');
  }

  navToEvaluationDemmi() {
    this.rootNav.push(EvaluationDemmiPage);
  }

}
