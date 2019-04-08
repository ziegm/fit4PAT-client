import {Component, ViewChild} from '@angular/core';
import {AlertController, IonicPage, NavParams} from 'ionic-angular';
import {PatientHelper} from "../../../../components/patient/patient-helper";
import {Chart, ChartOptions} from "chart.js";
import {ChartAnnotation} from 'chartjs-plugin-annotation';
import ChartDataLabels from 'chartjs-plugin-datalabels';
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

  constructor(navParams: NavParams, private alertCtrl: AlertController, restProvider: RestProvider) {
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

  private firstTry(): number {
    return this.responses ? this.responses[0].item[0].answer[0].valueInteger: 0;
  }

  private secondTry(): number {
    return this.responses ? this.responses[0].item[1].answer[0].valueInteger: 0;
  }

  private thirdTry(): number {
    return this.responses ? this.responses[0].item[2].answer[0].valueInteger: 0;
  }

  private calcAverage(): number {
    return (this.firstTry() + this.secondTry() + this.thirdTry()) / 3;
  }

  private calcAverageRounded(): string {
    return this.calcAverage().toFixed(0);
  }

  private calcSpeed(): string {
    return (1 / (this.calcAverage() / 6)).toFixed(2);
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

  public showDetails(item){
    let alert = this.alertCtrl.create({
      title: 'DATUM',
      subTitle: 'Timed Walking Test',
      message: '<ul><li><b>Ganggeschwindigkeit:</b> ' + item.toString() + '</li></br>' +
        '<li><b>Durchschnittswert:</b> ' + item.toLocaleString() + '</li></br>' +
        '<li><b>1. Durchführung:</b> ' + item.toString() + '</li></br>' +
        '<li><b>2. Durchführung:</b> ' + item.toString() + '</li></br>' +
        '<li><b>3. Durchführung:</b> ' + item.toString() + '</li></br>' +
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
        },
        onAnimationProgress: function() { this.drawDatasetPointsLabels() }.bind(this),
        onAnimationComplete: function() { this.drawDatasetPointsLabels() }.bind(this)
      } as ChartOptions,
    });
  }

  openLink(){
    window.open('https://www.sralab.org/rehabilitation-measures/10-meter-walk-test', '_system');
  }
}
