import {Component} from '@angular/core';
import {App, NavParams, ViewController} from 'ionic-angular';
import {InstructionPage} from "./instruction/instruction";
import {PrivacyPage} from "./privacy/privacy";
import {LicencesPage} from "./licences/licences";
import {ImpressumPage} from "./impressum/impressum";
import {WorkflowPage} from "../../../../workflow/workflow-page";

@Component({
  selector: 'page-more-home',
  templateUrl: 'more-home.html',
})
/**
 * The popover for displaying information like impressum, licenses etc.
 */
export class MoreHomePage extends WorkflowPage {
  private rootNav: any;

  constructor(navParams: NavParams, app: App, private viewCtrl: ViewController) {
    super(navParams.data);
    this.rootNav = app.getRootNav();
  }

  private closePopover(): void {
    this.viewCtrl.dismiss();
  }

  private openInstruction(): void {
    this.closePopover();
    this.rootNav.push(InstructionPage, this.workflowParameters);
  }

  private openPrivacy(): void {
    this.closePopover();
    this.rootNav.push(PrivacyPage, this.workflowParameters);
  }

  private openLicences(): void {
    this.closePopover();
    this.rootNav.push(LicencesPage, this.workflowParameters);
  }

  private openImpressum(): void {
    this.closePopover();
    this.rootNav.push(ImpressumPage, this.workflowParameters);
  }
}
