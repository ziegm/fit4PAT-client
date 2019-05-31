import {Component, ViewChild} from '@angular/core';
import {App, NavParams, PopoverController} from 'ionic-angular';
import {GeriatricsPage} from '../disciplines/geriatrics/geriatrics';
import {NeurologyPage} from "../disciplines/neurology/neurology";
import {CardiologyPage} from "../disciplines/cardiology/cardiology";
import {MusculoskeletalPage} from "../disciplines/musculoskeletal/musculoskeletal";
import {OthersPage} from "../disciplines/others/others";
import {WorkflowPage} from "../../../workflow/workflow-page";
import {MenuNavigationProvider} from "../../../providers/menu-navigation/menu-navigation";
import {AssessmentSearchProvider} from "../../../providers/assessment-search/assessment-search";

@Component({
  selector: 'page-home',
  templateUrl: 'assessment-tab.html'
})
/**
 * Page lets the user choose an assessment discipline.
 */
export class AssessmentTabPage extends WorkflowPage {
  private rootNav:any;
  @ViewChild('search') search;

  constructor(app: App, navParams: NavParams,
              menuNav: MenuNavigationProvider,
              private popoverCtrl: PopoverController,
              private assessmentSearch: AssessmentSearchProvider) {
    super(navParams.data);
    this.rootNav = app.getRootNav();
    menuNav.navCtrl = this.rootNav;
  }

  private navToGeriatrics(): void {
    this.rootNav.push(GeriatricsPage, this.workflowParameters);
  }

  private navToNeurology(): void {
    this.rootNav.push(NeurologyPage, this.workflowParameters);
  }

  private navToCardiology(): void {
    this.rootNav.push(CardiologyPage, this.workflowParameters);
  }

  private navToMusculoskeletal(): void {
    this.rootNav.push(MusculoskeletalPage, this.workflowParameters);
  }

  private navToOthers(): void {
    this.rootNav.push(OthersPage, this.workflowParameters);
  }
}
