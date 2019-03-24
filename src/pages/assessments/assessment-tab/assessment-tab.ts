import {Component} from '@angular/core';
import {App, NavController, NavParams} from 'ionic-angular';
import {GeriatricsPage} from '../disciplines/geriatrics/geriatrics';
import {NeurologyPage} from "../disciplines/neurology/neurology";
import {CardiologyPage} from "../disciplines/cardiology/cardiology";
import {MusculoskeletalPage} from "../disciplines/musculoskeletal/musculoskeletal";
import {OthersPage} from "../disciplines/others/others";
import {WorkflowPage} from "../../../workflow/workflow-page";

@Component({
  selector: 'page-home',
  templateUrl: 'assessment-tab.html'
})
export class AssessmentTabPage extends WorkflowPage {

  private rootNav:any;

  constructor(public navCtrl: NavController, public app: App, navParams: NavParams) {
    super(navParams);
    this.rootNav = app.getRootNav();
  }

  navToGeriatrics() {
    this.rootNav.push(GeriatricsPage, this.workflowSelector);
  }

  navToNeurology() {
    this.rootNav.push(NeurologyPage, this.workflowSelector);
  }

  navToCardiology() {
    this.rootNav.push(CardiologyPage, this.workflowSelector);
  }

  navToMusculoskeletal() {
    this.rootNav.push(MusculoskeletalPage, this.workflowSelector);
  }

  navToOthers() {
    this.rootNav.push(OthersPage, this.workflowSelector);
  }
}
