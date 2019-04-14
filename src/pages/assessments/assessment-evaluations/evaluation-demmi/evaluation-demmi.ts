import {Component, ViewChild} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {PatientHelper} from "../../../../components/patient/patient-helper";
import {Chart, ChartOptions} from 'chart.js';
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

  constructor(navParams: NavParams, private alertCtrl: AlertController, public navCtrl: NavController, restProvider: RestProvider) {
    super(navParams.data);
    this.patient = (navParams.data as WorkflowParameters).patient;
    restProvider.getQuestionnaireResponses(this.patient, "de Morton Mobility Index").then(data  => {
      this.responses = (data as any).entry.map(entry => (entry.resource as DemmiResponse));
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

  private onSearchbarVisibilityChange(isVisible: boolean): void {
    this.isSearchbarVisible = isVisible;
  }

  public showDetails(item){
    let alert = this.alertCtrl.create({
      title: 'DATUM',
      cssClass: 'detailsDemmi',
      subTitle: 'de Morton Mobility Index',
      message: '<ul><li><b>Rohwert:</b> ' + item.toString() + '</li></br>' +
        '<li><b>DEMMI Score:</b> ' + item.toLocaleString() + '</li></br>' +
        '<li><b>Aufgabe 1:</b> ' + item.toString() + '</li></br>' +
        '<li><b>Aufgabe 2:</b> ' + item.toString() + '</li></br>' +
        '<li><b>Aufgabe 3:</b> ' + item.toString() + '</li></br>' +
        '<li><b>Aufgabe 4:</b> ' + item.toString() + '</li></br>' +
        '<li><b>Aufgabe 5:</b> ' + item.toString() + '</li></br>' +
        '<li><b>Aufgabe 6:</b> ' + item.toString() + '</li></br>' +
        '<li><b>Aufgabe 7:</b> ' + item.toString() + '</li></br>' +
        '<li><b>Aufgabe 8:</b> ' + item.toString() + '</li></br>' +
        '<li><b>Aufgabe 9:</b> ' + item.toString() + '</li></br>' +
        '<li><b>Aufgabe 10:</b> ' + item.toString() + '</li></br>' +
        '<li><b>Aufgabe 11:</b> ' + item.toString() + '</li></br>' +
        '<li><b>Aufgabe 12:</b> ' + item.toString() + '</li></br>' +
        '<li><b>Aufgabe 13:</b> ' + item.toString() + '</li></br>' +
        '<li><b>Aufgabe 14:</b> ' + item.toString() + '</li></br>' +
        '<li><b>Aufgabe 15:</b> ' + item.toString() + '</li></br>' +
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
          var element = this.lineChart.getElementAtEvent(evt);
          if(element.length > 0){
            this.showDetails(item);
          }}.bind(this),
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
            bounds: "ticks"
          }],
          yAxes: [{
            ticks: {
              fontColor: "black",
              fontSize: 18,
              beginAtZero: true,
              stepSize: 10,
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
