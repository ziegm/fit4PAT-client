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
  public aid = "none";
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
      message: 'Bewertung:<br/>' +
        'Die niedrigste zutreffende Kategorie ist auszuwählen.',
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
      message: 'Cut-off Point des prädiktiven Werts für Stürze: 19 Punkte',
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
      message: '1. Freie Gehstrecke (20m)<br/>' +
        '2. Schuhschachteln (3 Stk.)<br/>' +
        '3. Keulen (3 Stk.)<br/>' +
        '4. Treppe',
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
      message: 'Gehen Sie mit Ihrer normalen Geschwindigkeit von hier bis zur nächsten Markierung (20m).<br/>' +
        '0. Kann nicht 20m ohne Hilfe gehen, ohne starke Gangabweichungen oder Ungleichgewicht.<br/>' +
        '1. 20m Gehen, langsame Geschwindigkeit, abnormales Gangbild, Anzeichen für Ungleichgewicht.<br/>' +
        '2. 20m Gehen, verwendet Hilfsmittel, langsamere Ganggeschwindigkeit, leichte Gangabweichungen.<br/>' +
        '3. 20m Gehen, keine Hilfsmittel, gutes Tempo, keine Anzeichen für Ungleichgewicht, normales Gangbild.<br/>',
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
      message: 'Beginnen Sie in Ihrem normalen Tempo zu gehen (5m), wenn ich "los" sage, gehen Sie ' +
        'so schnell Sie können (5m). Wenn ich "langsam" sage, gehen Sie so langsam wie möglich (5m)' +
        '0. Kann die Geschwindigkeit nicht ändern oder verliert das Gleichgewicht und muss nach der ' +
        'Wand greifen oder gestützt werden.<br/>' +
        '1. Nimmt nur geringfügige Anpassungen der Gehgeschwindigkeit vor oder führt eine Geschwindigkeitsänderung ' +
        'mit erheblichen Gangabweichungen durch, oder ändert die Geschwindigkeit, hat aber erhebliche ' +
        'Gangabweichungen, oder ändert die Geschwindigkeit, verliert aber das Gleichgewicht, ' +
        'kann sich aber erholen und weitergehen.<br/>' +
        '2. Kann die Geschwindigkeit ändern, weist aber leichte Gangabweichungen auf, oder keine ' +
        'Gangabweichungen aber kann keine signifikante Änderung der Geschwindigkeit erreichen, ' +
        'oder verwendet Hilfsmittel.<br/>' +
        '3. Kann die Gehgeschwindigkeit stufenlos ändern, ohne Gleichgewichtsverlust oder ' +
        'Gangabweichungen. Zeigt einen signifikanten Unterschied in der Gehgeschwindigkeit ' +
        'zwischen normaler, schneller und langsamer Geschwindigkeit.<br/>',
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
      message: 'Beginnen Sie im normalen Tempo zu gehen. Wenn ich sage "nach rechts schauen", gehen Sie geradeaus, ' +
        'aber drehen den Kopf nach rechts. Schauen Sie weiter nach rechts, bis ich sage: "schauen Sie nach links", ' +
        'dann gehen Sie weiter geradeaus und drehen Ihren Kopf nach links. Halten Sie den Kopf nach links, ' +
        'bis ich sage: "geradeaus schauen", dann gehen Sie weiter geradeaus, aber bringen den Kopf in die Mitte.<br/>' +
        '0. Führt die Aufgabe mit schwerer Gangstörung aus, d.h. schwankt ausserhalb der Spurbreite (15cm), ' +
        'verliert das Gleichgewicht, hält an, greift nach der Wand.<br/>' +
        '1. Führt Kopfdrehungen mit moderater Änderung der Ganggeschwindigkeit durch, verlangsamt sich, schwankt, ' +
        'erholt sich aber, kann weiterlaufen.<br/>' +
        '2. Führt eine sanfte Drehung des Kopfes mit leichter Änderung der Ganggeschwindigkeit durch, d.h. eine ' +
        'geringfügige Unterbrechung des geraden Gehspur oder die Verwendung einer Gehhilfe.<br/>' +
        '3. Führt sanfte Kopfdrehungen ohne Gangveränderung durch.<br/>',
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
      message: 'Beginnen Sie im normalen Tempo zu laufen. Wenn ich sage "nach oben schauen", gehen Sie geradeaus, ' +
        'aber kippen den Kopf nach oben. Schauen Sie weiter nach oben, bis ich sage "nach unten schauen", ' +
        'dann gehen Sie geradeaus und kippen den Kopf nach unten. Halten Sie Ihren Kopf unten, bis ich sage ' +
        '"gerade schauen", dann gehen Sie geradeaus, aber bringen den Kopf in die Mitte zurück.<br/>' +
        '0. Führt die Aufgabe mit schwerer Gangstörung aus, d.h. schwankt ausserhalb der Spurbreite (15cm), ' +
        'verliert das Gleichgewicht, hält an, greift nach der Wand.<br/>' +
        '1. Führt Kopfdrehungen mit moderater Änderung der Ganggeschwindigkeit durch, verlangsamt sich, schwankt, ' +
        'erholt sich aber, kann weiterlaufen.<br/>' +
        '2. Führt eine sanfte Drehung des Kopfes mit leichter Änderung der Ganggeschwindigkeit durch, d.h. ' +
        'eine geringfügige Unterbrechung des geraden Gehspur oder die Verwendung einer Gehhilfe.<br/>' +
        '3. Führt eine sanfte Kopfdrehung ohne Gangveränderung durch.<br/>',
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
      message: 'Beginnen Sie im normalen Tempo zu laufen.  Wenn ich sage "drehen und anhalten", ' +
        'drehen Sie sich so schnell wie möglich, um in die entgegengesetzte Richtung zu schauen und zu stoppen.<br/>' +
        '0. Kann sich nicht sicher drehen, erfordert Hilfe beim Drehen und Stoppen.<br/>' +
        '1. Dreht sich langsam, erfordert verbale Hinweise, erfordert mehrere kleine Schritte, um das ' +
        'Gleichgewicht nach dem Drehen und Stoppen zu halten.<br/>' +
        '2. Sichere Umdrehung in > 3 Sekunden und Stoppen ohne Gleichgewichtsverlust.<br/>' +
        '3. Sichere Umdrehung innerhalb von 3 Sekunden und schnelles Stoppen ohne Gleichgewichtsverlust.<br/>',
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
      message: 'Beginnen Sie mit Ihrer normalen Geschwindigkeit zu gehen.  Wenn Sie zum Schuhkarton kommen, ' +
        'steigen Sie über ihn, nicht um ihn herum, und gehen weiter.<br/>' +
        '0. Kann nicht ohne Hilfe ausgeführt werden.<br/>' +
        '1. Kann über die Box gehen, muss aber anhalten und dann wieder zurücktreten. Benötigt allenfalls ' +
        'verbale Hinweise.<br/>' +
        '2. Kann über die Box gehen, muss aber langsamer werden und die Schritte anpassen, ' +
        'um die Box sicher zu überschreiten.<br/>' +
        '3. Kann über die Box treten, ohne die Gangart zu ändern, ohne Anzeichen von Ungleichgewicht.<br/>',
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
      message: 'Beginnen Sie mit normaler Geschwindigkeit zu gehen. Wenn Sie zur ersten Keule kommen ' +
        '(etwa 6m entfernt), gehen Sie rechts herum. Wenn Sie zur zweiten Keule kommen (6m nach der ' +
        'ersten Keule), gehen Sie links herum.<br/>' +
        '0. Es ist nicht möglich die Keule zu umgehen, hineingehen in eine oder beide Keulen oder ' +
        'benötigen physische Hilfestellung.<br/>' +
        '1. Ist in der Lage, Keulen zu umgehen, muss aber die Geschwindigkeit deutlich verlangsamen, ' +
        'um die Aufgabe zu erfüllen, oder erfordert verbale Hinweise.<br/>' +
        '2. Kann um beide Keulen herum gehen, muss aber langsamer werden und die Schritte ' +
        'anpassen, um die Keulen zu umgehen.<br/>' +
        '3. Ist in der Lage, sicher um die Keulen herum zu gehen, ohne die Gangart zu ändern; keine ' +
        'Anzeichen von Ungleichgewicht.<br/>',
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
      message: 'Gehen Sie die Treppe hinauf, wie zu Hause, d.h. benutzen Sie bei Bedarf das Geländer. ' +
        'Oben angekommen, drehen Sie sich um und gehen nach unten.<br/>' +
        '0. Kann nicht sicher durchgeführt werden.<br/>' +
        '1. Zwei Füsse auf einer Stufe, muss ein Geländer benutzen.<br/>' +
        '2. Alterniernde Schirtte, muss ein Geländer benutzen.<br/>' +
        '3. Alternierende Schritte, kein Geländer.<br/>',
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
