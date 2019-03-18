import { Component } from '@angular/core';
import {App, IonicPage, NavController, NavParams} from 'ionic-angular';
import {WardA1Page} from "../../wards/ward-a1/ward-a1";
import {WardA2Page} from "../../wards/ward-a2/ward-a2";
import {WardB1Page} from "../../wards/ward-b1/ward-b1";
import {WardB2Page} from "../../wards/ward-b2/ward-b2";
import {WardB3Page} from "../../wards/ward-b3/ward-b3";
import {WardC1Page} from "../../wards/ward-c1/ward-c1";
import {WardIpsPage} from "../../wards/ward-ips/ward-ips";
import {PatientAmbulatoryPage} from "../patient-ambulatory/patient-ambulatory";

/**
 * Generated class for the PatientStationaryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-patient-stationary',
  templateUrl: 'patient-stationary.html',
})
export class PatientStationaryPage {

  private rootNav:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public app: App) {
    this.rootNav = app.getRootNav();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PatientStationaryPage');
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
