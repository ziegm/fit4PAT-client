import {Component} from '@angular/core';
import {App, IonicPage, NavParams} from 'ionic-angular';
import {EvaluationDemmiPage} from "../../assessment-evaluations/evaluation-demmi/evaluation-demmi";
import {AssessmentForm} from "../assessment-form";


@IonicPage()
@Component({
  selector: 'page-form-demmi',
  templateUrl: 'form-demmi.html',
})
export class FormDemmiPage implements AssessmentForm {

  private rootNav:any;

  constructor(navParams: NavParams, private app: App) {
    this.rootNav = app.getRootNav();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FormDemmiPage');
  }

  navToEvaluationDemmi() {
    this.rootNav.push(EvaluationDemmiPage);
  }

}
