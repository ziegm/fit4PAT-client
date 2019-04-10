import {Component, ViewChild} from '@angular/core';
import {App, NavParams, PopoverController} from 'ionic-angular';
import {GeriatricsPage} from '../disciplines/geriatrics/geriatrics';
import {NeurologyPage} from "../disciplines/neurology/neurology";
import {CardiologyPage} from "../disciplines/cardiology/cardiology";
import {MusculoskeletalPage} from "../disciplines/musculoskeletal/musculoskeletal";
import {OthersPage} from "../disciplines/others/others";
import {WorkflowPage} from "../../../workflow/workflow-page";
import {MenuNavigationProvider} from "../../../providers/menu-navigation/menu-navigation";
import {SearchPopoverPage} from "../../popover/search-popover/search-popover";
import {AssessmentSearchProvider} from "../../../providers/assessment-search/assessment-search";

@Component({
  selector: 'page-home',
  templateUrl: 'assessment-tab.html'
})
export class AssessmentTabPage extends WorkflowPage {
  private rootNav:any;
  private isSearchbarVisible = false;
  private searchResults: string [] = [];
  @ViewChild('search') search;

  constructor(app: App, navParams: NavParams,
              menuNav: MenuNavigationProvider,
              private popoverCtrl: PopoverController,
              private assessmentSearch: AssessmentSearchProvider
  ) {
    super(navParams.data);
    this.rootNav = app.getRootNav();
    menuNav.navCtrl = this.rootNav;
  }

  private navToGeriatrics() {
    this.rootNav.push(GeriatricsPage, this.workflowParameters);
  }

  private navToNeurology() {
    this.rootNav.push(NeurologyPage, this.workflowParameters);
  }

  private navToCardiology() {
    this.rootNav.push(CardiologyPage, this.workflowParameters);
  }

  private navToMusculoskeletal() {
    this.rootNav.push(MusculoskeletalPage, this.workflowParameters);
  }

  private navToOthers() {
    this.rootNav.push(OthersPage, this.workflowParameters);
  }

  private showPopover(event): void {
    let popover = this.popoverCtrl.create(SearchPopoverPage, this.searchResults, {cssClass: 'distanceToInput'});
    popover.present({
      ev: event
    });
  }

  private getAssessments(event) :void {
    this.searchResults = this.assessmentSearch.result(event.data);
  }
}
