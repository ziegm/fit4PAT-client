import { Component } from '@angular/core';
import {App, IonicPage, NavController, NavParams} from 'ionic-angular';
import {FormDemmiPage} from "../../assessment-forms/form-demmi/form-demmi";
import {FormDgiPage} from "../../assessment-forms/form-dgi/form-dgi";
import {FormWalkingtestPage} from "../../assessment-forms/form-walkingtest/form-walkingtest";

/**
 * Generated class for the Geriatrics page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-geriatrics',
  templateUrl: 'geriatrics.html',
})
export class GeriatricsPage {

  private rootNav:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public app: App) {
    this.rootNav = app.getRootNav();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GeriatricsPage');
  }

  navToDemmi() {
    this.rootNav.push(FormDemmiPage);
  }

  navToDgi() {
    this.rootNav.push(FormDgiPage);
  }

  navToWalkingtest() {
    this.rootNav.push(FormWalkingtestPage);
  }
}
