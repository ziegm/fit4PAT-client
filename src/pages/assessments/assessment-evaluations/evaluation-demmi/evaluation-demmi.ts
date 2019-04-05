import {Component, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {PatientHelper} from "../../../../components/patient/patient-helper";
import {Chart, ChartOptions} from 'chart.js';
import Patient = fhir.Patient;
import {ChartComponent} from "angular2-chartjs";
import {ChartAnnotation} from 'chartjs-plugin-annotation';


@IonicPage()
@Component({
  selector: 'page-evaluation-demmi',
  templateUrl: 'evaluation-demmi.html',
})
export class EvaluationDemmiPage {
  private patient: Patient;
  private isSearchbarVisible = false;


  @ViewChild(ChartComponent) chart: ChartComponent;
  @ViewChild('lineCanvas') lineCanvas;
  lineChart: any;

  constructor(navParams: NavParams, public navCtrl: NavController) {
    this.patient = navParams.data;
  }

  private viewPatient(patient: Patient) {
    return PatientHelper.viewPatient(patient);
  }

  private onSearchbarVisibilityChange(isVisible: boolean): void {
    this.isSearchbarVisible = isVisible;
  }

  ionViewDidLoad() {
    //Chart.pluginService.register(annotation);


    this.lineChart = new Chart(this.lineCanvas.nativeElement, {
      type: 'line',

      data: {
        labels: ["January", "February", "March", "April", "May", "June", "July"], //gemäss DB
        datasets: [
          {
            label: "DEMMI",
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
            data: [90, 59, 80, 81, 56, 55, 20], //gemäss DB
            spanGaps: false,
          }],
      },
options: {
        legend: {
          display: false,
          labels: {
            fontColor: "black",
            fontSize: 18
          }
        },
        scales: {
          yAxes: [{
            ticks: {
              fontColor: "black",
              fontSize: 18,
              beginAtZero: true,
              stepSize: 20,
              max: 100,
              min: 0,
            }
          }],
        },
      annotation: {
        annotations: [{
          id: 'box1',
          type: 'box',
          yScaleID: 'y-axis-0',
          yMin: 0,
          yMax: 40,
          backgroundColor: '#ffcccc',
          //borderColor: 'rgba(100, 100, 100, 0.2)',
        },{
            id: 'box2',
            type: 'box',
            yScaleID: 'y-axis-0',
            yMin: 40,
            yMax: 60,
            backgroundColor: '#ffedcc',
            //borderColor: 'rgba(200, 100, 200, 0.2)',
        },{
          id: 'box3',
          type: 'box',
          yScaleID: 'y-axis-0',
          yMin: 60,
          yMax: 70,
          backgroundColor: '#ffffcc',
          //borderColor: 'rgba(200, 100, 200, 0.2)',
        },{
          id: 'box4',
          type: 'box',
          yScaleID: 'y-axis-0',
          yMin: 70,
          yMax: 100,
          backgroundColor: '#cce5cc',
          //borderColor: 'rgba(200, 100, 200, 0.2)',
        }],
          // Defines when the annotations are drawn.
          // This allows positioning of the annotation relative to the other
          // elements of the graph.
          // Should be one of: afterDraw, afterDatasetsDraw, beforeDatasetsDraw
          // See http://www.chartjs.org/docs/#advanced-usage-creating-plugins
          drawTime: "beforeDatasetsDraw" // (default)
      }
  } as ChartOptions,
      //plugins: [ChartAnnotation]
  });
  }
}
