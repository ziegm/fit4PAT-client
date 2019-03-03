import {Component} from '@angular/core';
import {App, NavController} from 'ionic-angular';
import {NoTabPage} from '../no-tab/no-tab';

@Component({
  selector: 'page-home',
  templateUrl: 'assessment.html'
})
export class AssessmentPage {

  constructor(public navCtrl: NavController, public app: App) {
  }

  navToNoTab() {
    let rootNav = this.app.getRootNav();
    rootNav.push(NoTabPage);
  }
}
