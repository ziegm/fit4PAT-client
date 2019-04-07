import {Component, ViewChild} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {PatientHelper} from "../../../../components/patient/patient-helper";
import {Chart, ChartOptions} from 'chart.js';
import Patient = fhir.Patient;
import {ChartComponent} from "angular2-chartjs";
import {ChartAnnotation} from 'chartjs-plugin-annotation';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {getEntryPointInfo} from "@angular/compiler-cli/src/ngcc/src/packages/entry_point";
import {sample} from "rxjs/operator/sample";
import {bind} from "@angular/core/src/render3/instructions";
import {empty} from "rxjs/Observer";
import {offset} from "ionic-angular/components/slides/swiper/swiper-utils";


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


  constructor(navParams: NavParams, private alertCtrl: AlertController, public navCtrl: NavController) {
    this.patient = navParams.data;
  }

  private viewPatient(patient: Patient) {
    return PatientHelper.viewPatient(patient);
  }

  private onSearchbarVisibilityChange(isVisible: boolean): void {
    this.isSearchbarVisible = isVisible;
  }

  public showDetails(item){
    let alert = this.alertCtrl.create({
      title: 'Detailansicht + DATUM',
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
