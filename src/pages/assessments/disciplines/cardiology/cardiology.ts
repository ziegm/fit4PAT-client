import { Component } from '@angular/core';
import {App, IonicPage, NavController, NavParams} from 'ionic-angular';
import {FormWalkingtestPage} from "../../assessment-forms/form-walkingtest/form-walkingtest";

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
export class CardiologyPage {

  private rootNav:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public app: App) {
    this.rootNav = app.getRootNav();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CardiologyPage');
  }

  navToWalkingtest() {
    this.rootNav.push(FormWalkingtestPage);
  }

}
