import {Component} from '@angular/core';
import {AlertController, App, IonicPage, NavParams} from 'ionic-angular';
import {EvaluationWalkingtestPage} from "../../assessment-evaluations/evaluation-walkingtest/evaluation-walkingtest";
import {AssessmentResponse} from "../../../../responses/assessment-response";
import {WalkingtestResponse} from "../../../../responses/assessment-type/walkingtest-response";
import {RestProvider} from "../../../../providers/rest/rest";
import {Fit4PATReference} from "../../../../responses/fit4pat-reference";
import {AssessmentResponseItem} from "../../../../responses/assessment-response-item";
import Patient = fhir.Patient;
import Bundle = fhir.Bundle;
import Practitioner = fhir.Practitioner;

@IonicPage()
@Component({
  selector: 'page-form-walkingtest',
  templateUrl: 'form-walkingtest.html',
})
export class FormWalkingtestPage {
  private rootNav:any;
  private patient: Patient;
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

  private saveAndNavToEvaluationWalkingtest() {
    this.restProvider.postAssessmentResponse(this.assessmentResponse).then(data => {
      this.assessmentResponse = (data as WalkingtestResponse);
      this.navToEvaluationWalkingtest();
    });
  }

  private addOrChangeAnswer(index: number, event: number) {
    if(this.assessmentResponse.item[index] === undefined) {
      this.assessmentResponse.item[index] = new AssessmentResponseItem("item" + (+index + 1));
    }
    this.assessmentResponse.item[index].addAnswer(event);
  }

  timeInInput1() {
    let timeElapsed:Date = new Date(+this.currentTime - this.timeBegan - this.stoppedDuration);
    if (timeElapsed.getMilliseconds() >= 500) {
      this.time1 = timeElapsed.getSeconds() + 1;
    } else {
      this.time1 = timeElapsed.getSeconds();
    }
    this.reset();
    this.addOrChangeAnswer(0, this.time1);
  }

  timeInInput2() {
    let timeElapsed:Date = new Date(+this.currentTime - this.timeBegan - this.stoppedDuration);
    if (timeElapsed.getMilliseconds() >= 500) {
      this.time2 = timeElapsed.getSeconds() + 1;
    } else {
      this.time2 = timeElapsed.getSeconds();
    }
    this.reset();
    this.addOrChangeAnswer(1, this.time2);
  }

  timeInInput3() {
    let timeElapsed:Date = new Date(+this.currentTime - this.timeBegan - this.stoppedDuration);
    if (timeElapsed.getMilliseconds() >= 500) {
      this.time3 = timeElapsed.getSeconds() + 1;
    } else {
      this.time3 = timeElapsed.getSeconds();
    }
    this.reset();
    this.addOrChangeAnswer(2, this.time3);
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
      message: 'In einer Menschenmenge müssen wir das Tempo verändern\n' +
        'können, ohne dabei das Gleichgewicht zu verlieren. Beim Gehen\n' +
        'im Alltag, beim Flanieren oder beim Gehen in einem Einkaufszentrum\n' +
        'müssen wir während des Gehens nach links und rechts\n' +
        'schauen können, ohne innezuhalten. Diese Gleichgewichtsfähigkeiten\n' +
        'benötigen wir auch beim Überqueren einer Straße. Wir\n' +
        'müssen nach unten und wieder geradeaus schauen und womöglich\n' +
        'eine Stufe bewältigen. Wenn uns jemand ruft, müssen wir\n' +
        'anhalten und uns umdrehen können, ohne das Gleichgewicht zu\n' +
        'verlieren. Schließlich müssen wir fähig sein, sicher um Hindernisse\n' +
        'herumzugehen, ohne zu zögern. Wir passen unser Gehen\n' +
        'den verschiedenen Anforderungen also stets an und halten dabei\n' +
        'immer das Gleichgewicht.\n' +
        'Ein Maß für Gang und mehr s Diese Fähigkeit, das Gehen an verschiedene\n' +
        'Erfordernisse anzupassen, misst der Dynamic Gait\n' +
        'Punktzahl beträgt 24 Punkte. Damit der DGI standardisiert',
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
      message: 'In einer Menschenmenge müssen wir das Tempo verändern\n' +
        'können, ohne dabei das Gleichgewicht zu verlieren. Beim Gehen\n' +
        'im Alltag, beim Flanieren oder beim Gehen in einem Einkaufszentrum\n' +
        'müssen wir während des Gehens nach links und rechts\n' +
        'schauen können, ohne innezuhalten. Diese Gleichgewichtsfähigkeiten\n' +
        'benötigen wir auch beim Überqueren einer Straße. Wir\n' +
        'müssen nach unten und wieder geradeaus schauen und womöglich\n' +
        'eine Stufe bewältigen. Wenn uns jemand ruft, müssen wir\n' +
        'anhalten und uns umdrehen können, ohne das Gleichgewicht zu\n' +
        'verlieren. Schließlich müssen wir fähig sein, sicher um Hindernisse\n' +
        'herumzugehen, ohne zu zögern. Wir passen unser Gehen\n' +
        'normal meistert. Können die Patienten die Aufgabe nicht bewältigen,\n' +
        'erhalten sie null Punkte (a Kasten 2). Für eine eingeschränkte\n' +
        'Ausführung gibt es einen oder zwei Punkte. Die maximale\n' +
        'Punktzahl beträgt 24 Punkte. Damit der DGI standardisiert',
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
      message: '1. Freie Gehstrecke von min. 20 m<br/>' +
        '2. Drei Schuhschachteln<br/>' +
        '3. Drei Keulen<br/>' +
        '4. Eine Treppe',
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
