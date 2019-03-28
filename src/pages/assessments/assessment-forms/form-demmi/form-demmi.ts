import {Component} from '@angular/core';
import {AlertController, App, IonicPage, NavParams} from 'ionic-angular';
import {EvaluationDemmiPage} from "../../assessment-evaluations/evaluation-demmi/evaluation-demmi";
import Patient = fhir.Patient;


@IonicPage()
@Component({
  selector: 'page-form-demmi',
  templateUrl: 'form-demmi.html',
})
export class FormDemmiPage {
  private rootNav:any;
  private patient: Patient;

  constructor(navParams: NavParams, private alertCtrl: AlertController, app: App) {
    this.rootNav = app.getRootNav();
    this.patient = navParams.data.patient;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FormDemmiPage');
  }

  navToEvaluationDemmi() {
    this.rootNav.push(EvaluationDemmiPage);
  }

  popupInstruction() {
    let alert = this.alertCtrl.create({
      title: 'Instruktion',
      subTitle: 'de Morton Mobility Index',
      message: 'In einer Menschenmenge müssen wir das Tempo verändern\n' +
        'können, ohne dabei das Gleichgewicht zu verlieren. Beim Gehen\n' +
        'im Alltag, beim Flanieren oder beim Gehen in einem Einkaufszentrum\n' +
        'müssen wir während des Gehens nach links und rechts\n' +
        'schauen können, ohne innezuhalten. Diese Gleichgewichtsfähigkeiten\n' +
        'benötigen wir auch beim Überqueren einer Straße. Wir\n' +
        'müssen nach unten und wieder geradeaus schauen und womöglich\n' +
        'eine Stufe bewältigen. Wenn uns jemand ruft, müssen wir\n' +
        'Sklerose [7].\n',
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
      subTitle: 'de Morton Mobility Index',
      message: 'In einer Menschenmenge müssen wir das Tempo verändern\n' +
        'können, ohne dabei das Gleichgewicht zu verlieren. Beim Gehen\n' +
        'im Alltag, beim Flanieren oder beim Gehen in einem Einkaufszentrum\n' +
        'müssen wir während des Gehens nach links und rechts\n' +
        'Dokumentation, zum Beispiel in der Geriatrie [2, 3], bei vestibulären\n' +
        'Gleichgewichtsdysfunktionen [4, 5, 6] und bei Multipler\n' +
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
      subTitle: 'de Morton Mobility Index',
      message: '1. Spitalbett/Liege<br/>' +
      '2. Stuhl mit Armlehnen (Sitzhöhe 45cm)<br/>' +
        '3. Stift<br/>' +
        '4.  Abgemessene Gehstrecke bis 50m',
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

  showInfoOne(){
    let alert = this.alertCtrl.create({
      title: '1. Brücke',
      message: 'Der Patient liegt auf dem Rücken und wird '+
      'aufgefordert, die Beine anzuwinkeln und das Gesäss vom Bett abzuheben.',
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

  showInfoTwo(){
    let alert = this.alertCtrl.create({
      title: '2. Auf die Seite rollen',
      message: 'Der Patient liegt auf dem Rücken und wird aufgefordert, sich ohne '+
      'Hilfestellung auf eine Seite zu rollen.',
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

  showInfoThree(){
    let alert = this.alertCtrl.create({
      title: '3. Vom Liegen zum Sitzen',
      message: 'Der Patient liegt auf dem Rücken und wird aufgefordert, sich auf die '+
      'Bett-/Liegekante zu setzen.',
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

  showInfoFour(){
    let alert = this.alertCtrl.create({
      title: '4. Sitzen im Stuhl ohne Unterstützung',
      message: 'Der Patient wird aufgefordert, auf einem Stuhl 10 Sekunden frei zu sitzen, '+
      'ohne die Armlehnen zu berühren, zusammen zu sacken oder zu '+
      'schwanken. Füsse und Knie hält der Patient dabei geschlossen, die Füsse '+
      'berühren den Boden.',
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

  showInfoFive(){
    let alert = this.alertCtrl.create({
      title: '5. Aus dem Stuhl aufstehen',
      message: 'Der Patient wird aufgefordert, unter Gebrauch der Armlehnen vom Stuhl aufzustehen.',
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

  showInfoSix(){
    let alert = this.alertCtrl.create({
      title: '6. Aus dem Stuhl aufstehen, ohne die Arme zu Hilfe zu nehmen',
      message: 'Der Patient wird aufgefordert, mit vor der Brust verschränkten Armen vom ' +
      'Stuhl aufzustehen.',
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

  showInfoSeven(){
    let alert = this.alertCtrl.create({
      title: '7. Ohne Unterstützung stehen',
      message: 'Der Patient wird aufgefordert, 10 Sekunden lang ohne jegliche Hilfestellung ' +
      'frei zu stehen.',
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

  showInfoEight(){
    let alert = this.alertCtrl.create({
      title: '8. Stehen mit geschlossenen Füssen',
      message: 'Der Patient wird aufgefordert, 10 Sekunden lang ohne jegliche Hilfestellung '+
      'und mit geschlossenen Füssen frei zu stehen.',
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

  showInfoNine(){
    let alert = this.alertCtrl.create({
      title: '9. Auf den Fussspitzen stehen',
      message: 'Der Patient wird aufgefordert, 10 Sekunden lang ohne jegliche Hilfestellung ' +
      'auf den Zehenspitzen zu stehen.',
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

  showInfoTen(){
    let alert = this.alertCtrl.create({
      title: '10. Im Tandemstand mit geschlossenen Augen stehen',
      message: 'Der Patient wird aufgefordert, die Ferse eines Fusses direkt vor den anderen ' +
      'Fuss zu stellen und mit geschlossenen Augen 10 Sekunden ohne jegliche ' +
      'Hilfestellung stehen zu bleiben.',
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

  showInfoEleven(){
    let alert = this.alertCtrl.create({
      title: '11. Wegstrecke +/- Gehhilfe',
      message: 'Der Patient wird aufgefordert, wenn nötig mit der Gehhilfe, so weit wie ' +
      'möglich ohne Pause zu gehen. Der Test endet, wenn der Patient anhält, um ' +
      'sich auszuruhen. Der Patient soll die Gehhilfe benutzen, die für ihn am ' +
      'besten geeignet ist. Stehen zwei Gehhilfen zur Verfügung, sollte die ' +
      'Gehhilfe verwendet werden, die das höchste Mass an Selbstständigkeit ' +
      'ermöglicht. Die Aufgabe ist beendet, sobald der Patient 50 Meter zurückgelegt hat.',
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

  showInfoTwelve(){
    let alert = this.alertCtrl.create({
      title: '12. Selbstständiges Gehen',
      message: 'Die Selbstständigkeit des Patienten wird über die gesamte zurückgelegte ' +
      'Gehstrecke aus Aufgabe 11 bewertet.',
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

  showInfoThirteen(){
    let alert = this.alertCtrl.create({
      title: '13. Stift vom Boden aufheben',
      message: 'Ein Stift wird 5 cm vor die Füsse des stehenden Patienten gelegt. Der Patient ' +
      'wird aufgefordert, den Stift aufzuheben.',
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

  showInfoFourteen(){
    let alert = this.alertCtrl.create({
      title: '14. Vier Schritte rückwärts gehen',
      message: 'Der Patient wird aufgefordert, 4 Schritte rückwärts gehen, ohne dabei das ' +
      'Gleichgewicht zu verlieren.',
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

  showInfoFiveteen(){
    let alert = this.alertCtrl.create({
      title: '15. Springen',
      message: 'Der Patient wird aufgefordert, mit beiden Beinen hochzuspringen, wobei ' +
      'beide Füsse deutlich vom Boden abheben, ohne dabei das Gleichgewicht zu verlieren.',
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
