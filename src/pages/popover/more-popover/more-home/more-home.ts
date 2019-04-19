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
export class MoreHomePage extends WorkflowPage {
  private rootNav: any;

  constructor(navParams: NavParams, app: App, public viewCtrl: ViewController) {
    super(navParams.data);
    this.rootNav = app.getRootNav();
  }

  private openInstruction() {
    this.viewCtrl.dismiss();
    this.rootNav.push(InstructionPage, this.workflowParameters);
  }

  private openPrivacy() {
    this.viewCtrl.dismiss();
    this.rootNav.push(PrivacyPage, this.workflowParameters);
  }

  private openLicences() {
    this.viewCtrl.dismiss();
    this.rootNav.push(LicencesPage, this.workflowParameters);
  }

  private openImpressum() {
    this.viewCtrl.dismiss();
    this.rootNav.push(ImpressumPage, this.workflowParameters);
  }
}
