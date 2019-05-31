import {Component, ViewChild} from '@angular/core';
import {AlertController, NavParams} from 'ionic-angular';
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
import moment from "moment";
import {PdfPrinterProvider} from "../../../../providers/pdf-printer/pdf-printer";
import {WalkingtestPdfDefnition} from "./walkingtest-pdf-defnition";
import Patient = fhir.Patient;

@Component({
  selector: 'page-evaluation-walkingtest',
  templateUrl: 'evaluation-walkingtest.html',
})
/**
 * The evaluation of the Walkingtest.
 */
export class EvaluationWalkingtestPage extends WorkflowPage {
  private patient: Patient;
  private responses: WalkingtestResponse[];
  private isSearchbarVisible = false;
  @ViewChild('lineCanvas') private lineCanvas;
  private lineChart: Chart;

  constructor(navParams: NavParams, private alertCtrl: AlertController, private restProvider: RestProvider,
              private pdfPrinter: PdfPrinterProvider) {
    super(navParams.data);
    this.patient = (navParams.data as WorkflowParameters).patient;

    // Loads the responses of a patient sorted by date.
    restProvider.getQuestionnaireResponses(this.patient, "Timed Walking Test").then(data => {
      this.responses = (data as any).entry.map(entry => (entry.resource as WalkingtestResponse));

      // Adds the latest response, if it has not been transfered by the fhir server.
      // This is because of the asynchronous loading, since it is possible, that the POST request is not
      // yet saved, before the GET request tries to load the response list.
      if (this.workflowParameters.assessmentResponse && !(this.responses.find((response: WalkingtestResponse) => {
        return response.id === this.workflowParameters.assessmentResponse.id;
      }))) {
        this.responses.push(this.workflowParameters.assessmentResponse as WalkingtestResponse);
        // Sorts the list again after the latest response was added.
        this.responses.sort((a, b) => {
          return new Date(b.authored).getTime() - new Date(a.authored).getTime();
        });
      }
      // Removes the latest assessment response from the workflow parameters.
      this.workflowParameters.assessmentResponse = undefined;

      // Converts the assessment response to chart data and adds it to the chart.
      this.lineChart.data.datasets[0].data = GraphDataAssembler.assemble(this.responses, this.executeGraphDate, this.calcGraphValue);
      // Updates the chart with the freshly added data.
      this.lineChart.update();
    });
  }

  /**
   * Retrieves the execution date of this assessment result for the data point.
   * @param response    The assessment response.
   */
  private executeGraphDate(response: AssessmentResponse): Date {
    return AssessmentHelper.dateTimeToDate(response.authored);
  }

  /**
   * Calculates the walking speed as number.
   * @param response    The assessment response.
   */
  public calcGraphValue(response: AssessmentResponse): number {
    return +WalkingtestResult.calcSpeed(response);
  }

  /**
   * Retrieves the duration of the first try of the last assessment response.
   */
  private firstTry(): number {
    return this.responses ? WalkingtestResult.try(0, this.responses[0]) : 0;
  }

  /**
   * Retrieves the duration of the second try of the last assessment response.
   */
  private secondTry(): number {
    return this.responses ? WalkingtestResult.try(1, this.responses[0]) : 0;
  }

  /**
   * Retrieves the duration of the third try of the last assessment response.
   */
  private thirdTry(): number {
    return this.responses ? WalkingtestResult.try(2, this.responses[0]) : 0;
  }

  /**
   * Calculates and rounds the duration average of the tries of the last assessment response.
   */
  private calcAverageRounded(): string {
    return this.responses ? WalkingtestResult.calcAverageRounded(this.responses[0]) : "";
  }

  /**
   * Calculates the speed by the duration average of the last assessment response.
   */
  private calcSpeed(): string {
    return this.responses ? WalkingtestResult.calcSpeed(this.responses[0]) : "";
  }

  /**
   * Retrieves the execution date of this assessment result for displaying on the page.
   */
  private executeDate(): string {
    return this.responses ? AssessmentHelper.actualDate(this.responses[0].authored) : "";
  }

  /**
   * Retrieves the aids of the patient.
   */
  private getAids(): string {
    return this.responses && this.responses[0].item[3] ? this.responses[0].item[3].answer[0].valueString : "";
  }

  /**
   * Retrieves the comments from the therapist.
   */
  private getComments(): string {
    return this.responses && this.responses[0].item[4] ? this.responses[0].item[4].answer[0].valueString : "";
  }

  /**
   *  View representation of a patient in the format:
   *  [Room:] Family name, given name
   * @param patient   The patient to be represented.
   */
  private viewPatientName(patient: Patient): string {
    return PatientHelper.viewPatientName(patient);
  }

  /**
   * View representation of a patients additional information in the format:
   * Gender, birthdate (age), case id (Fall-ID)
   * @param patient   The patient to be represented.
   */
  private viewPatientInfos(patient: Patient): string {
    return PatientHelper.viewPatientInfos(patient);
  }

  /**
   * Displays information about the walking test in a browser window.
   */
  private openLink(): void {
    window.open('https://www.sralab.org/rehabilitation-measures/10-meter-walk-test', '_system');
  }

  /**
   * Loads the specific assessment response for a chart point and displays its details in a popup.
   * @param chartPoint    The chart point representing the assessment response.
   */
  private showDetails(chartPoint: ChartPoint): void {
    this.restProvider.getQuestionnaireResponses(this.patient, "Timed Walking Test",
      chartPoint.x as Date).then(data => {
      let response = (data as any).entry[0].resource as AssessmentResponse;
      this.viewDetailsPopup(response);
    });
  }

  /**
   * Display a walking tests details in a popup.
   * @param response    The assessment response.
   */
  private viewDetailsPopup(response: AssessmentResponse): void {
    let alert = this.alertCtrl.create({
      title: AssessmentHelper.actualDate(response.authored),
      cssClass: 'detailsTWT',
      subTitle: 'Timed Walking Test',
      message:
        '<ul><li><b>Durchschnittswert: </b> ' + WalkingtestResult.calcAverageRounded(response) + ' Sekunden</li>' +
        '<li><b>Ganggeschwindigkeit: </b> ' + WalkingtestResult.calcSpeed(response) + ' Meter/Sekunde</li></br>' +
        '<li>1. Messung: <b>' + WalkingtestResult.try(0, response) + ' Sekunden</b></li>' +
        '<li>2. Messung: <b>' + WalkingtestResult.try(1, response) + ' Sekunden</b></li>' +
        '<li>3. Messung: <b>' + WalkingtestResult.try(2, response) + ' Sekunden</b></li></br>' +
        '<li><b>Hilfsmittel: </b> ' + response.item[3].answer[0].valueString + '</li>' +
        '<li><b>Bemerkungen: </b> ' + response.item[4].answer[0].valueString + '</li></ul>',
      buttons: [
        {
          text: 'Ok',
          role: 'ok'
        },
      ]
    });
    alert.present();
  }

  /**
   * Creates a new chart after the view did load.
   */
  private ionViewDidLoad(): void {
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
            font: {
              size: 16,
              weight: 'bold'
            },
            // Value transformation for the label of the displayed point
            formatter: function(value, context) {
              return value.y.toFixed(2) + " (" + moment(new Date(value.x)).format("DD.MM.") + ")";
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
            fontSize: 16
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
          annotations: [ this.patient.gender === 'male' ? {
            id: 'box1',
            type: 'box',
            yScaleID: 'y-axis-0',
            yMin: 0,
            yMax: 1.37,
            backgroundColor: '#ffcccc',
            borderColor: '#ffb2b2',
          } : {
            id: 'box1',
            type: 'box',
            yScaleID: 'y-axis-0',
            yMin: 0,
            yMax: 1.23,
            backgroundColor: '#ffcccc',
            borderColor: '#ffb2b2',
          }, this.patient.gender === 'male' ? {
            type: 'line',
            mode: 'horizontal',
            scaleID: 'y-axis-0',
            value: '1.37',
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
              content: "Durchschnitt Männer"
            }
          } : {
            type: 'line',
            mode: 'horizontal',
            scaleID: 'y-axis-0',
            value: '1.23',
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
              content: "Durchschnitt Frauen"
            }
          }, this.patient.gender === 'male' ? {
            id: 'box4',
            type: 'box',
            yScaleID: 'y-axis-0',
            yMin: 1.37,
            yMax: 3,
            backgroundColor: '#cce5cc',
            borderColor: '#bbdcbb',
          } : {
            id: 'box4',
            type: 'box',
            yScaleID: 'y-axis-0',
            yMin: 1.23,
            yMax: 3,
            backgroundColor: '#cce5cc',
            borderColor: '#bbdcbb',
          }, {
            type: 'line',
            mode: 'horizontal',
            scaleID: 'y-axis-0',
            value: '0.4',
            borderColor: '#ffb2b2',
            borderWidth: 2,
          }, {
            type: 'line',
            mode: 'horizontal',
            scaleID: 'y-axis-0',
            value: '0.8',
            borderColor: '#ffb2b2',
            borderWidth: 2,
          }, {
            type: 'line',
            mode: 'horizontal',
            scaleID: 'y-axis-0',
            value: '1.2',
            borderColor: '#ffb2b2',
            borderWidth: 2,
          }, {
            type: 'line',
            mode: 'horizontal',
            scaleID: 'y-axis-0',
            value: '1.6',
            borderColor: '#bbdcbb',
            borderWidth: 2
          }, {
            type: 'line',
            mode: 'horizontal',
            scaleID: 'y-axis-0',
            value: '2',
            borderColor: '#bbdcbb',
            borderWidth: 2
          }, {
            type: 'line',
            mode: 'horizontal',
            scaleID: 'y-axis-0',
            value: '2.4',
            borderColor: '#bbdcbb',
            borderWidth: 2
          }, {
            type: 'line',
            mode: 'horizontal',
            scaleID: 'y-axis-0',
            value: '2.8',
            borderColor: '#bbdcbb',
            borderWidth: 2
          }],
          // Defines when the annotations are drawn.
          // This allows positioning of the annotation relative to the other elements of the graph.
          // Should be one of: afterDraw, afterDatasetsDraw, beforeDatasetsDraw
          // See http://www.chartjs.org/docs/#advanced-usage-creating-plugins
          drawTime: "beforeDatasetsDraw" // (default)
        }
      } as ChartOptions,
    });
  }

  /**
   * Returns the css styles for table fields based on the patients gender.
   * @param gender    The patients gender.
   * @param css       The default css styles of the table field.
   */
  private highlightResult(gender: string, css: string[]): string[] {
    let highlightStyle = this.takeOverStylesFromInputCss(['cell', 'orangeActive'], css);

    if (this.isFemaleAverage() && gender === 'female' || this.isMaleAverage() && gender === 'male') {
      return highlightStyle;
    }

    return css;
  }

  /**
   * Checks if the speed is equal to the female average.
   */
  private isFemaleAverage(): boolean {
    return this.calcSpeed() === '1.23' && this.patient.gender === 'female';
  }

  /**
   * Checks if the speed is equal to the male average.
   */
  private isMaleAverage(): boolean {
    return this.calcSpeed() === '1.37' && this.patient.gender === 'male';
  }

  /**
   * Returns a table fields highlight css style if the result of the patient is faster than
   * the average corresponding to his gender.
   * @param gender    The gender corresponding to the table field.
   * @param css       The default css styles of the table field.
   */
  private highlightFasterResult(gender: string, css: string[]): string[] {
    let highlightStyle = this.takeOverStylesFromInputCss(['cell', 'greenActive'], css);

    if (this.isFemaleFaster() && gender === 'female' || this.isMaleFaster() && gender === 'male') {
      return highlightStyle;
    }

    return css;
  }

  /**
   * Checks if the speed is faster than the female average.
   */
  private isFemaleFaster(): boolean {
    return +this.calcSpeed() > 1.23 && this.patient.gender === 'female';
  }

  /**
   * Checks if the speed is faster than the male average.
   */
  private isMaleFaster(): boolean {
    return +this.calcSpeed() > 1.37 && this.patient.gender === 'male';
  }

  /**
   * Returns a table fields highlight css style if the result of the patient is slower than
   * the average corresponding to his gender.
   * @param gender    The gender corresponding to the table field.
   * @param css       The default css styles of the table field.
   */
  private highlightSlowerResult(gender: string, css: string[]): string[] {
    let highlightStyle = this.takeOverStylesFromInputCss(['cell', 'redActive'], css);

    if (this.isFemaleSlower() && gender === 'female' || this.isMaleSlower() && gender === 'male') {
      return highlightStyle;
    }

    return css;
  }

  /**
   * Checks if the speed is slower than the female average.
   */
  private isFemaleSlower(): boolean {
    return +this.calcSpeed() < 1.23 && this.patient.gender === 'female';
  }

  /**
   * Checks if the speed is slower than the male average.
   */
  private isMaleSlower(): boolean {
    return +this.calcSpeed() < 1.37 && this.patient.gender === 'male';
  }

  /**
   * Adds border styles to table fields style definitions, based on what they were before.
   * @param highlightStyle    The highlighted style definitions.
   * @param css               The original style definitions.
   */
  private takeOverStylesFromInputCss(highlightStyle: string[], css: string[]): string[] {
    if (css.find(style => style === 'cellDown')) {
      highlightStyle.push('cellDown');
    }

    if (css.find(style => style === 'lastCell')) {
      highlightStyle.push('lastCell');
    }

    return highlightStyle;
  }

  /**
   * Displays a message, when a feature is clicked on, that has not been implemented yet.
   */
  private presentAlert(): void{
    let alert = this.alertCtrl.create({
      title: 'Prototyp',
      message: 'Diese Funktion wurde leider noch nicht umgesetzt.',
      buttons: ['OK']
    });
    alert.present();
  }

  /**
   * Generates and shows a PDF with some information about the patient and the chart.
   */
  private generateAndShowPdf(): void {
    this.pdfPrinter.createPdf(new WalkingtestPdfDefnition(this.patient, this.lineChart));
    this.pdfPrinter.downloadPdf("walkingtest.pdf");
  }
}
