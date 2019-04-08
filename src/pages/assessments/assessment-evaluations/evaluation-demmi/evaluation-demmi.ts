import {Component, ViewChild} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {PatientHelper} from "../../../../components/patient/patient-helper";
import {Chart, ChartOptions} from 'chart.js';
import {ChartComponent} from "angular2-chartjs";
import {ChartAnnotation} from 'chartjs-plugin-annotation';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {WorkflowPage} from "../../../../workflow/workflow-page";
import {RestProvider} from "../../../../providers/rest/rest";
import {DemmiResponse} from "../../../../responses/assessment-type/demmi-response";
import {DemmiResultTranslation} from "./demmi-result-translation";
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
  @ViewChild(ChartComponent) chart: ChartComponent;
  @ViewChild('lineCanvas') lineCanvas;
  lineChart: any;

  constructor(navParams: NavParams, private alertCtrl: AlertController, public navCtrl: NavController, restProvider: RestProvider) {
    super(navParams.data);
    this.patient = navParams.data;
    restProvider.getQuestionnaireResponses(this.patient, "de Morton Mobility Index").then(data  => {
      this.responses = (data as any).entry.map(entry => (entry.resource as DemmiResponse));
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

  private calcRawValue(): number {
    if (this.responses) {
      return this.answers().reduce((accumulator, currentValue) => {
        return accumulator + currentValue;
      });
    }
    return 0;
  }

  private answers(): number[] {
    return this.responses[0].item.map((item, index) => {
      if (index < 15 && item.answer[0].valueInteger !== undefined) {
        return +item.answer[0].valueInteger.toFixed(0);
      } else {
        return 0;
      }
    });
  }

  private translateDemmiScore(): number {
    return new DemmiResultTranslation()[this.calcRawValue()];
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

  private viewPatient(patient: Patient) {
    return PatientHelper.viewPatient(patient);
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
      plugins: [ChartDataLabels],
      options: {
        plugins: {
          // Change options for ALL labels of THIS CHART
          datalabels: {
            color: '#888888',
            align: 'top',
          }
        },
        events: ['click'],
        'onClick': function (evt, item) {
          var element = this.lineChart.getElementAtEvent(evt);
          if(element.length > 0){
            this.showDetails(item);
          }
        }.bind(this),
        //showTooltips: false,
        tooltips: {
          display: false,
          enabled: false,
          custom: (tooltipModel) => {
            //if (tooltipModel.opacity === 0) {
              //this.hide();
              //return;
          }
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
            //borderColor: 'rgba(100, 100, 100, 0.2)',
          }, {
            id: 'box2',
            type: 'box',
            yScaleID: 'y-axis-0',
            yMin: 40,
            yMax: 60,
            backgroundColor: '#ffedcc',
            //borderColor: 'rgba(200, 100, 200, 0.2)',
          }, {
            id: 'box3',
            type: 'box',
            yScaleID: 'y-axis-0',
            yMin: 60,
            yMax: 70,
            backgroundColor: '#ffffcc',
            //borderColor: 'rgba(200, 100, 200, 0.2)',
          }, {
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
        },
        onAnimationProgress: function() { this.drawDatasetPointsLabels() }.bind(this),
        onAnimationComplete: function() { this.drawDatasetPointsLabels() }.bind(this)
      } as ChartOptions,
      //plugins: [ChartAnnotation]
    });
  }

  public drawDatasetPointsLabels() {
    this.lineCanvas.nativeElement.font = '.9rem sans-serif';
    this.lineCanvas.nativeElement.fillStyle = '#AAA';
    //this.lineCanvas.nativeElement.textAlign="center";
    this.lineCanvas.nativeElement.offset="top";
    (this.lineChart.datasets).each(function(idx,dataset){
      (dataset.points).each(function(pdx,pointinfo){
        // First dataset is shifted off the scale line.
        // Don't write to the canvas for the null placeholder.
        if ( pointinfo.value !== null ) {
          this.lineCanvas.nativeElement.fillText(pointinfo.value,pointinfo.x,pointinfo.y - 15);
        }
      });
    });
  }
}
