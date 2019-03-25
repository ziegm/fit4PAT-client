import {Component} from '@angular/core';
import {App, IonicPage, NavParams} from 'ionic-angular';
import {EvaluationDemmiPage} from "../../assessment-evaluations/evaluation-demmi/evaluation-demmi";
import Patient = fhir.Patient;


@IonicPage()
@Component({
  selector: 'page-form-demmi',
  templateUrl: 'form-demmi.html',
})
export class FormDemmiPage {
  private rootNav:any;
  private patient: Patient;

  constructor(navParams: NavParams, app: App) {
    this.rootNav = app.getRootNav();
    this.patient = navParams.data.patient;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FormDemmiPage');
  }

  navToEvaluationDemmi() {
    this.rootNav.push(EvaluationDemmiPage);
  }

}
