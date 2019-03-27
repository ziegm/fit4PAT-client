import {Component} from '@angular/core';
import {AlertController, App, IonicPage, NavParams} from 'ionic-angular';
import {EvaluationWalkingtestPage} from "../../assessment-evaluations/evaluation-walkingtest/evaluation-walkingtest";
import Patient = fhir.Patient;

@IonicPage()
@Component({
  selector: 'page-form-walkingtest',
  templateUrl: 'form-walkingtest.html',
})
export class FormWalkingtestPage {
  public timeBegan = null;
  public timeStopped:any = null;
  public stoppedDuration:any = 0;
  public started = null;
  public running = false;
  public blankTime = "00:00.000";
  public time = "00:00.000";
  private rootNav:any;
  private patient: Patient;

  constructor(navParams: NavParams, private alertCtrl: AlertController, app: App) {
    this.rootNav = app.getRootNav();
    this.patient = navParams.data.patient;
  }

  navToEvaluationWalkingtest(){
    this.rootNav.push(EvaluationWalkingtestPage);
  }

  timeInText(){
    var inputOne;
    inputOne = this.time + " ";
  }

  start() {
    if(this.running) return;
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
  clockRunning(){
    let currentTime:any = new Date();
    let timeElapsed:any = new Date(currentTime - this.timeBegan - this.stoppedDuration);
    let hour = timeElapsed.getUTCHours();
    let min = timeElapsed.getUTCMinutes();
    let sec = timeElapsed.getUTCSeconds();
    let ms = timeElapsed.getUTCMilliseconds();
    this.time =
      this.zeroPrefix(hour, 2) + ":" +
      this.zeroPrefix(min, 2) + ":" +
      this.zeroPrefix(sec, 2) + "." +
      this.zeroPrefix(ms, 3);
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
