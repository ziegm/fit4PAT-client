import {Component} from '@angular/core';
import {AlertController, App, IonicPage, NavParams} from 'ionic-angular';
import {EvaluationDemmiPage} from "../../assessment-evaluations/evaluation-demmi/evaluation-demmi";
import {AssessmentResponse} from "../../../../responses/assessment-response";
import {RestProvider} from "../../../../providers/rest/rest";
import {Fit4PATReference} from "../../../../responses/fit4pat-reference";
import {AssessmentResponseItem} from "../../../../responses/assessment-response-item";
import {DemmiResponse} from "../../../../responses/assessment-type/demmi-response";
import {WorkflowPage} from "../../../../workflow/workflow-page";
import {MyApp} from "../../../../app/app.component";
import Patient = fhir.Patient;
import Practitioner = fhir.Practitioner;
import Bundle = fhir.Bundle;


@IonicPage()
@Component({
  selector: 'page-form-demmi',
  templateUrl: 'form-demmi.html',
})
export class FormDemmiPage extends WorkflowPage {
  private rootNav:any;
  private patient: Patient;
  private isSearchbarVisible = false;
  private assessmentResponse: AssessmentResponse = new DemmiResponse();

  constructor(navParams: NavParams, private alertCtrl: AlertController, app: App, private restProvider: RestProvider) {
    super(navParams.data);
    this.rootNav = app.getRootNav();
    this.patient = navParams.data.patient;

    // Add the patient to the DemmiResponse-Object.
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

  private navToAssessmentTab(){
    this.rootNav.push(MyApp, this.workflowParameters);
  }

  private navToEvaluationDemmi() {
    this.rootNav.push(EvaluationDemmiPage, this.patient);
  }

  private onSearchbarVisibilityChange(isVisible: boolean): void {
    this.isSearchbarVisible = isVisible;
  }

  private saveAndNavToEvaluationDemmi() {
    this.restProvider.postAssessmentResponse(this.assessmentResponse).then(data => {
      this.assessmentResponse = (data as DemmiResponse);
      this.navToEvaluationDemmi();
    });
  }

  private addOrChangeAnswer(index: number, event: number) {
    if(this.assessmentResponse.item[index] === undefined) {
      this.assessmentResponse.item[index] = new AssessmentResponseItem("item" + (+index + 1));
    }
    this.assessmentResponse.item[index].addAnswer(event);
  }

  popupInstruction() {
    let alert = this.alertCtrl.create({
      title: 'Instruktion',
      subTitle: 'de Morton Mobility Index',
      message: '<b>Hinweise zur Hilfestellung:</b><br/>' +
      '<ul><li>Geringfügige Hilfestellung = leichte jedoch minimale Unterstützung, ' +
        'in erster Linie, um Bewegungen zu führen.</li><br/>' +
      '<li>Supervision = Beobachtung der Übungen durch den Untersucher, ohne dabei ' +
      'praktische Hilfestellung zu leisten. Mündliche Anleitungen sind zulässig.</li><br/>' +
      '<li>Selbstständig = für eine sichere Bewegung ist die Anwesenheit einer weiteren Person ' +
      'nicht erforderlich.</li></ul><br/>' +
      '<b>Hinweise zur Durchführung:</b><br/>' +
      '<ul><li>Die Untersuchung sollte nur durchgeführt werden, wenn der Patient bereits ' +
        'seine Medikamente eingenommen hat, wie z.B. eine halbe Stunde nach ' +
        'der Einnahme von Schmerzmitteln oder nach der Einnahme von ' +
        'Parkinson-Medikamenten.</li><br/>' +
      '<li>Die Aufgaben sollten in der beschriebenen Reihenfolge durchgeführt werden. ' +
        'Bei sehr belastbarkeitsgeminderten Patienten, die im Stuhl angetroffen werden, ' +
        'können die Tests aus dem Abschnitt „Stuhl“ vorgezogen werden.</li><br/>' +
      '<li>Alle Aufgaben sollten erklärt und, falls erforderlich, auch demonstriert werden.</li><br/>' +
      '<li>Patienten können ermutigt werden, sie sollten jedoch keine Rückmeldung ' +
        'bzgl. ihrer Leistung bekommen.</li><br/>' +
      '<li>Die Bewertung findet anhand des ersten Testversuchs statt.</li><br/>' +
      '<li>Sollte eine Aufgabenstellung aufgrund des Gesundheitszustandes des ' +
        'Patienten nicht möglich sein, kann dies bei den Bemerkungen dokumentiert werden.</li><br/>' +
      '<li>Der Untersucher kümmert sich um medizinischen Apparaturen (wie z.B. ' +
        'mobile Sauerstoffversorgung, Drainagen). Benötigt der Patient ' +
        'geringfügige Hilfestellung um die Aufgaben durchzuführen, ist eine weitere ' +
        'Person erforderlich, um bei den Apparaturen behilflich zu sein.</li><br/>' +
      '<li>Patienten, die schnell ausser Atem sind und eine Pause nach jeder ' +
        'Aufgabenstellung benötigen, sollten nach der Hälfte der Aufgaben eine ' +
        '10minütige Pause einlegen, d.h. nachdem sie den Transfer vom Stuhl ' +
        'abgeschlossen haben.</li><br/>' +
      '<li>Bei Patienten mit einem geringen Grad an Mobilität, die einen Lift für den ' +
        'Transfer ins/aus dem Bett benötigen, können die Tests aus dem Abschnitt ' +
        '„Stuhl“ vorgezogen werden.</li></ul>',
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
      message:'<img src="./assets/imgs/demmi_normwerte_V2.png"/>',
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
      message: '<ul><li>Spitalbett/Liege</li><br/>' +
      '<li>Stuhl mit Armlehnen (Sitzhöhe 45cm)</li><br/>' +
        '<li>Abgemessene Gehstecke (50m)</li><br/>' +
        '<li>Stift</li></ul>',
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

  showInfoBed(){
    let alert = this.alertCtrl.create({
      title: 'Transfer im Bett',
      message: 'Die Höhe des Bettes sollte individuell auf den Patienten ' +
      'abgestimmt sein. Ein normiertes Spitalbett oder eine Liege sollte ' +
      'zur Testung angewendet werden. Die Patienten sollen keine Hilfsmittel, wie ' +
      'z.B. einen Galgengriff, das Bettgeländer, die Bettkante oder eine ' +
      'Aufstehhilfe benutzen. Zusätzliche Kissen können für Patienten ' +
      'bereitgestellt werden, die nicht in der Lage sind, flach auf dem Rücken zu ' +
      'liegen.',
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

  showInfoChair() {
    let alert = this.alertCtrl.create({
      title: 'Transfer vom Stuhl',
      message: 'Es sollte ein standardisierter, stabiler Stuhl mit einer ' +
      'Sitzhöhe von 45 cm und Armlehnen zum Einsatz kommen.',
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
      'ohne die Armlehnen und die Rückenlehne zu berühren, zusammen zu sacken oder zu '+
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

  showInfoStatic(){
    let alert = this.alertCtrl.create({
      title: 'Statisches Gleichgewicht',
      message: 'Der Patient sollte, wenn möglich, keine Schuhe tragen und ' +
      'darf keine Unterstützung in Anspruch nehmen, um die Tests erfolgreich zu ' +
      'absolvieren. Die Gleichgewichtstests im Stehen sollten so angeordnet sein, dass an einer ' +
      'Seite der Patienten das erhöhte Bett und an der anderen Seite der ' +
      'Untersucher steht. Sollte ein Patient während der Aufgabe wanken oder ' +
      'erheblich schwanken, sollte die Aufgabe abgebrochen werden.',
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

  showInfoWalk(){
    let alert = this.alertCtrl.create({
      title: 'Gehen',
      message: 'Zur Testung des Gangbildes dürfen geeignete Schuhe getragen ' +
      'werden. Dieselben Schuhe müssen getragen werden, wenn der Test wiederholt wird.' +
      'Die Art des Schuhwerks kann in den Bemerkungen eingetragen werden.',
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

  showInfoDynamic(){
    let alert = this.alertCtrl.create({
      title: 'Dynamisches Gleichgewicht',
      message: 'Der Patient sollte, wenn möglich, keine Schuhe tragen und ' +
        'darf keine Unterstützung in Anspruch nehmen, um die Tests erfolgreich zu ' +
        'absolvieren. Die Gleichgewichtstests im Stehen sollten so angeordnet sein, dass an einer ' +
        'Seite der Patienten das erhöhte Bett und an der anderen Seite der ' +
        'Untersucher steht. Sollte ein Patient während der Aufgabe wanken oder ' +
        'erheblich schwanken, sollte die Aufgabe abgebrochen werden.',
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
