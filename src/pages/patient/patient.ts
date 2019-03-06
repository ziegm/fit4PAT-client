import {Component} from '@angular/core';
import {App, NavController} from 'ionic-angular';
import {GeriatricsPage} from "../geriatrics/geriatrics";

@Component({
  selector: 'page-patient',
  templateUrl: 'patient.html'
})
export class PatientPage {

  private rootNav:any;

  constructor(public navCtrl: NavController, public app: App) {
    this.rootNav = app.getRootNav();
  }


}
