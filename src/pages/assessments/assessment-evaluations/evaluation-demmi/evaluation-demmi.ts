import {Component, ViewChild} from '@angular/core';
import {IonicPage, NavParams, NavController} from 'ionic-angular';
import {PatientHelper} from "../../../../components/patient/patient-helper";
import Patient = fhir.Patient;
import { Chart } from 'chart.js';


@IonicPage()
@Component({
  selector: 'page-evaluation-demmi',
  templateUrl: 'evaluation-demmi.html',
})
export class EvaluationDemmiPage {
  private patient: Patient;

  @ViewChild('lineCanvas') lineCanvas;
  lineChart: any;

  constructor(navParams: NavParams, public navCtrl: NavController) {
    this.patient = navParams.data;
  }

  private viewPatient(patient: Patient) {
    return PatientHelper.viewPatient(patient);
  }

  ionViewDidLoad() {

    this.lineChart = new Chart(this.lineCanvas.nativeElement, {

      type: 'line',
      data: {
        labels: ["January", "February", "March", "April", "May", "June", "July"], //gemäss DB
        datasets: [
          {
            label: "DEMMI",
            fill: false,
            lineTension: 0.1,
            backgroundColor: "rgba(75,192,192,0.4)",
            borderColor: "rgba(75,192,192,1)",
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [65, 59, 80, 81, 56, 55, 40], //gemäss DB
            spanGaps: false,
          }
        ]
      }

    });
  }

}
