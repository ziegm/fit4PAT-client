import { Component } from '@angular/core';
import {App, IonicPage, NavController, NavParams} from 'ionic-angular';
import {EvaluationDemmiPage} from "../../../assessments/assessment-evaluations/evaluation-demmi/evaluation-demmi";
import {WardA1Page} from "../ward-a1/ward-a1";
import {WardA2Page} from "../ward-a2/ward-a2";
import {WardB1Page} from "../ward-b1/ward-b1";
import {WardB2Page} from "../ward-b2/ward-b2";
import {WardB3Page} from "../ward-b3/ward-b3";
import {WardC1Page} from "../ward-c1/ward-c1";
import {WardIpsPage} from "../ward-ips/ward-ips";

/**
 * Generated class for the WardOverviewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ward-overview',
  templateUrl: 'ward-overview.html',
})
export class WardOverviewPage {

  private rootNav:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public app: App) {
    this.rootNav = app.getRootNav();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WardOverviewPage');
  }

  navToWardA1() {
    this.rootNav.push(WardA1Page);
  }

  navToWardA2() {
    this.rootNav.push(WardA2Page);
  }

  navToWardB1() {
    this.rootNav.push(WardB1Page);
  }

  navToWardB2() {
    this.rootNav.push(WardB2Page);
  }

  navToWardB3() {
    this.rootNav.push(WardB3Page);
  }

  navToWardC1() {
    this.rootNav.push(WardC1Page);
  }

  navToWardIps() {
    this.rootNav.push(WardIpsPage);
  }
}
