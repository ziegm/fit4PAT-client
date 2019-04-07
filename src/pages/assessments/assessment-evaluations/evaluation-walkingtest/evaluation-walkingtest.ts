import {Component, ViewChild} from '@angular/core';
import {IonicPage, NavParams} from 'ionic-angular';
import {PatientHelper} from "../../../../components/patient/patient-helper";
import {Chart, ChartOptions} from "chart.js";
import {RestProvider} from "../../../../providers/rest/rest";
import {WalkingtestResponse} from "../../../../responses/assessment-type/walkingtest-response";
import {WorkflowPage} from "../../../../workflow/workflow-page";
import Patient = fhir.Patient;


@IonicPage()
@Component({
  selector: 'page-evaluation-walkingtest',
  templateUrl: 'evaluation-walkingtest.html',
})
export class EvaluationWalkingtestPage extends WorkflowPage {
  private patient: Patient;
  private responses: WalkingtestResponse[];
  private isSearchbarVisible = false;
  @ViewChild('lineCanvas') lineCanvas;
  lineChart: any;

  constructor(navParams: NavParams, restProvider: RestProvider) {
    super(navParams.data);
    this.patient = navParams.data;
    restProvider.getQuestionnaireResponses(this.patient, "Timed Walking Test").then(data  => {
      this.responses = (data as any).entry.map(entry => (entry.resource as WalkingtestResponse));
    });
  }

  private executeDate(): string {
    return this.responses ? this.actualDate(): "";
  }

  private actualDate(): string {
    return this.responses[0].authored.substr(8, 2) + "." +
      this.responses[0].authored.substr(5, 2) + "." +
      this.responses[0].authored.substr(0, 4);
  }

  private firstTry(): string {
    return this.responses ? this.responses[0].item[0].answer[0].valueString: "";
  }

  private secondTry(): string {
    return this.responses ? this.responses[0].item[1].answer[0].valueString: "";
  }

  private thirdTry(): string {
    return this.responses ? this.responses[0].item[2].answer[0].valueString: "";
  }

  private calcAverage(): string {
    return ((+this.firstTry() + +this.secondTry() + +this.thirdTry()) / 3).toString();
  }

  private calcAverageRounded(): string {
    return (+this.calcAverage()).toFixed(0);
  }

  private calcSpeed(): string {
    return (1 / (+this.calcAverage() / 6)).toFixed(2);
  }

  private getAids(): string {
    return this.responses && this.responses[0].item[3] ? this.responses[0].item[3].answer[0].valueString: "";
  }

  private getComments(): string {
    return this.responses && this.responses[0].item[4] ? this.responses[0].item[4].answer[0].valueString: "";
  }

  private viewPatient(patient: Patient) {
    return PatientHelper.viewPatient(patient);
  }

  private onSearchbarVisibilityChange(isVisible: boolean): void {
    this.isSearchbarVisible = isVisible;
  }

  ionViewDidLoad() {
    this.lineChart = new Chart(this.lineCanvas.nativeElement, {

      type: 'line',
      data: {
        labels: ["January", "February", "March", "April", "May", "June", "July"], //gemäss DB
        datasets: [
          {
            label: "10-Meter-Gehtest",
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
            data: [1.3, 1.4, 1.5, 1.2, 1.4, 1.3, 1.5], //gemäss DB
            spanGaps: false,
          }
        ]
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
              stepSize: 0.2,
              max: 3,
              min: 0,
            },
          }],
        },
        annotation: {
          annotations: [{
            type: 'line',
            mode: 'horizontal',
            scaleID: 'y-axis-0',
            value: '1.37',
            borderColor: '#9999ff',
            borderWidth: 2,
          },{
            type: 'line',
            mode: 'horizontal',
            scaleID: 'y-axis-0',
            value: '1.23',
            borderColor: '#ff9999',
            borderWidth: 2,
          }],
          // Defines when the annotations are drawn.
          // This allows positioning of the annotation relative to the other
          // elements of the graph.
          // Should be one of: afterDraw, afterDatasetsDraw, beforeDatasetsDraw
          // See http://www.chartjs.org/docs/#advanced-usage-creating-plugins
          drawTime: "beforeDatasetsDraw" // (default)
        }
      } as ChartOptions,
    });
  }

  openLink(){
    window.open('https://www.sralab.org/rehabilitation-measures/10-meter-walk-test', '_system');
  }
}
