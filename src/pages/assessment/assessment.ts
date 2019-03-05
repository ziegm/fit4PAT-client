import {Component} from '@angular/core';
import {App, NavController} from 'ionic-angular';
import {GeriatricsPage} from '../geriatrics/geriatrics';
import {NeurologyPage} from "../neurology/neurology";
import {CardiologyPage} from "../cardiology/cardiology";
import {MusculoskeletalPage} from "../musculoskeletal/musculoskeletal";
import {OthersPage} from "../others/others";

@Component({
  selector: 'page-home',
  templateUrl: 'assessment.html'
})
export class AssessmentPage {

  private rootNav:any;

  constructor(public navCtrl: NavController, public app: App) {
    this.rootNav = app.getRootNav();
  }

  navToGeriatrics() {
    this.rootNav.push(GeriatricsPage);
  }

  navToNeurology() {
    this.rootNav.push(NeurologyPage);
  }

  navToCardiology() {
    this.rootNav.push(CardiologyPage);
  }

  navToMusculoskeletal() {
    this.rootNav.push(MusculoskeletalPage);
  }

  navToOthers() {
    this.rootNav.push(OthersPage);
  }
}
