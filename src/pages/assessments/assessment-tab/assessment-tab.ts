import {Component} from '@angular/core';
import {App, NavParams} from 'ionic-angular';
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
  private isSearchbarVisible = false;

  constructor(app: App, navParams: NavParams) {
    super(navParams.data);

    if (typeof navParams.data !== "number") {

    }

    this.rootNav = app.getRootNav();
  }

  navToGeriatrics() {
    this.rootNav.push(GeriatricsPage, this.workflowParameters);
  }

  navToNeurology() {
    this.rootNav.push(NeurologyPage, this.workflowParameters);
  }

  navToCardiology() {
    this.rootNav.push(CardiologyPage, this.workflowParameters);
  }

  navToMusculoskeletal() {
    this.rootNav.push(MusculoskeletalPage, this.workflowParameters);
  }

  navToOthers() {
    this.rootNav.push(OthersPage, this.workflowParameters);
  }

  private onSearchbarVisibilityChange(isVisible: boolean): void {
    this.isSearchbarVisible = isVisible;
  }
}
