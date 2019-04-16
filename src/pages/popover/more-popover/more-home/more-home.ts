import {Component} from '@angular/core';
import {App, NavParams, PopoverController} from 'ionic-angular';
import {InstructionPage} from "./instruction/instruction";
import {PrivacyPage} from "./privacy/privacy";
import {LicencesPage} from "./licences/licences";
import {ImpressumPage} from "./impressum/impressum";
import {MyApp} from "../../../../app/app.component";
import {WorkflowPage} from "../../../../workflow/workflow-page";

@Component({
  selector: 'page-more-home',
  templateUrl: 'more-home.html',
})
export class MoreHomePage extends WorkflowPage {
  private rootNav: any;

  constructor(private popoverCtrl: PopoverController, navParams: NavParams, app: App) {
    super(navParams.data);
    this.rootNav = app.getRootNav();
  }

  private openInstruction() {
    //close popover
    this.rootNav.push(InstructionPage, this.workflowParameters);
  }

  private openPrivacy() {
    //close popover
    this.rootNav.push(PrivacyPage, this.workflowParameters);
  }

  private openLicences() {
    //close popover
    this.rootNav.push(LicencesPage, this.workflowParameters);
  }

  private openImpressum() {
    //close popover
    this.rootNav.push(ImpressumPage, this.workflowParameters);
  }
}
