import {Component} from '@angular/core';
import {App, NavController} from 'ionic-angular';
import {GeriatricsPage} from '../disciplines/geriatrics/geriatrics';
import {NeurologyPage} from "../disciplines/neurology/neurology";
import {CardiologyPage} from "../disciplines/cardiology/cardiology";
import {MusculoskeletalPage} from "../disciplines/musculoskeletal/musculoskeletal";
import {OthersPage} from "../disciplines/others/others";

@Component({
  selector: 'page-home',
  templateUrl: 'assessment-tab.html'
})
export class AssessmentTabPage {

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
