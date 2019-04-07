import {Component} from '@angular/core';
import {AlertController, App, IonicPage, NavParams} from 'ionic-angular';
import {EvaluationWalkingtestPage} from "../../assessment-evaluations/evaluation-walkingtest/evaluation-walkingtest";
import {AssessmentResponse} from "../../../../responses/assessment-response";
import {WalkingtestResponse} from "../../../../responses/assessment-type/walkingtest-response";
import {RestProvider} from "../../../../providers/rest/rest";
import {Fit4PATReference} from "../../../../responses/fit4pat-reference";
import {WorkflowPage} from "../../../../workflow/workflow-page";
import Patient = fhir.Patient;
import Bundle = fhir.Bundle;
import Practitioner = fhir.Practitioner;

@IonicPage()
@Component({
  selector: 'page-form-walkingtest',
  templateUrl: 'form-walkingtest.html',
})
export class FormWalkingtestPage extends WorkflowPage {
  private rootNav:any;
  private patient: Patient;
  private isSearchbarVisible = false;
  private assessmentResponse: AssessmentResponse = new WalkingtestResponse();
  private timeBegan = null;
  private timeStopped:any = null;
  private stoppedDuration:any = 0;
  private started = null;
  private running = false;
  private blankTime = "00.000 Sekunden";
  private time = "00.000 Sekunden";
  private time1: number;
  private time2: number;
  private time3: number;
  private currentTime: Date;

  constructor(navParams: NavParams, private alertCtrl: AlertController, app: App, private restProvider: RestProvider) {
    super(navParams.data);
    this.rootNav = app.getRootNav();
    this.patient = navParams.data.patient;

    // Add the patient to the WalkingtestResponse-Object.
    if (this.patient !== undefined) {
      this.assessmentResponse.addPatient(this.patient);

      // The default-practitioner is added in here, because we create it asynchronously, when the app is
      // being loaded for the first time. Since the practitioner might not be fully created, when this
      // constructor is being loaded, we load it, when the patient is added.
      if (this.assessmentResponse.author === undefined) {
        restProvider.getPractitioners()
          .then(data => {
            this.assessmentResponse.author = new Fit4PATReference("Practitioner/"
              + this.firstPractitioner(data as Bundle).id);
          });
      }
    }
  }

  /**
   * Extract the practitioner from bundle. Since at this point of time, we only have one default partitioner,
   * we always load the first one.
   *
   * @param bundle      The data bundle returned by the rest response of the hapi-fhir server
   */
  private firstPractitioner(bundle: Bundle): Practitioner {
    if (bundle.entry !== undefined) {
      return bundle.entry[0].resource as Practitioner;
    }
  }

  navToEvaluationWalkingtest(){
    this.rootNav.push(EvaluationWalkingtestPage, this.patient);
  }

  private onSearchbarVisibilityChange(isVisible: boolean): void {
    this.isSearchbarVisible = isVisible;
  }

  private saveAndNavToEvaluationWalkingtest() {
    this.restProvider.postAssessmentResponse(this.assessmentResponse).then(data => {
      this.assessmentResponse = (data as WalkingtestResponse);
      this.navToEvaluationWalkingtest();
    });
  }

  timeInInput1() {
    let timeElapsed:Date = new Date(+this.currentTime - this.timeBegan - this.stoppedDuration);
    if (timeElapsed.getMilliseconds() >= 500) {
      this.time1 = timeElapsed.getSeconds() + 1;
    } else {
      this.time1 = timeElapsed.getSeconds();
    }
    this.reset();
    this.assessmentResponse.addOrChangeAnswer(0, this.time1, true);
  }

  timeInInput2() {
    let timeElapsed:Date = new Date(+this.currentTime - this.timeBegan - this.stoppedDuration);
    if (timeElapsed.getMilliseconds() >= 500) {
      this.time2 = timeElapsed.getSeconds() + 1;
    } else {
      this.time2 = timeElapsed.getSeconds();
    }
    this.reset();
    this.assessmentResponse.addOrChangeAnswer(1, this.time2, true);
  }

  timeInInput3() {
    let timeElapsed:Date = new Date(+this.currentTime - this.timeBegan - this.stoppedDuration);
    if (timeElapsed.getMilliseconds() >= 500) {
      this.time3 = timeElapsed.getSeconds() + 1;
    } else {
      this.time3 = timeElapsed.getSeconds();
    }
    this.reset();
    this.assessmentResponse.addOrChangeAnswer(2, this.time3, true);
  }

  start() {
    if (this.running) return;
    if (this.timeBegan === null) {
      this.reset();
      this.timeBegan = new Date();
    }
    if (this.timeStopped !== null) {
      let newStoppedDuration:any = (+new Date() - this.timeStopped);
      this.stoppedDuration = this.stoppedDuration + newStoppedDuration;
    }
    this.started = setInterval(this.clockRunning.bind(this), 10);
    this.running = true;
  }

  stop() {
    this.running = false;
    this.timeStopped = new Date();
    clearInterval(this.started);
  }

  reset() {
    this.running = false;
    clearInterval(this.started);
    this.stoppedDuration = 0;
    this.timeBegan = null;
    this.timeStopped = null;
    this.time = this.blankTime;
  }

  zeroPrefix(num, digit) {
    let zero = '';
    for(let i = 0; i < digit; i++) {
      zero += '0';
    }
    return (zero + num).slice(-digit);
  }

  clockRunning() {
    this.currentTime = new Date();
    let timeElapsed:any = new Date(+this.currentTime - this.timeBegan - this.stoppedDuration);
    //let hour = timeElapsed.getHours();
    //let min = timeElapsed.getMinutes();
    let sec = timeElapsed.getSeconds();
    let ms = timeElapsed.getMilliseconds();
    this.time =
      //this.zeroPrefix(hour, 2) + ":" +
      //this.zeroPrefix(min, 2) + ":" +
      this.zeroPrefix(sec, 2) + "." +
      this.zeroPrefix(ms, 3) + " Sekunden";
  };

  popupInstruction() {
    let alert = this.alertCtrl.create({
      title: 'Instruktion',
      subTitle: 'Timed Walking Test',
      message: '<b>Ziel:</b></br>' +
        '<ul><li>Ermittlung der Gehgeschwindigkeit in m/s bei selbst gewähltem Tempo und gegebenenfalls bei hoher Geschwindigkeit.</li></ul></br>' +
        '<b>Situation:</b></br>' +
        '<ul><li>Auf ebenem Boden werden 4 Stellen markiert (0m, 2m, 8m, 10m).</li></br>' +
        '<li>Die erste Markierung ist der Startpunkt (0 m).</li></br>' +
        '<li>Die zweite Markierung erfolgt bei 2 m, diese dient ausschliesslich dem Physiotherapeuten als Zeitmessungs-Startpunkt.</li></br>' +
        '<li>Die dritte Markierung erfolgt bei 8 m. Hier endet die Zeitmessung.</li></br>' +
        '<li>Die vierte Markierung ist sichtbar und dient als Endpunkt für die Testperson (10 m).</li></br>' +
        '<li>Es wird also eine Strecke von 10 m markiert, jedoch lediglich die Zeit auf einer Strecke von 6 m gemessen.</li></ul>' +
        '<img src="./assets/imgs/Bild_TimedWalkingTest.png"/></br>' +
        '</br><b>Beschreibung:</b></br>' +
        '<ul><li>Der Patient steht bei der 0 m-Markierung.</li></br>' +
        '<li>„Gehen Sie so schnell wie Sie wollen, nach meinem Kommando. Stoppen Sie, wenn ich ‚Stopp‘ sage.“</li></br>' +
        '<li>„Auf die Plätze, fertig, los!“ – bei der 10 m-Markierung „Stopp“.</li></br>' +
        '<li>Sobald die Fussspitze die 2 m-Markierung überschreitet, startet die Zeitmessung, bei der 8 m-Markierung die Zeitmessung gestoppt.</li></br>' +
        '<li>Der Patient führt den Test 3 x durch, aus den 3 gemessenen Werten wird der Mittelwert ermittelt.</li></br>' +
        '<li>Der Patient kann seine üblichen Gehhilfsmittel verwenden. Wichtig ist, dass die Verwendung von Hilfsmitteln dokumentiert wird.</li></br>' +
        '<li>Lässt der Zustand des Patienten es zu, kann der 10 m-Gehtest zusätzlich auch mit hoher Geschwindigkeit durchgeführt werden.</li></ul>',
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

  popupNormwerte() {
    let alert = this.alertCtrl.create({
      title: 'Normwerte',
      subTitle: 'Timed Walking Test',
      message: '<ul><li>Durchschnittliche Ganggeschwindigkeit gesunder Erwachsener: 1,3 m/s</br></br>' +
        '<ul><li>Durchschnittswerte Frauen: 1,23 m/s</li></br>' +
        '<li>Durchschnittswerte Männer: 1,37 m/s</li></ul></li></br>' +
        '<li>Hemiparese nach 6 Monaten: 0,25 m/s</li></br>' +
        '<li>Erforderlich für selbstständiges Gehen ausserhalb des Hauses: 0,8 m/s</li></br>' +
        '<li>Mobilität in urbanen Umgebungen erfordert eine Geschwindigkeit > 0,79 m/s</li></ul>',
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

  popupMaterial() {
    let alert = this.alertCtrl.create({
      title: 'Material',
      subTitle: 'Timed Walking Test',
      message: '<ul><li>Abgestreckte Strecke</li></ul>' +
      '<img src="./assets/imgs/Bild_TimedWalkingTest.png"/>',
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

}
