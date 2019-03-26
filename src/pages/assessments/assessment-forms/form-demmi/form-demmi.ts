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
      message: '1. Ein Stuhl mit Armlehnen und 45cm Sitzhöhe<br/>' +
        '2. Ein Krankenhausbett / Eine Liege<br/>' +
        '3. Ein Stift<br/>' +
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
      message: '1. Freie Gehstrecke von min. 20 m\n' +
        '2. Drei Schuhschachteln\n' +
        '3. Drei Keulen\n' +
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

  showInfoTwo(){
    let alert = this.alertCtrl.create({
      title: '2. Auf die Seite rollen',
      message: '1. Freie Gehstrecke von min. 20 m\n' +
        '2. Drei Schuhschachteln\n' +
        '3. Drei Keulen\n' +
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

  showInfoThree(){
    let alert = this.alertCtrl.create({
      title: '3. Vom Liegen zum Sitzen',
      message: '1. Freie Gehstrecke von min. 20 m\n' +
        '2. Drei Schuhschachteln\n' +
        '3. Drei Keulen\n' +
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

  showInfoFour(){
    let alert = this.alertCtrl.create({
      title: '4. Sitzen im Stuhl ohne Unterstützung',
      message: '1. Freie Gehstrecke von min. 20 m\n' +
        '2. Drei Schuhschachteln\n' +
        '3. Drei Keulen\n' +
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

  showInfoFive(){
    let alert = this.alertCtrl.create({
      title: '5. Aus dem Stuhl aufstehen',
      message: '1. Freie Gehstrecke von min. 20 m\n' +
        '2. Drei Schuhschachteln\n' +
        '3. Drei Keulen\n' +
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

  showInfoSix(){
    let alert = this.alertCtrl.create({
      title: '6. Aus dem Stuhl aufstehen, ohne die Arme zu Hilfe zu nehmen',
      message: '1. Freie Gehstrecke von min. 20 m\n' +
        '2. Drei Schuhschachteln\n' +
        '3. Drei Keulen\n' +
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

  showInfoSeven(){
    let alert = this.alertCtrl.create({
      title: '7. Ohne Unterstützung stehen',
      message: '1. Freie Gehstrecke von min. 20 m\n' +
        '2. Drei Schuhschachteln\n' +
        '3. Drei Keulen\n' +
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

  showInfoEight(){
    let alert = this.alertCtrl.create({
      title: '8. Stehen mit geschlossenen Füssen',
      message: '1. Freie Gehstrecke von min. 20 m\n' +
        '2. Drei Schuhschachteln\n' +
        '3. Drei Keulen\n' +
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

  showInfoNine(){
    let alert = this.alertCtrl.create({
      title: '9. Auf den Fussspitzen stehen',
      message: '1. Freie Gehstrecke von min. 20 m\n' +
        '2. Drei Schuhschachteln\n' +
        '3. Drei Keulen\n' +
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

  showInfoTen(){
    let alert = this.alertCtrl.create({
      title: '10. Im Tandemstand mit geschlossenen Augen stehen',
      message: '1. Freie Gehstrecke von min. 20 m\n' +
        '2. Drei Schuhschachteln\n' +
        '3. Drei Keulen\n' +
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

  showInfoEleven(){
    let alert = this.alertCtrl.create({
      title: '11. Wegstrecke +/- Gehhilfe',
      message: '1. Freie Gehstrecke von min. 20 m\n' +
        '2. Drei Schuhschachteln\n' +
        '3. Drei Keulen\n' +
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

  showInfoTwelve(){
    let alert = this.alertCtrl.create({
      title: '12. Selbstständiges Gehen',
      message: '1. Freie Gehstrecke von min. 20 m\n' +
        '2. Drei Schuhschachteln\n' +
        '3. Drei Keulen\n' +
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

  showInfoThirteen(){
    let alert = this.alertCtrl.create({
      title: '13. Stift vom Boden aufheben',
      message: '1. Freie Gehstrecke von min. 20 m\n' +
        '2. Drei Schuhschachteln\n' +
        '3. Drei Keulen\n' +
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

  showInfoFourteen(){
    let alert = this.alertCtrl.create({
      title: '14. Vier Schritte rückwärts gehen',
      message: '1. Freie Gehstrecke von min. 20 m\n' +
        '2. Drei Schuhschachteln\n' +
        '3. Drei Keulen\n' +
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

  showInfoFiveteen(){
    let alert = this.alertCtrl.create({
      title: '15. Springen',
      message: '1. Freie Gehstrecke von min. 20 m\n' +
        '2. Drei Schuhschachteln\n' +
        '3. Drei Keulen\n' +
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
