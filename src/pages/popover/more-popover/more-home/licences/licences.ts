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

}
