import {Component, ViewChild} from '@angular/core';
import {IonicPage, NavParams} from 'ionic-angular';
import {PatientHelper} from "../../../../components/patient/patient-helper";
import {Chart, ChartOptions} from "chart.js";
import {WorkflowPage} from "../../../../workflow/workflow-page";
import {DgiResponse} from "../../../../responses/assessment-type/dgi-response";
import {RestProvider} from "../../../../providers/rest/rest";
import Patient = fhir.Patient;


@IonicPage()
@Component({
  selector: 'page-evaluation-dgi',
  templateUrl: 'evaluation-dgi.html',
})
export class EvaluationDgiPage extends WorkflowPage {
  private patient: Patient;
  private responses: DgiResponse[];
  private isSearchbarVisible = false;

  @ViewChild('lineCanvas') lineCanvas;
  lineChart: any;

  constructor(navParams: NavParams, restProvider: RestProvider) {
    super(navParams.data);
    this.patient = navParams.data;
    restProvider.getQuestionnaireResponses(this.patient, "Dynamic Gait Index").then(data  => {
      this.responses = (data as any).entry.map(entry => (entry.resource as DgiResponse));
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

  private calcValue(): number {
    if (this.responses) {
      return this.answers().reduce((accumulator, currentValue) => {
        return accumulator + currentValue;
      });
    }
    return 0;
  }

  private answers(): number[] {
    return this.responses[0].item.map((item, index) => {
      if (index < 8 && item.answer[0].valueInteger !== undefined) {
        return +item.answer[0].valueInteger.toFixed(0);
      } else {
        return 0;
      }
    });
  }

  private getAids(): string {
    return this.responses && this.responses[0].item[8] ? this.responses[0].item[8].answer[0].valueString: "";
  }

  private getComments(): string {
    return this.responses && this.responses[0].item[9] ? this.responses[0].item[9].answer[0].valueString: "";
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
            data: [15, 19, 20, 21, 16, 15, 20], //gemäss DB
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
              stepSize: 2,
              max: 24,
              min: 0,
            },
          }],
        },
        annotation: {
          annotations: [{
            type: 'line',
            mode: 'horizontal',
            scaleID: 'y-axis-0',
            value: '19',
            borderColor: '#99cc99',
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

}
