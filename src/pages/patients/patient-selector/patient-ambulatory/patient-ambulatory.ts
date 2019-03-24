import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {WorkflowPage} from "../../../../workflow/workflow-page";

/**
 * Generated class for the PatientAmbulatoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-patient-ambulatory',
  templateUrl: 'patient-ambulatory.html',
})
export class PatientAmbulatoryPage extends WorkflowPage {

  ward:string = "ambulatory";

  constructor(private navCtrl: NavController, navParams: NavParams) {
    super(navParams);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PatientAmbulatoryPage');
  }

}
