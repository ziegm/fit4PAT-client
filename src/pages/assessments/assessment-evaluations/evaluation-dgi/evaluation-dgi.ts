import {Component, ViewChild} from '@angular/core';
import {AlertController, IonicPage, NavParams} from 'ionic-angular';
import {PatientHelper} from "../../../../components/patient/patient-helper";
import {Chart, ChartOptions} from "chart.js";
import {WorkflowPage} from "../../../../workflow/workflow-page";
import {DgiResponse} from "../../../../responses/assessment-type/dgi-response";
import {RestProvider} from "../../../../providers/rest/rest";
import ChartDataLabels from "chartjs-plugin-datalabels";
import {WorkflowParameters} from "../../../../workflow/workflow-parameters";
import {AssessmentHelper} from "../../assessment-helper";
import {AssessmentResponse} from "../../../../responses/assessment-response";
import {GraphDataAssembler} from "../graph-data-assembler";
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
  @ViewChild('lineCanvas') private lineCanvas;
  private lineChart: Chart;

  constructor(navParams: NavParams, private alertCtrl: AlertController, restProvider: RestProvider) {
    super(navParams.data);
    this.patient = (navParams.data as WorkflowParameters).patient;
    restProvider.getQuestionnaireResponses(this.patient, "Dynamic Gait Index").then(data => {
      this.responses = (data as any).entry.map(entry => (entry.resource as DgiResponse));
      this.lineChart.data.datasets[0].data = GraphDataAssembler.assemble(this.responses, this.executeGraphDate, this.calcGraphValue);
      this.lineChart.update();
    });
  }

  private executeDate(): string {
    return this.responses ? AssessmentHelper.actualDate(this.responses[0].authored) : "";
  }

  private executeGraphDate(response: AssessmentResponse): Date {
    return AssessmentHelper.dateTimeToDate(response.authored);
  }

  private calcValue(): number {
    if (this.responses) {
      return this.calcGraphValue(this.responses[0]);
    }
    return 0;
  }

  public calcGraphValue(response: AssessmentResponse): number {
    let graphAnswers = function (response: AssessmentResponse): number[] {
      return response.item.map((item, index) => {
        if (index < 8 && item.answer[0].valueInteger !== undefined) {
          return +item.answer[0].valueInteger.toFixed(0);
        } else {
          return 0;
        }
      });
    };

    return graphAnswers(response).reduce((accumulator, currentValue) => {
      return accumulator + currentValue;
    });
  }

  private getAids(): string {
    return this.responses && this.responses[0].item[8] ? this.responses[0].item[8].answer[0].valueString : "";
  }

  private getComments(): string {
    return this.responses && this.responses[0].item[9] ? this.responses[0].item[9].answer[0].valueString : "";
  }

  private viewPatientName(patient: Patient) {
    return PatientHelper.viewPatientName(patient);
  }

  private viewPatientInfos(patient: Patient) {
    return PatientHelper.viewPatientInfos(patient);
  }

  private onSearchbarVisibilityChange(isVisible: boolean): void {
    this.isSearchbarVisible = isVisible;
  }

  openLink() {
    window.open('https://www.sralab.org/rehabilitation-measures/dynamic-gait-index', '_system');
  }

  public showDetails(item) {
    let alert = this.alertCtrl.create({
      title: 'DATUM',
      cssClass: 'detailsDgi',
      subTitle: 'Dynamic Gait Index',
      message: '<ul><li><b>Punkte insgesamt:</b> ' + item.toString() + '</li></br>' +
        '<li><b>Aufgabe 1:</b> ' + item.toString() + '</li></br>' +
        '<li><b>Aufgabe 2:</b> ' + item.toString() + '</li></br>' +
        '<li><b>Aufgabe 3:</b> ' + item.toString() + '</li></br>' +
        '<li><b>Aufgabe 4:</b> ' + item.toString() + '</li></br>' +
        '<li><b>Aufgabe 5:</b> ' + item.toString() + '</li></br>' +
        '<li><b>Aufgabe 6:</b> ' + item.toString() + '</li></br>' +
        '<li><b>Aufgabe 7:</b> ' + item.toString() + '</li></br>' +
        '<li><b>Aufgabe 8:</b> ' + item.toString() + '</li></br>' +
        '<li><b>Hilfsmittel:</b> ' + item.toString() + '</li></br>' +
        '<li><b>Bemerkungen:</b> ' + item.toLocaleString() + '</li></ul>',
      buttons: [
        {
          text: 'Ok',
          role: 'ok',
          handler: data => {
            console.log('Ok clicked');
          }
        },
      ]
    });
    alert.present();
  }

  ionViewDidLoad() {
    Chart.plugins.unregister(ChartDataLabels);
    this.lineChart = new Chart(this.lineCanvas.nativeElement, {
      type: 'line',
      data: {
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
            data: [],
            spanGaps: false
          }
        ]
      },
      plugins: [ChartDataLabels],
      options: {
        plugins: {
          // Change options for ALL labels of THIS CHART
          datalabels: {
            color: '#888888',
            align: 'top',
            // Value transformation for the label of the displayed point
            formatter: function(value, context) {
              return value.y;
            }
          }
        },
        events: ['click'],
        'onClick': function (evt, item) {
          var element = this.lineChart.getElementAtEvent(evt);
          if (element.length > 0) {
            this.showDetails(item);
          }
        }.bind(this),
        tooltips: {
          display: false,
          enabled: false
        },
        legend: {
          display: false,
          labels: {
            fontColor: "black",
            fontSize: 18
          }
        },
        scales: {
          xAxes: [{
            type: 'time',
            distribution: 'linear',
            time : {
              stepSize: 7,
              unit: "day",
              displayFormats: {
                day: "DD.MM.YYYY"
              },
            },
            bounds: "ticks"
          }],
          yAxes: [{
            ticks: {
              fontColor: "black",
              fontSize: 18,
              beginAtZero: true,
              stepSize: 2,
              max: 24,
              min: 0
            },
          }],
        },
        annotation: {
          annotations: [{
            type: 'line',
            mode: 'horizontal',
            scaleID: 'y-axis-0',
            value: '19',
            borderColor: '#ffc04c',
            borderWidth: 3
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
