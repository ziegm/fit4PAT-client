import {Component, ViewChild} from '@angular/core';
import {AlertController, IonicPage, NavParams} from 'ionic-angular';
import {PatientHelper} from "../../../../components/patient/patient-helper";
import {Chart, ChartOptions, ChartPoint} from 'chart.js';
import {ChartAnnotation} from 'chartjs-plugin-annotation';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {WorkflowPage} from "../../../../workflow/workflow-page";
import {RestProvider} from "../../../../providers/rest/rest";
import {DemmiResponse} from "../../../../responses/assessment-type/demmi-response";
import {DemmiResultTranslation} from "./demmi-result-translation";
import {WorkflowParameters} from "../../../../workflow/workflow-parameters";
import {AssessmentHelper} from "../../assessment-helper";
import {AssessmentResponse} from "../../../../responses/assessment-response";
import {GraphDataAssembler} from "../graph-data-assembler";
import {DemmiResult} from "./demmi-result";
import Patient = fhir.Patient;
import {NotImplementedYetComponent} from "../../../../components/not-implemented-yet/not-implemented-yet";

@IonicPage()
@Component({
  selector: 'page-evaluation-demmi',
  templateUrl: 'evaluation-demmi.html',
})
export class EvaluationDemmiPage extends WorkflowPage {
  private patient: Patient;
  private responses: DemmiResponse[];
  private isSearchbarVisible = false;
  @ViewChild('lineCanvas') private lineCanvas;
  private lineChart: Chart;

  constructor(navParams: NavParams, private alertCtrl: AlertController, private restProvider: RestProvider) {
    super(navParams.data);
    this.patient = (navParams.data as WorkflowParameters).patient;
    restProvider.getQuestionnaireResponses(this.patient, "de Morton Mobility Index").then(data  => {
      this.responses = (data as any).entry.map(entry => (entry.resource as DemmiResponse));

      if (this.workflowParameters.assessmentResponse && !(this.responses.find((response: DemmiResponse) => {
        return response.id === this.workflowParameters.assessmentResponse.id;
      }))) {
        this.responses.push(this.workflowParameters.assessmentResponse as DemmiResponse);
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

  private calcRawValue(): number {
    if (this.responses) {
      return DemmiResult.calcRawValue(this.responses[0]);
    }
    return 0;
  }

  private translateDemmiScore(): number {
    return this.responses ? this.calcGraphValue(this.responses[0]) : 0;
  }

  public calcGraphValue(response: AssessmentResponse): number {
    return new DemmiResultTranslation()[DemmiResult.calcRawValue(response)];
  }

  private getAids(): string {
    return this.responses && this.responses[0].item[15] ? this.responses[0].item[15].answer[0].valueString: "";
  }

  private getComments(): string {
    return this.responses && this.responses[0].item[16] ? this.responses[0].item[16].answer[0].valueString: "";
  }

  private isIndependend(range: string): boolean {
    let age = PatientHelper.patientAge(this.patient);
    switch(range) {
      case 'BETWEEN_60_AND_69':
        if (60 <= age && age <= 69 && 85 <= this.translateDemmiScore()) {
          return true;
        }
        break;
      case 'BETWEEN_70_AND_79':
        if (70 <= age && age <= 79 && 85 <= this.translateDemmiScore()) {
          return true;
        }
        break;
      case 'BETWEEN_80_AND_89':
        if (80 <= age && age <= 89 && 75 <= this.translateDemmiScore()) {
          return true;
        }
        break;
      default:
        return false;
    }
  }

  private exitDestination(destination: string, defaultStyle: string): string {
    switch (destination) {
      case 'OTHER_INSTITUTION':
        if (40 <= this.translateDemmiScore() && this.translateDemmiScore() <= 50) {
          return 'orangeActive';
        }
        return defaultStyle;
      case 'HOME':
        if (this.translateDemmiScore() >= 62 && this.translateDemmiScore() <= 70) {
          return 'yellowActive';
        } else if (this.translateDemmiScore() > 70) {
          return 'greenActive';
        }
        return defaultStyle;
      default:
        return defaultStyle;
    }
  }

  private viewPatientName(patient: Patient) {
    return PatientHelper.viewPatientName(patient);
  }
  private viewPatientInfos(patient: Patient) {
    return PatientHelper.viewPatientInfos(patient);
  }

  private showDetails(chartPoint: ChartPoint) {
    this.restProvider.getQuestionnaireResponses(this.patient, "de Morton Mobility Index",
      chartPoint.x as Date).then(data => {
      let response = (data as any).entry[0].resource as AssessmentResponse;
      this.viewDetailsPopup(response);
    });
  }

  private viewDetailsPopup(response: AssessmentResponse): void {
    let alert = this.alertCtrl.create({
      title: AssessmentHelper.actualDate(response.authored),
      cssClass: 'detailsDemmi',
      subTitle: 'de Morton Mobility Index',
      message:
        '<ul><li><b>Rohwert:</b> ' + DemmiResult.calcRawValue(response) + "/19 Punkten" + '</li></br>' +
        '<li><b>DEMMI Score:</b> ' + this.calcGraphValue(response) + "/100 Punkten" + '</li></br>' +
        '<li>1. Aufgabe: ' + response.item[0].answer[0].valueInteger.toFixed(0) + " Punkt(e)" + '</li>' +
        '<li>2. Aufgabe: ' + response.item[1].answer[0].valueInteger.toFixed(0) + " Punkt(e)" + '</li>' +
        '<li>3. Aufgabe: ' + response.item[2].answer[0].valueInteger.toFixed(0) + " Punkt(e)" + '</li></br>' +
        '<li>4. Aufgabe: ' + response.item[3].answer[0].valueInteger.toFixed(0) + " Punkt(e)" + '</li>' +
        '<li>5. Aufgabe: ' + response.item[4].answer[0].valueInteger.toFixed(0) + " Punkt(e)" + '</li>' +
        '<li>6. Aufgabe: ' + response.item[5].answer[0].valueInteger.toFixed(0) + " Punkt(e)" + '</li></br>' +
        '<li>7. Aufgabe: ' + response.item[6].answer[0].valueInteger.toFixed(0) + " Punkt(e)" + '</li>' +
        '<li>8. Aufgabe: ' + response.item[7].answer[0].valueInteger.toFixed(0) + " Punkt(e)" + '</li>' +
        '<li>9. Aufgabe: ' + response.item[8].answer[0].valueInteger.toFixed(0) + " Punkt(e)" + '</li>' +
        '<li>10. Aufgabe: ' + response.item[9].answer[0].valueInteger.toFixed(0) + " Punkt(e)" + '</li></br>' +
        '<li>11. Aufgabe: ' + response.item[10].answer[0].valueInteger.toFixed(0) + " Punkt(e)" + '</li>' +
        '<li>12. Aufgabe: ' + response.item[11].answer[0].valueInteger.toFixed(0) + " Punkt(e)" + '</li></br>' +
        '<li>13. Aufgabe: ' + response.item[12].answer[0].valueInteger.toFixed(0) + " Punkt(e)" + '</li>' +
        '<li>14. Aufgabe: ' + response.item[13].answer[0].valueInteger.toFixed(0) + " Punkt(e)" + '</li>' +
        '<li>15. Aufgabe: ' + response.item[14].answer[0].valueInteger.toFixed(0) + " Punkt(e)" + '</li></br>' +
        '<li><b>Hilfsmittel:</b> ' + response.item[15].answer[0].valueString + '</li></br>' +
        '<li><b>Bemerkungen:</b> ' + response.item[16].answer[0].valueString + '</li></ul>',
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
        datasets: [{
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
            data: [],
            spanGaps: false,
          }],
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
          },
          usePointStyle: true,
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
              stepSize: 10,
              max: 100,
              min: 0,
            },
            scaleLabel: {
              display: true,
              labelString: 'DEMMI Score'
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
            borderColor: '#ffb2b2',
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
            value: '20',
            borderColor: '#ffb2b2',
            borderWidth: 2,
          }, {
            type: 'line',
            mode: 'horizontal',
            scaleID: 'y-axis-0',
            value: '30',
            borderColor: '#ffb2b2',
            borderWidth: 2,
          }, {
            id: 'box2',
            type: 'box',
            yScaleID: 'y-axis-0',
            yMin: 40,
            yMax: 60,
            backgroundColor: '#ffedcc',
            borderColor: '#ffe4b2',
          }, {
            type: 'line',
            mode: 'horizontal',
            scaleID: 'y-axis-0',
            value: '50',
            borderColor: '#ffe4b2',
            borderWidth: 2,
          }, {
            id: 'box3',
            type: 'box',
            yScaleID: 'y-axis-0',
            yMin: 60,
            yMax: 70,
            backgroundColor: '#ffffcc',
            borderColor: '#ffffb2',
          }, {
            id: 'box4',
            type: 'box',
            yScaleID: 'y-axis-0',
            yMin: 70,
            yMax: 100,
            backgroundColor: '#cce5cc',
            borderColor: '#bbdcbb',
          }, {
            type: 'line',
            mode: 'horizontal',
            scaleID: 'y-axis-0',
            value: '80',
            borderColor: '#bbdcbb',
            borderWidth: 2,
          }, {
            type: 'line',
            mode: 'horizontal',
            scaleID: 'y-axis-0',
            value: '90',
            borderColor: '#bbdcbb',
            borderWidth: 2
          }],
          // Defines when the annotations are drawn.
          // This allows positioning of the annotation relative to the other
          // elements of the graph.
          // Should be one of: afterDraw, afterDatasetsDraw, beforeDatasetsDraw
          // See http://www.chartjs.org/docs/#advanced-usage-creating-plugins
          drawTime: "beforeDatasetsDraw" // (default)
        }
      } as ChartOptions
    });
  }
}
