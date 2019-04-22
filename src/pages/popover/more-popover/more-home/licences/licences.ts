import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';

@Component({
  selector: 'page-licences',
  templateUrl: 'licences.html',
})
export class LicencesPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  private openLinkAssessments(){
    window.open('https://www.thieme.de/de/physiotherapie/assessments-46849.htm', '_system');
  }

  private openLinkJetBrains(){
    window.open('https://sales.jetbrains.com/hc/en-gb', '_system');
  }

  private openLinkApache(){
    window.open('http://www.apache.org/licenses/LICENSE-2.0', '_system');
  }

  private openLinkPostgreSQL(){
    window.open('https://www.postgresql.org/about/licence/', '_system');
  }

}
