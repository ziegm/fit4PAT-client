import {Component} from '@angular/core';
import {App, NavController, NavParams} from 'ionic-angular';
import {LicencesPage} from "../licences/licences";
import {WorkflowPage} from "../../../../../workflow/workflow-page";

@Component({
  selector: 'page-impressum',
  templateUrl: 'impressum.html',
})
/**
 * The impressum page.
 */
export class ImpressumPage extends WorkflowPage {
  private rootNav: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, app: App) {
    super(navParams.data);
    this.rootNav = app.getRootNav();
  }

  private openLinkDemmi(): void {
    window.open('https://www.thieme.de/statics/dokumente/thieme/final/de/dokumente/tw_physiotherapie/Assessment_DEMMI.pdf', '_system');
  }

  private openLinkDgi(): void {
    window.open('https://www.thieme-connect.de/products/ejournals/abstract/10.1055/s-0032-1307960', '_system');
  }

  private openLinkTWT(): void {
    window.open('https://www.thieme-connect.de/products/ejournals/abstract/10.1055/s-0032-1308003', '_system');
  }

  private navToLicenses(): void {
    this.rootNav.push(LicencesPage, this.workflowParameters);
  }
}
