import {Component, ViewChild} from '@angular/core';
import {AlertController, IonicPage, NavParams} from 'ionic-angular';
import {PatientHelper} from "../../../../components/patient/patient-helper";
import {Chart, ChartOptions, ChartPoint} from "chart.js";
import {ChartAnnotation} from 'chartjs-plugin-annotation';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {RestProvider} from "../../../../providers/rest/rest";
import {WalkingtestResponse} from "../../../../responses/assessment-type/walkingtest-response";
import {WorkflowPage} from "../../../../workflow/workflow-page";
import {WorkflowParameters} from "../../../../workflow/workflow-parameters";
import {AssessmentHelper} from "../../assessment-helper";
import {AssessmentResponse} from "../../../../responses/assessment-response";
import {WalkingtestResult} from "./walkingtest-result";
import {GraphDataAssembler} from "../graph-data-assembler";
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
  @ViewChild('lineCanvas') private lineCanvas;
  private lineChart: Chart;

  constructor(navParams: NavParams, private alertCtrl: AlertController, private restProvider: RestProvider) {
    super(navParams.data);
    this.patient = (navParams.data as WorkflowParameters).patient;
    restProvider.getQuestionnaireResponses(this.patient, "Timed Walking Test").then(data => {
      this.responses = (data as any).entry.map(entry => (entry.resource as WalkingtestResponse));
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

  private firstTry(): number {
    return this.responses ? WalkingtestResult.try(0, this.responses[0]) : 0;
  }

  private secondTry(): number {
    return this.responses ? WalkingtestResult.try(1, this.responses[0]) : 0;
  }

  private thirdTry(): number {
    return this.responses ? WalkingtestResult.try(2, this.responses[0]) : 0;
  }

  private calcAverageRounded(): string {
    return this.responses ? WalkingtestResult.calcAverageRounded(this.responses[0]) : "";
  }

  private calcSpeed(): string {
    return this.responses ? WalkingtestResult.calcSpeed(this.responses[0]) : "";
  }

  public calcGraphValue(response: AssessmentResponse): number {
    return +WalkingtestResult.calcSpeed(response);
  }

  private getAids(): string {
    return this.responses && this.responses[0].item[3] ? this.responses[0].item[3].answer[0].valueString : "";
  }

  private getComments(): string {
    return this.responses && this.responses[0].item[4] ? this.responses[0].item[4].answer[0].valueString : "";
  }

  private viewPatientName(patient: Patient) {
    return PatientHelper.viewPatientName(patient);
  }

  private viewPatientInfos(patient: Patient) {
    return PatientHelper.viewPatientInfos(patient);
  }

  private showDetails(chartPoint: ChartPoint) {
    this.restProvider.getQuestionnaireResponses(this.patient, "Timed Walking Test",
      chartPoint.x as Date).then(data => {
      let response = (data as any).entry[0].resource as AssessmentResponse;
      this.viewDetailsPopup(response);
    });
  }

  private viewDetailsPopup(response: AssessmentResponse): void {
    let alert = this.alertCtrl.create({
      title: AssessmentHelper.actualDate(response.authored),
      cssClass: 'detailsTWT',
      subTitle: 'Timed Walking Test',
      message:
        '<ul><li><b>Durchschnittswert:</b> ' + WalkingtestResult.calcAverageRounded(response) + " Sekunden" + '</li></br>' +
        '<li><b>Ganggeschwindigkeit:</b> ' + WalkingtestResult.calcSpeed(response) + " Meter/Sekunde" + '</li></br>' +
        '<li>1. Durchführung: ' + WalkingtestResult.try(0, response) + " Sekunden" + '</li></br>' +
        '<li>2. Durchführung: ' + WalkingtestResult.try(1, response) + " Sekunden" + '</li></br>' +
        '<li>3. Durchführung: ' + WalkingtestResult.try(2, response) + " Sekunden" + '</li></br>' +
        '<li><b>Hilfsmittel:</b> ' + response.item[3].answer[0].valueString + '</li></br>' +
        '<li><b>Bemerkungen:</b> ' + response.item[4].answer[0].valueString + '</li></ul>',
      buttons: [
        {
          text: 'Ok',
          role: 'ok'
        },
      ]
    });
    alert.present();
  }

  ionViewDidLoad() {
    this.lineChart = new Chart(this.lineCanvas.nativeElement, {
      type: 'line',
      data: {
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
            data: [],
            spanGaps: false,
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
              return value.y.toFixed(2);
            }
          }
        },
        events: ['click'],
        'onClick': function (evt, item) {
          let element = this.lineChart.getElementAtEvent(evt);
          let selectedChartPoint = this.lineChart.config.data.datasets[element[0]._datasetIndex].data[element[0]._index];

          if (element.length > 0) {
            this.showDetails(selectedChartPoint);
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
            bounds: "ticks",
            scaleLabel: {
              display: true,
              labelString: 'Datum der Durchführung'
            }
          }],
          yAxes: [{
            ticks: {
              fontColor: "black",
              fontSize: 18,
              beginAtZero: true,
              stepSize: 0.2,
              max: 3,
              min: 0,
            },
            scaleLabel: {
              display: true,
              labelString: 'Ganggeschwindigkeit in Meter/Sekunde'
            }
          }],
        },
        annotation: {
          annotations: [{
            type: 'line',
            mode: 'horizontal',
            scaleID: 'y-axis-0',
            value: '1.37',
            borderColor: '#ffc04c',
            borderWidth: 3,
          }, {
            type: 'line',
            mode: 'horizontal',
            scaleID: 'y-axis-0',
            value: '1.23',
            borderColor: '#ffc04c',
            borderWidth: 3,
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

  openLink() {
    window.open('https://www.sralab.org/rehabilitation-measures/10-meter-walk-test', '_system');
  }

  private highlightResult(gender: string, speed: string, css: string[]): string[] {
    let highlightStyle = this.takeOverStylesFromInputCss(['cell', 'orangeActive'], css);

    if (speed === this.calcSpeed() && this.patient.gender === gender) {
      return highlightStyle;
    }

    return css;
  }

  private highlightFasterResult(gender: string, speed: string, css: string[]): string[] {
    let highlightStyle = this.takeOverStylesFromInputCss(['cell', 'orangeActive'], css);

    if (speed < this.calcSpeed() && this.patient.gender === gender) {
      return highlightStyle;
    }

    return css;
  }

  private highlightSlowerResult(gender: string, speed: string, css: string[]): string[] {
    let highlightStyle = this.takeOverStylesFromInputCss(['cell', 'orangeActive'], css);

    if (speed > this.calcSpeed() && this.patient.gender === gender) {
      return highlightStyle;
    }

    return css;
  }

  private takeOverStylesFromInputCss(highlightStyle: string[], css: string[]): string[] {
    if (css.find(style => style === 'cellDown')) {
      highlightStyle.push('cellDown');
    }

    if (css.find(style => style === 'lastCell')) {
      highlightStyle.push('lastCell');
    }

    return highlightStyle;
  }
}
