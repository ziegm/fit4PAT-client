import {Component, ViewChild} from '@angular/core';
import {IonicPage, NavParams} from 'ionic-angular';
import {PatientHelper} from "../../../../components/patient/patient-helper";
import {Chart} from "chart.js";
import Patient = fhir.Patient;


@IonicPage()
@Component({
  selector: 'page-evaluation-dgi',
  templateUrl: 'evaluation-dgi.html',
})
export class EvaluationDgiPage {
  private patient: Patient;
  private isSearchbarVisible = false;

  @ViewChild('lineCanvas') lineCanvas;
  lineChart: any;

  constructor(navParams: NavParams) {
    this.patient = navParams.data;
  }

  private viewPatient(patient: Patient) {
    return PatientHelper.viewPatient(patient);
  }

  private onSearchbarVisibilityChange(isVisible: boolean): void {
    this.isSearchbarVisible = isVisible;
  }

  openLink(){
    window.open('https://www.sralab.org/rehabilitation-measures/dynamic-gait-index', '_system');
  }

  ionViewDidLoad() {
    this.lineChart = new Chart(this.lineCanvas.nativeElement, {

      type: 'line',
      data: {
        labels: ["January", "February", "March", "April", "May", "June", "July"], //gemäss DB
        datasets: [
          {
            label: "DGI",
            fill: false,
            lineTension: 0,
            backgroundColor: "#9ECF66",
            borderColor: "#9ECF66",
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 7.0,
            borderJoinStyle: 'miter',
            pointBorderColor: "#888888",
            pointBackgroundColor: "#b7b7b7",
            pointBorderWidth: 3,
            pointHoverRadius: 10,
            pointHoverBackgroundColor: "#9ECF66",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 7,
            pointHitRadius: 10,
            data: [65, 59, 80, 81, 56, 55, 40], //gemäss DB
            spanGaps: false,
          }
        ]
      }

    });
  }

}
