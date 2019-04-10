import {Component} from '@angular/core';
import {App, NavParams} from 'ionic-angular';
import {GeriatricsPage} from '../disciplines/geriatrics/geriatrics';
import {NeurologyPage} from "../disciplines/neurology/neurology";
import {CardiologyPage} from "../disciplines/cardiology/cardiology";
import {MusculoskeletalPage} from "../disciplines/musculoskeletal/musculoskeletal";
import {OthersPage} from "../disciplines/others/others";
import {WorkflowPage} from "../../../workflow/workflow-page";
import {MenuNavigationProvider} from "../../../providers/menu-navigation/menu-navigation";

@Component({
  selector: 'page-home',
  templateUrl: 'assessment-tab.html'
})
export class AssessmentTabPage extends WorkflowPage {
  private rootNav:any;
  public isSearchbarVisible = false;

  constructor(app: App, navParams: NavParams, menuNav: MenuNavigationProvider) {
    super(navParams.data);
    this.rootNav = app.getRootNav();
    menuNav.navCtrl = this.rootNav;
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

  public onSearchbarVisibilityChange(isVisible: boolean): void {
    this.isSearchbarVisible = isVisible;
  }

}
