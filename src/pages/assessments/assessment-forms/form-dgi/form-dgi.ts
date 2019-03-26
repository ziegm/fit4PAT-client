import {Component} from '@angular/core';
import {AlertController, App, IonicPage, NavParams} from 'ionic-angular';
import {EvaluationDgiPage} from "../../assessment-evaluations/evaluation-dgi/evaluation-dgi";
import Patient = fhir.Patient;


@IonicPage()
@Component({
  selector: 'page-form-dgi',
  templateUrl: 'form-dgi.html',
})
export class FormDgiPage {
  private show: boolean = false;
  public discount: number = 0;
  private rootNav: any;
  private patient: Patient;
  public aid = false;
  public selectedIndex: number;


  constructor(private app: App, private alertCtrl: AlertController, navParams: NavParams) {
    this.rootNav = app.getRootNav();
    this.patient = navParams.data.patient;
    //this.selectedIndex = localStorage.getItem('1');
  }

  navToEvaluationDgi() {
    this.rootNav.push(EvaluationDgiPage);
  }

  popupInstruction() {
    let alert = this.alertCtrl.create({
      title: 'Instruktion',
      subTitle: 'Dynamic Gait Index',
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
      subTitle: 'Dynamic Gait Index',
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
      subTitle: 'Dynamic Gait Index',
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

  showInfoOne(){
    let alert = this.alertCtrl.create({
      title: '1. Gehen auf ebener Strecke 20 Meter',
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
      title: '2. Gehen mit Tempowechsel 5m normal, 5m schnell, 5m langsam',
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
      title: '3. Gehen mit Kopfdrehung rechts und links',
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
      title: '4. Gehen und nach oben und nach unten schauen',
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
      title: '5. Gehen und Drehung um 180°',
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
      title: '6. Gehen über Hindernisse',
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
      title: '7. Gehen um Hindernisse links und rechts herum',
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
      title: '8. Treppensteigen',
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

  /*showExtension(selectedValue: any){
    console.log('Selected', selectedValue);
    if (selectedValue=="other"){
      this.aid = true;
    } else {
      this.aid = false;
    }
  }*/

  /*onChange() {
        document.getElementById("extension").style.visibility = "false";
  }*/
}
