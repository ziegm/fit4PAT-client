import {Component, ViewChild} from '@angular/core';
import {AlertController, NavParams} from 'ionic-angular';
import {PatientHelper} from "../../../../components/patient/patient-helper";
import {Chart, ChartOptions, ChartPoint} from "chart.js";
import {WorkflowPage} from "../../../../workflow/workflow-page";
import {DgiResponse} from "../../../../responses/assessment-type/dgi-response";
import {RestProvider} from "../../../../providers/rest/rest";
import ChartDataLabels from "chartjs-plugin-datalabels";
import {WorkflowParameters} from "../../../../workflow/workflow-parameters";
import {AssessmentHelper} from "../../assessment-helper";
import {AssessmentResponse} from "../../../../responses/assessment-response";
import {GraphDataAssembler} from "../graph-data-assembler";
import moment from "moment";
import {PdfPrinterProvider} from "../../../../providers/pdf-printer/pdf-printer";
import {DgiPdfDefnition} from "./dgi-pdf-defnition";
import Patient = fhir.Patient;

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

  constructor(navParams: NavParams, private alertCtrl: AlertController, private restProvider: RestProvider,
              private pdfPrinter: PdfPrinterProvider) {
    super(navParams.data);
    this.patient = (navParams.data as WorkflowParameters).patient;
    restProvider.getQuestionnaireResponses(this.patient, "Dynamic Gait Index").then(data => {
      this.responses = (data as any).entry.map(entry => (entry.resource as DgiResponse));

      if (this.workflowParameters.assessmentResponse && !(this.responses.find((response: DgiResponse) => {
        return response.id === this.workflowParameters.assessmentResponse.id;
      }))) {
        this.responses.push(this.workflowParameters.assessmentResponse as DgiResponse);
        this.responses.sort((a, b) => {
          return new Date(b.authored).getTime() - new Date(a.authored).getTime();
        });
      }
      this.workflowParameters.assessmentResponse = undefined;

      this.lineChart.data.datasets[0].data = GraphDataAssembler.assemble(this.responses, this.executeGraphDate, this.calcGraphValue);
      this.lineChart.update();
    });
  }

  private presentAlert(): void{
    let alert = this.alertCtrl.create({
      title: 'Prototyp',
      message: 'Diese Funktion wurde leider noch nicht umgesetzt.',
      buttons: ['OK']
    });
    alert.present();
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
        if (index < 8 && item.answer !== undefined && item.answer[0].valueInteger !== undefined) {
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

  /**
   *  View representation of a patient in the format:
   *  [Room:] Family name, given name
   * @param patient   The patient to be represented.
   */
  private viewPatientName(patient: Patient) {
    return PatientHelper.viewPatientName(patient);
  }

  /**
   * View representation of a patients additional information in the format:
   * Gender, birthdate (age), case id (Fall-ID)
   * @param patient   The patient to be represented.
   */
  private viewPatientInfos(patient: Patient) {
    return PatientHelper.viewPatientInfos(patient);
  }

  openLink() {
    window.open('https://www.sralab.org/rehabilitation-measures/dynamic-gait-index', '_system');
  }

  private showDetails(chartPoint: ChartPoint) {
    this.restProvider.getQuestionnaireResponses(this.patient, "Dynamic Gait Index",
      chartPoint.x as Date).then(data => {
        let response = (data as any).entry[0].resource as AssessmentResponse;
        this.viewDetailsPopup(response);
    });
  }

  private viewDetailsPopup(response: AssessmentResponse): void {
    let alert = this.alertCtrl.create({
      title: AssessmentHelper.actualDate(response.authored),
      cssClass: 'detailsDgi',
      subTitle: 'Dynamic Gait Index',
      message:
        '<ul><li><b>Erreichte Punkte: </b> ' + this.calcGraphValue(response) + '/24 Punkten</li></br>' +
        '<li>1. Gehen auf ebener Strecke: <b>' + response.item[0].answer[0].valueInteger + ' Punkt(e)</b></li>' +
        '<li>2. Gehen mit Tempowechsel: <b>' + response.item[1].answer[0].valueInteger + ' Punkt(e)</b></li>' +
        '<li>3. Gehen mit Kopfdrehung: <b>' + response.item[2].answer[0].valueInteger + ' Punkt(e)</b></li>' +
        '<li>4. Gehen mit Kopfneigung: <b>' + response.item[3].answer[0].valueInteger + ' Punkt(e)</b></li>' +
        '<li>5. Gehen und Drehung: <b>' + response.item[4].answer[0].valueInteger + ' Punkt(e)</b></li>' +
        '<li>6. Gehen über Hindernisse: <b>' + response.item[5].answer[0].valueInteger + ' Punkt(e)</b></li>' +
        '<li>7. Gehen um Hindernisse: <b>' + response.item[6].answer[0].valueInteger + ' Punkt(e)</b></li>' +
        '<li>8. Treppensteigen: <b>' + response.item[7].answer[0].valueInteger + ' Punkt(e)</b></li></br>' +
        '<li><b>Hilfsmittel: </b> ' + response.item[8].answer[0].valueString + '</li>' +
        '<li><b>Bemerkungen: </b> ' + response.item[9].answer[0].valueString + '</li></ul>',
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
            font: {
              size: 16,
              weight: 'bold'
            },
            // Value transformation for the label of the displayed point
            formatter: function(value, context) {
              return value.y + " (" + moment(new Date(value.x)).format("DD.MM.") + ")";
            }
          }
        },
        events: ['click'],
        'onClick': function (evt, item) {
          let element = this.lineChart.getElementAtEvent(evt);
          if (element.length > 0) {
            let selectedChartPoint = this.lineChart.config.data.datasets[element[0]._datasetIndex].data[element[0]._index];
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
              stepSize: 2,
              max: 24,
              min: 0
            },
            scaleLabel: {
              display: true,
              labelString: 'Erreichte Punkte'
            }
          }],
        },
        annotation: {
          annotations: [{
            id: 'box1',
            type: 'box',
            yScaleID: 'y-axis-0',
            yMin: 0,
            yMax: 19,
            backgroundColor: '#ffcccc',
            borderColor: '#ffb2b2',
          }, {
            type: 'line',
            mode: 'horizontal',
            scaleID: 'y-axis-0',
            value: '2',
            borderColor: '#ffb2b2',
            borderWidth: 2,
          }, {
            type: 'line',
            mode: 'horizontal',
            scaleID: 'y-axis-0',
            value: '4',
            borderColor: '#ffb2b2',
            borderWidth: 2,
          }, {
            type: 'line',
            mode: 'horizontal',
            scaleID: 'y-axis-0',
            value: '6',
            borderColor: '#ffb2b2',
            borderWidth: 2,
          }, {
            type: 'line',
            mode: 'horizontal',
            scaleID: 'y-axis-0',
            value: '8',
            borderColor: '#ffb2b2',
            borderWidth: 2,
          }, {
            type: 'line',
            mode: 'horizontal',
            scaleID: 'y-axis-0',
            value: '10',
            borderColor: '#ffb2b2',
            borderWidth: 2,
          }, {
            type: 'line',
            mode: 'horizontal',
            scaleID: 'y-axis-0',
            value: '12',
            borderColor: '#ffb2b2',
            borderWidth: 2,
          }, {
            type: 'line',
            mode: 'horizontal',
            scaleID: 'y-axis-0',
            value: '14',
            borderColor: '#ffb2b2',
            borderWidth: 2,
          }, {
            type: 'line',
            mode: 'horizontal',
            scaleID: 'y-axis-0',
            value: '16',
            borderColor: '#ffb2b2',
            borderWidth: 2,
          }, {
            type: 'line',
            mode: 'horizontal',
            scaleID: 'y-axis-0',
            value: '18',
            borderColor: '#ffb2b2',
            borderWidth: 2,
          },{
            type: 'line',
            mode: 'horizontal',
            scaleID: 'y-axis-0',
            value: '19',
            borderColor: '#ffc04c',
            borderWidth: 3,
            label: {
              backgroundColor: '#ffc04c',
              fontStyle: "normal",
              fontColor: "#000000",
              xPadding: 6,
              yPadding: 6,
              cornerRadius: 6,
              position: "right",
              xAdjust: 0,
              yAdjust: 0,
              enabled: true,
              content: "Cut-off Point für Stürze"
            }
          }, {
            id: 'box4',
            type: 'box',
            yScaleID: 'y-axis-0',
            yMin: 19,
            yMax: 24,
            backgroundColor: '#cce5cc',
            borderColor: '#bbdcbb',
          }, {
            type: 'line',
            mode: 'horizontal',
            scaleID: 'y-axis-0',
            value: '20',
            borderColor: '#bbdcbb',
            borderWidth: 2,
          }, {
            type: 'line',
            mode: 'horizontal',
            scaleID: 'y-axis-0',
            value: '22',
            borderColor: '#bbdcbb',
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

  private generateAndShowPdf(): void {
    this.pdfPrinter.createPdf(new DgiPdfDefnition(this.patient, this.lineChart));
    this.pdfPrinter.downloadPdf("dgi.pdf");
  }

  private fallRisk(score: string, defaultStyle: string): string {
    switch (score) {
      case 'CUT_OFF_POINT':
        if (19 === this.calcValue()) {
          return 'orangeActive';
        }
        return defaultStyle;
      case 'AT_RISK':
        if (this.calcValue() < 19) {
          return 'redActive';
        }
        return defaultStyle;
      case 'NO_RISK':
        if (this.calcValue() > 19) {
          return 'greenActive';
        }
          default:
        return defaultStyle;
    }
  }
}
