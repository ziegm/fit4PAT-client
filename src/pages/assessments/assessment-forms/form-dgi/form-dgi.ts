import {Component, ViewChild} from '@angular/core';
import {AlertController, App, IonicPage, Loading, LoadingController, NavParams, Select} from 'ionic-angular';
import {EvaluationDgiPage} from "../../assessment-evaluations/evaluation-dgi/evaluation-dgi";
import {AssessmentResponse} from "../../../../responses/assessment-response";
import {DgiResponse} from "../../../../responses/assessment-type/dgi-response";
import {RestProvider} from "../../../../providers/rest/rest";
import {Fit4PATReference} from "../../../../responses/fit4pat-reference";
import {WorkflowPage} from "../../../../workflow/workflow-page";
import {NoPatientErrorProvider} from "../../../../providers/no-patient-error/no-patient-error";
import {LoseDataIfContinueProvider} from "../../../../providers/lose-data-if-continue/lose-data-if-continue";
import Patient = fhir.Patient;
import Practitioner = fhir.Practitioner;
import Bundle = fhir.Bundle;

@IonicPage()
@Component({
  selector: 'page-form-dgi',
  templateUrl: 'form-dgi.html',
})
/**
 * The assessment form page of the dgi.
 */
export class FormDgiPage extends WorkflowPage {
  private rootNav: any;
  private patient: Patient;
  private isSearchbarVisible = false;
  private assessmentResponse: AssessmentResponse = new DgiResponse();
  private show: boolean = false;
  public discount: number = 0;
  private aid = "keine";
  @ViewChild('aidSelect') private aidSelect: Select;
  private saveButtonDisabled = false;
  public selectedIndex: number;
  private comments = "";
  private loading: Loading;

  constructor(private app: App, private alertCtrl: AlertController, navParams: NavParams,
              private restProvider: RestProvider, private noPatient: NoPatientErrorProvider,
              private loadingCtrl: LoadingController, private loseData: LoseDataIfContinueProvider) {
    super(navParams.data);
    this.rootNav = app.getRootNav();
    this.patient = navParams.data.patient;

    // Adds the patient to the DgiResponse-Object.
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
   * Extracts the practitioner from bundle. Since at this point of time, we only have one default partitioner,
   * we always load the first one.
   * @param bundle      The data bundle returned by the rest response of the hapi-fhir server.
   */
  private firstPractitioner(bundle: Bundle): Practitioner {
    if (bundle.entry !== undefined) {
      return bundle.entry[0].resource as Practitioner;
    }
  }

  /**
   * Navigates to the evaluation page, if there is a patient selected.
   */
  private navToEvaluationDgi(): void {
    if (this.noPatient.hasPatient(this.patient)) {
      this.rootNav.push(EvaluationDgiPage, this.workflowParameters);
    }
  }

  /**
   * Saves the assessment and navigates to the evaluation, if
   * 1. A patient was selected,
   * 2. All required items are filled out.
   * Otherwise specific error messages are displayed in a popup.
   */
  private saveAndNavToEvaluationDgi(): void {
    // Checks, if a patient was selected.
    if (!this.noPatient.hasPatient(this.patient)) {
      this.noPatient.showPopup();
    // Checks, if all required fields are filled out.
    } else if (this.missingFields()) {
      let alert = this.alertCtrl.create({
        title: 'Hinweis',
        message: 'Alle Felder müssen ausgefüllt werden (ausser Hilfsmittel und Bemerkungen).',
        buttons: ['OK']
      });
      alert.present();
    // All conditions are fullfilled, proceed with saving the response...
    } else {
      this.saveButtonDisabled = true;

      // Loads and displays a loading spinner, in case the loading takes a while.
      this.loading = this.loadingCtrl.create({
        spinner: 'bubbles',
        content: 'Lädt, bitte warten...'
      });
      this.loading.present();

      // Saves the assessment response and navigates to the evaluation page.
      this.restProvider.postAssessmentResponse(this.assessmentResponse).then(data => {
        // Dismiss the loading spinner on success.
        this.loading.dismiss();
        this.assessmentResponse = (data as DgiResponse);
        // Store the assessment response to the workflow parameters, in case
        // the POST request is not finished before the GET request of the evaluation is started.
        this.workflowParameters.assessmentResponse = this.assessmentResponse;
        this.navToEvaluationDgi();
      });
    }
  }

  /**
   * Navigates to evaluation without filling out the assessment form. Checks, if there is a patient
   * selected, otherwise shows an error popup.
   */
  private navToVerlauf(): void {
    this.noPatient.handleMissingPatient(this.patient);

    if (this.noPatient.hasPatient(this.patient)) {
      this.loseData.showPopup(() => this.rootNav.push(EvaluationDgiPage, this.workflowParameters));
    }
  }

  /**
   * Shows the instruction of the dgi in a popup.
   */
  private popupInstruction(): void {
    let alert = this.alertCtrl.create({
      title: 'Instruktion',
      cssClass: 'instructionDgi',
      subTitle: 'Dynamic Gait Index',
      message: '<b>Bewertung:</b><br/>' +
        '<ul><li>Für die Bewertung der Aufgaben ist die niedrigste zutreffende Punktzahl zu vergeben.</li></ul>',
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

  /**
   * Shows the norm values of the dgi in a popup.
   */
  private popupNormwerte(): void {
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

  /**
   * Shows the material required to perform the dgi.
   */
  private popupMaterial(): void {
    let alert = this.alertCtrl.create({
      title: 'Material',
      subTitle: 'Dynamic Gait Index',
      message: '<ul><li>Freie Gehstrecke (20 m)</li><br/>' +
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

  /**
   * Shows the information about the item 1.
   */
  private showInfoOne(): void {
    let alert = this.alertCtrl.create({
      title: '1. Gehen auf ebener Strecke (20 m)',
      cssClass: 'infoIconDgi',
      message: '"Gehen Sie mit Ihrer normalen Geschwindigkeit von hier bis zur nächsten Markierung (20 m)."<br/>' +
        '<ul><li><b>0:</b> Kann nicht 20 m ohne Hilfe gehen, ohne starke Gangabweichungen oder Ungleichgewicht.</li><br/>' +
        '<li><b>1:</b> 20 m Gehen, langsame Geschwindigkeit, abnormales Gangbild, Anzeichen für Ungleichgewicht.</li><br/>' +
        '<li><b>2:</b> 20 m Gehen, verwendet Hilfsmittel, langsamere Ganggeschwindigkeit, leichte Gangabweichungen.</li><br/>' +
        '<li><b>3:</b> 20 m Gehen, keine Hilfsmittel, gutes Tempo, keine Anzeichen für Ungleichgewicht, normales Gangbild.</li></ul>',
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

  /**
   * Shows the information about the item 2.
   */
  private showInfoTwo(): void {
    let alert = this.alertCtrl.create({
      title: '2. Gehen mit Tempowechsel 5 m normal, 5 m schnell, 5 m langsam',
      cssClass: 'infoIconDgi',
      message: '"Beginnen Sie in Ihrem normalen Tempo zu gehen (5 m), wenn ich sage: "Los", gehen Sie ' +
        'so schnell Sie können (5 m). Wenn ich sage: "Langsam", gehen Sie so langsam wie möglich (5 m )."<br/>' +
        '<ul><li><b>0:</b> Kann die Geschwindigkeit nicht ändern oder verliert das Gleichgewicht und muss nach der ' +
        'Wand greifen oder gestützt werden.</li><br/>' +
        '<li><b>1:</b> Nimmt nur geringfügige Anpassungen der Gehgeschwindigkeit vor oder führt eine Geschwindigkeitsänderung ' +
        'mit erheblichen Gangabweichungen durch. Oder ändert die Geschwindigkeit, hat aber erhebliche ' +
        'Gangabweichungen. Oder ändert die Geschwindigkeit, verliert aber das Gleichgewicht, ' +
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

  /**
   * Shows the information about the item 3.
   */
  private showInfoThree(): void {
    let alert = this.alertCtrl.create({
      title: '3. Gehen mit Kopfdrehung rechts und links',
      cssClass: 'infoIconDgi',
      message: '"Beginnen Sie im normalen Tempo zu gehen. Wenn ich sage: "Nach rechts schauen", gehen Sie geradeaus, ' +
        'aber drehen den Kopf nach rechts. Schauen Sie weiter nach rechts, bis ich sage: "Schauen Sie nach links", ' +
        'dann gehen Sie weiter geradeaus und drehen Ihren Kopf nach links. Halten Sie den Kopf nach links, ' +
        'bis ich sage: "Geradeaus schauen", dann gehen Sie weiter geradeaus, aber bringen den Kopf in die Mitte."<br/>' +
        '<ul><li><b>0:</b> Führt die Aufgabe mit schwerer Gangstörung aus, d. h. schwankt ausserhalb der Spurbreite (15 cm), ' +
        'verliert das Gleichgewicht, hält an, greift nach der Wand.</li><br/>' +
        '<li><b>1:</b> Führt Kopfdrehungen mit moderater Änderung der Ganggeschwindigkeit durch, verlangsamt sich, schwankt, ' +
        'erholt sich aber, kann weiterlaufen.</li><br/>' +
        '<li><b>2:</b> Führt eine sanfte Drehung des Kopfes mit leichter Änderung der Ganggeschwindigkeit durch, d. h. eine ' +
        'geringfügige Unterbrechung der geraden Gehspur oder die Verwendung einer Gehhilfe.</li><br/>' +
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

  /**
   * Shows the information about the item 4.
   */
  private showInfoFour(): void {
    let alert = this.alertCtrl.create({
      title: '4. Gehen und nach oben und nach unten schauen',
      cssClass: 'infoIconDgi',
      message: '"Beginnen Sie im normalen Tempo zu laufen. Wenn ich sage: "Nach oben schauen", gehen Sie geradeaus, ' +
        'aber bewegen den Kopf nach oben. Schauen Sie weiter nach oben, bis ich sage: "Nach unten schauen", ' +
        'dann gehen Sie geradeaus und bewegen den Kopf nach unten. Halten Sie Ihren Kopf unten, bis ich sage: ' +
        '"Gerade schauen", dann gehen Sie geradeaus, aber bewegen den Kopf in die Mitte zurück."<br/>' +
        '<ul><li><b>0:</b> Führt die Aufgabe mit schwerer Gangstörung aus, d. h. schwankt ausserhalb der Spurbreite (15 cm), ' +
        'verliert das Gleichgewicht, hält an, greift nach der Wand.</li><br/>' +
        '<li><b>1:</b> Führt Kopfdrehungen mit moderater Änderung der Ganggeschwindigkeit durch, verlangsamt sich, schwankt, ' +
        'erholt sich aber, kann weiterlaufen.</li><br/>' +
        '<li><b>2:</b> Führt eine sanfte Drehung des Kopfes mit leichter Änderung der Ganggeschwindigkeit durch, d. h. ' +
        'eine geringfügige Unterbrechung der geraden Gehspur oder die Verwendung eines Hilfsmittels.</li><br/>' +
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

  /**
   * Shows the information about the item 5.
   */
  private showInfoFive(): void {
    let alert = this.alertCtrl.create({
      title: '5. Gehen und Drehung um 180°',
      cssClass: 'infoIconDgi',
      message: '"Beginnen Sie im normalen Tempo zu laufen.  Wenn ich sage: "Drehen und anhalten", ' +
        'drehen Sie sich so schnell wie möglich, um in die entgegengesetzte Richtung zu schauen und zu stoppen."<br/>' +
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

  /**
   * Shows the information about the item 6.
   */
  private showInfoSix(): void {
    let alert = this.alertCtrl.create({
      title: '6. Gehen über Hindernisse',
      cssClass: 'infoIconDgi',
      message: '"Beginnen Sie mit Ihrer normalen Geschwindigkeit zu gehen.  Wenn Sie zur Schuhschachtel kommen, ' +
        'steigen Sie darüber, nicht um sie herum, und gehen weiter."<br/>' +
        '<ul><li><b>0:</b> Kann nicht ohne Hilfe ausgeführt werden.</li><br/>' +
        '<li><b>1:</b> Kann über die Schachtel steigen, muss aber anhalten und dann wieder zurücktreten. Benötigt allenfalls ' +
        'verbale Hinweise.</li><br/>' +
        '<li><b>2:</b> Kann über die Schachtel steigen, muss aber langsamer werden und die Schritte anpassen, ' +
        'um die Schachtel sicher zu übersteigen.</li><br/>' +
        '<li><b>3:</b> Kann über die Schachtel steigen, ohne die Gangart zu ändern, ohne Anzeichen von Ungleichgewicht.</li></ul>',
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

  /**
   * Shows the information about the item 7.
   */
  private showInfoSeven(): void {
    let alert = this.alertCtrl.create({
      title: '7. Gehen um Hindernisse links und rechts herum',
      cssClass: 'infoIconDgi',
      message: '"Beginnen Sie mit normaler Geschwindigkeit zu gehen. Wenn Sie zur ersten Keule kommen ' +
        '(etwa 6 m entfernt), gehen Sie rechts herum. Wenn Sie zur zweiten Keule kommen (6 m nach der ' +
        'ersten Keule), gehen Sie links herum."<br/>' +
        '<ul><li><b>0:</b> Es ist nicht möglich die Keule zu umgehen, geht in eine oder beide Keulen hinein ' +
        'oder benötigt physische Hilfestellung.</li><br/>' +
        '<li><b>1:</b> Ist in der Lage, Keulen zu umgehen, muss aber die Geschwindigkeit deutlich verlangsamen, ' +
        'um die Aufgabe zu erfüllen, oder erfordert verbale Hinweise.</li><br/>' +
        '<li><b>2:</b> Kann um beide Keulen herum gehen, muss aber langsamer werden und die Schritte ' +
        'anpassen, um die Keulen zu umgehen.</li><br/>' +
        '<li><b>3:</b> Ist in der Lage, sicher um die Keulen herum zu gehen, ohne die Gangart zu ändern, keine ' +
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

  /**
   * Shows the information about the item 8.
   */
  private showInfoEight(): void {
    let alert = this.alertCtrl.create({
      title: '8. Treppensteigen',
      cssClass: 'infoIconDgi',
      message: '"Gehen Sie die Treppe hinauf, wie zu Hause, d. h. benutzen Sie bei Bedarf das Geländer. ' +
        'Oben angekommen drehen Sie sich um und gehen nach unten."<br/>' +
        '<ul><li><b>0:</b> Kann nicht sicher durchgeführt werden.</li><br/>' +
        '<li><b>1:</b> Zwei Füsse auf einer Stufe, muss ein Geländer benutzen.</li><br/>' +
        '<li><b>2:</b> Alternierende Schritte, muss ein Geländer benutzen.</li><br/>' +
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

  /**
   * Add the users input to a response item identified by its id.
   * @param id      The id of the response item.
   * @param event   The key-up event of the users input.
   */
  private inputOnPatient(id: number, event: any): void {
    this.noPatient.handleMissingPatient(this.patient, event);

    if (this.noPatient.hasPatient(this.patient, event) && event.target && id !== 9) {
      this.assessmentResponse.addOrChangeAnswer(id, event.target.value, true);
    } else if (this.noPatient.hasPatient(this.patient, event) && id === 9) {
      this.assessmentResponse.addOrChangeAnswer(id, event.target.value);
    } else {
      this.comments = "";
    }
  }

  /**
   * Adds aids to assessment response item identified by its id.
   * @param id      The id of the response item.
   * @param event   The key-up event of the users input.
   */
  private aidOnPatient(id: number, event: any): void {
    this.noPatient.handleMissingPatient(this.patient, event);

    if (this.noPatient.hasPatient(this.patient, event) && event.target) {
      this.assessmentResponse.addOrChangeAnswer(id, event.target.value);
    } else if (this.noPatient.hasPatient(this.patient, event) && typeof event === "string") {
      this.assessmentResponse.addOrChangeAnswer(id, event);
    } else {
      this.aidSelect.selectedText = "keine";
    }
  }

  /**
   * Checks the assessment form for required fields that are not filled out.
   * Returns true if fields are missing, otherwise false.
   */
  private missingFields(): boolean {
    const required = [0, 1, 2, 3, 4, 5, 6, 7];
    for (let i = 0; i < this.assessmentResponse.item.length; i++){
      let requiredIdx = required.find(idx => i === idx);
      if (requiredIdx !== undefined && isNaN(this.assessmentResponse.item[i].answer[0].valueInteger)) {
        return true;
      }
    }

    return false;
  }
}
