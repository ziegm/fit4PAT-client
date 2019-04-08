import {Component} from '@angular/core';
import {AlertController, App, IonicPage, NavParams} from 'ionic-angular';
import {EvaluationDgiPage} from "../../assessment-evaluations/evaluation-dgi/evaluation-dgi";
import {AssessmentResponse} from "../../../../responses/assessment-response";
import {DgiResponse} from "../../../../responses/assessment-type/dgi-response";
import {RestProvider} from "../../../../providers/rest/rest";
import {Fit4PATReference} from "../../../../responses/fit4pat-reference";
import {MyApp} from "../../../../app/app.component";
import {WorkflowPage} from "../../../../workflow/workflow-page";
import Patient = fhir.Patient;
import Practitioner = fhir.Practitioner;
import Bundle = fhir.Bundle;


@IonicPage()
@Component({
  selector: 'page-form-dgi',
  templateUrl: 'form-dgi.html',
})
export class FormDgiPage extends WorkflowPage {
  private rootNav: any;
  private patient: Patient;
  private isSearchbarVisible = false;
  private assessmentResponse: AssessmentResponse = new DgiResponse();
  private show: boolean = false;
  public discount: number = 0;
  public aid = "keine Hilfsmittel";
  public selectedIndex: number;

  constructor(private app: App, private alertCtrl: AlertController, navParams: NavParams, private restProvider: RestProvider) {
    super(navParams.data);
    this.rootNav = app.getRootNav();
    this.patient = navParams.data.patient;
    //this.selectedIndex = localStorage.getItem('1');

    // Add the patient to the DgiResponse-Object.
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

  navToAssessmentTab(){
    this.rootNav.push(MyApp, this.workflowParameters);
  }

  private navToEvaluationDgi() {
    this.rootNav.push(EvaluationDgiPage, this.patient);
  }

  private onSearchbarVisibilityChange(isVisible: boolean): void {
    this.isSearchbarVisible = isVisible;
  }

  private saveAndNavToEvaluationDgi() {
    this.restProvider.postAssessmentResponse(this.assessmentResponse).then(data => {
      this.assessmentResponse = (data as DgiResponse);
      this.navToEvaluationDgi();
    });
  }

  popupInstruction() {
    let alert = this.alertCtrl.create({
      title: 'Instruktion',
      cssClass: 'instructionDgi',
      subTitle: 'Dynamic Gait Index',
      message: '<b>Bewertung:</b><br/>' +
        '<ul><li>Die niedrigste zutreffende Kategorie ist auszuwählen.</li></ul>',
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
      cssClass: 'normwerteDgi',
      subTitle: 'Dynamic Gait Index',
      message: '<ul><li>Cut-off Point des prädiktiven Werts für Stürze: 19 Punkte</li></ul>',
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
      message: '<ul><li>Freie Gehstrecke (20m)</li><br/>' +
        '<li>Schuhschachteln (3 Stk.)</li><br/>' +
        '<li>Keulen (3 Stk.)</li><br/>' +
        '<li>Treppe</li></ul>',
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
      cssClass: 'infoIconDgi',
      message: 'Gehen Sie mit Ihrer normalen Geschwindigkeit von hier bis zur nächsten Markierung (20m).<br/>' +
        '<ul><li><b>0:</b> Kann nicht 20m ohne Hilfe gehen, ohne starke Gangabweichungen oder Ungleichgewicht.</li><br/>' +
        '<li><b>1:</b> 20m Gehen, langsame Geschwindigkeit, abnormales Gangbild, Anzeichen für Ungleichgewicht.</li><br/>' +
        '<li><b>2:</b> 20m Gehen, verwendet Hilfsmittel, langsamere Ganggeschwindigkeit, leichte Gangabweichungen.</li><br/>' +
        '<li><b>3:</b> 20m Gehen, keine Hilfsmittel, gutes Tempo, keine Anzeichen für Ungleichgewicht, normales Gangbild.</li></ul>',
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
      cssClass: 'infoIconDgi',
      message: 'Beginnen Sie in Ihrem normalen Tempo zu gehen (5m), wenn ich "los" sage, gehen Sie ' +
        'so schnell Sie können (5m). Wenn ich "langsam" sage, gehen Sie so langsam wie möglich (5m). <br/>' +
        '<ul><li><b>0:</b> Kann die Geschwindigkeit nicht ändern oder verliert das Gleichgewicht und muss nach der ' +
        'Wand greifen oder gestützt werden.</li><br/>' +
        '<li><b>1:</b> Nimmt nur geringfügige Anpassungen der Gehgeschwindigkeit vor oder führt eine Geschwindigkeitsänderung ' +
        'mit erheblichen Gangabweichungen durch, oder ändert die Geschwindigkeit, hat aber erhebliche ' +
        'Gangabweichungen, oder ändert die Geschwindigkeit, verliert aber das Gleichgewicht, ' +
        'kann sich aber erholen und weitergehen.</li><br/>' +
        '<li><b>2:</b> Kann die Geschwindigkeit ändern, weist aber leichte Gangabweichungen auf, oder keine ' +
        'Gangabweichungen aber kann keine signifikante Änderung der Geschwindigkeit erreichen, ' +
        'oder verwendet Hilfsmittel.</li><br/>' +
        '<li><b>3:</b> Kann die Gehgeschwindigkeit stufenlos ändern, ohne Gleichgewichtsverlust oder ' +
        'Gangabweichungen. Zeigt einen signifikanten Unterschied in der Gehgeschwindigkeit ' +
        'zwischen normaler, schneller und langsamer Geschwindigkeit.</li></ul>',
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
      cssClass: 'infoIconDgi',
      message: 'Beginnen Sie im normalen Tempo zu gehen. Wenn ich sage "nach rechts schauen", gehen Sie geradeaus, ' +
        'aber drehen den Kopf nach rechts. Schauen Sie weiter nach rechts, bis ich sage: "schauen Sie nach links", ' +
        'dann gehen Sie weiter geradeaus und drehen Ihren Kopf nach links. Halten Sie den Kopf nach links, ' +
        'bis ich sage: "geradeaus schauen", dann gehen Sie weiter geradeaus, aber bringen den Kopf in die Mitte.<br/>' +
        '<ul><li><b>0:</b> Führt die Aufgabe mit schwerer Gangstörung aus, d.h. schwankt ausserhalb der Spurbreite (15cm), ' +
        'verliert das Gleichgewicht, hält an, greift nach der Wand.</li><br/>' +
        '<li><b>1:</b> Führt Kopfdrehungen mit moderater Änderung der Ganggeschwindigkeit durch, verlangsamt sich, schwankt, ' +
        'erholt sich aber, kann weiterlaufen.</li><br/>' +
        '<li><b>2:</b> Führt eine sanfte Drehung des Kopfes mit leichter Änderung der Ganggeschwindigkeit durch, d.h. eine ' +
        'geringfügige Unterbrechung des geraden Gehspur oder die Verwendung einer Gehhilfe.</li><br/>' +
        '<li><b>3:</b> Führt sanfte Kopfdrehungen ohne Gangveränderung durch.</li></ul>',
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
      cssClass: 'infoIconDgi',
      message: 'Beginnen Sie im normalen Tempo zu laufen. Wenn ich sage "nach oben schauen", gehen Sie geradeaus, ' +
        'aber kippen den Kopf nach oben. Schauen Sie weiter nach oben, bis ich sage "nach unten schauen", ' +
        'dann gehen Sie geradeaus und kippen den Kopf nach unten. Halten Sie Ihren Kopf unten, bis ich sage ' +
        '"gerade schauen", dann gehen Sie geradeaus, aber bringen den Kopf in die Mitte zurück.<br/>' +
        '<ul><li><b>0:</b> Führt die Aufgabe mit schwerer Gangstörung aus, d.h. schwankt ausserhalb der Spurbreite (15cm), ' +
        'verliert das Gleichgewicht, hält an, greift nach der Wand.</li><br/>' +
        '<li><b>1:</b> Führt Kopfdrehungen mit moderater Änderung der Ganggeschwindigkeit durch, verlangsamt sich, schwankt, ' +
        'erholt sich aber, kann weiterlaufen.</li><br/>' +
        '<li><b>2:</b> Führt eine sanfte Drehung des Kopfes mit leichter Änderung der Ganggeschwindigkeit durch, d.h. ' +
        'eine geringfügige Unterbrechung des geraden Gehspur oder die Verwendung einer Gehhilfe.</li><br/>' +
        '<li><b>3:</b> Führt eine sanfte Kopfdrehung ohne Gangveränderung durch.</li></ul>',
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
      cssClass: 'infoIconDgi',
      message: 'Beginnen Sie im normalen Tempo zu laufen.  Wenn ich sage "drehen und anhalten", ' +
        'drehen Sie sich so schnell wie möglich, um in die entgegengesetzte Richtung zu schauen und zu stoppen.<br/>' +
        '<ul><li><b>0:</b> Kann sich nicht sicher drehen, erfordert Hilfe beim Drehen und Stoppen.</li><br/>' +
        '<li><b>1:</b> Dreht sich langsam, erfordert verbale Hinweise, erfordert mehrere kleine Schritte, um das ' +
        'Gleichgewicht nach dem Drehen und Stoppen zu halten.</li><br/>' +
        '<li><b>2:</b> Sichere Umdrehung in > 3 Sekunden und Stoppen ohne Gleichgewichtsverlust.</li><br/>' +
        '<li><b>3:</b> Sichere Umdrehung innerhalb von 3 Sekunden und schnelles Stoppen ohne Gleichgewichtsverlust.</li></ul>',
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
      cssClass: 'infoIconDgi',
      message: 'Beginnen Sie mit Ihrer normalen Geschwindigkeit zu gehen.  Wenn Sie zum Schuhkarton kommen, ' +
        'steigen Sie über ihn, nicht um ihn herum, und gehen weiter.<br/>' +
        '<ul><li><b>0:</b> Kann nicht ohne Hilfe ausgeführt werden.</li><br/>' +
        '<li><b>1:</b> Kann über die Box gehen, muss aber anhalten und dann wieder zurücktreten. Benötigt allenfalls ' +
        'verbale Hinweise.</li><br/>' +
        '<li><b>2:</b> Kann über die Box gehen, muss aber langsamer werden und die Schritte anpassen, ' +
        'um die Box sicher zu überschreiten.</li><br/>' +
        '<li><b>3:</b> Kann über die Box treten, ohne die Gangart zu ändern, ohne Anzeichen von Ungleichgewicht.</li></ul>',
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
      cssClass: 'infoIconDgi',
      message: 'Beginnen Sie mit normaler Geschwindigkeit zu gehen. Wenn Sie zur ersten Keule kommen ' +
        '(etwa 6m entfernt), gehen Sie rechts herum. Wenn Sie zur zweiten Keule kommen (6m nach der ' +
        'ersten Keule), gehen Sie links herum.<br/>' +
        '<ul><li><b>0:</b> Es ist nicht möglich die Keule zu umgehen, hineingehen in eine oder beide Keulen oder ' +
        'benötigen physische Hilfestellung.</li><br/>' +
        '<li><b>1:</b> Ist in der Lage, Keulen zu umgehen, muss aber die Geschwindigkeit deutlich verlangsamen, ' +
        'um die Aufgabe zu erfüllen, oder erfordert verbale Hinweise.</li><br/>' +
        '<li><b>2:</b> Kann um beide Keulen herum gehen, muss aber langsamer werden und die Schritte ' +
        'anpassen, um die Keulen zu umgehen.</li><br/>' +
        '<li><b>3:</b> Ist in der Lage, sicher um die Keulen herum zu gehen, ohne die Gangart zu ändern; keine ' +
        'Anzeichen von Ungleichgewicht.</ul>',
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
      cssClass: 'infoIconDgi',
      message: 'Gehen Sie die Treppe hinauf, wie zu Hause, d.h. benutzen Sie bei Bedarf das Geländer. ' +
        'Oben angekommen, drehen Sie sich um und gehen nach unten.<br/>' +
        '<ul><li><b>0:</b> Kann nicht sicher durchgeführt werden.</li><br/>' +
        '<li><b>1:</b> Zwei Füsse auf einer Stufe, muss ein Geländer benutzen.</li><br/>' +
        '<li><b>2:</b> Alterniernde Schirtte, muss ein Geländer benutzen.</li><br/>' +
        '<li><b>3:</b> Alternierende Schritte, kein Geländer.</li></ul>',
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
