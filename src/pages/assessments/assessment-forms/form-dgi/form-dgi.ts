import {Component} from '@angular/core';
import {AlertController, App, IonicPage} from 'ionic-angular';
import {EvaluationDgiPage} from "../../assessment-evaluations/evaluation-dgi/evaluation-dgi";
import {AssessmentForm} from "../assessment-form";


@IonicPage()
@Component({
  selector: 'page-form-dgi',
  templateUrl: 'form-dgi.html',
})
export class FormDgiPage implements AssessmentForm {
  private show: boolean = false;
  public discount: number = 0;

  private rootNav: any;

  constructor(private app: App, private alertCtrl: AlertController) {
    this.rootNav = app.getRootNav();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FormDgiPage');
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
        'Index (DGI). Er wurde von der Physiotherapeutin Prof. Dr. Anne\n' +
        'Shumway-Cook und der Neurowissenschaftlerin Prof. Dr. Marjorie\n' +
        'Woollacott [1] erstmals 1995 beschrieben. Forscher nutzen\n' +
        'ihn bei verschiedenen Krankheitsbildern zur Untersuchung und\n' +
        'Dokumentation, zum Beispiel in der Geriatrie [2, 3], bei vestibulären\n' +
        'Gleichgewichtsdysfunktionen [4, 5, 6] und bei Multipler\n' +
        'Sklerose [7].\n' +
        'In zehn Minuten abgeschlossen s Zur Durchführung des DGI\n' +
        'benötigt man eine freie Gehstrecke von mindestens 20m, drei\n' +
        'Schuhschachteln, drei Keulen und eine Treppe. In ungefähr zehn\n' +
        'Minuten kann man den DGI fertigstellen [5]. Für die Schulung\n' +
        'empfehlen Wissenschaftler, einen Zeitraum von zirka einer\n' +
        'Stunde einzuplanen [3]. Dies beinhaltet, den Test genau durchzulesen,\n' +
        'ihn an Patienten zu üben und im Team gemeinsam\n' +
        'Patientenbeispiele zu bewerten.\n' +
        'Acht alltagsrelevante Aufgaben s Der DGI besteht aus acht verschiedenen\n' +
        'Aufgaben (aKasten 1). Bei jeder Aufgabe kann der\n' +
        'Patient maximal drei Punkte erhalten, wenn er die Aufgabe\n' +
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
        'den verschiedenen Anforderungen also stets an und halten dabei\n' +
        'immer das Gleichgewicht.\n' +
        'Ein Maß für Gang und mehr s Diese Fähigkeit, das Gehen an verschiedene\n' +
        'Erfordernisse anzupassen, misst der Dynamic Gait\n' +
        'Index (DGI). Er wurde von der Physiotherapeutin Prof. Dr. Anne\n' +
        'Shumway-Cook und der Neurowissenschaftlerin Prof. Dr. Marjorie\n' +
        'Woollacott [1] erstmals 1995 beschrieben. Forscher nutzen\n' +
        'ihn bei verschiedenen Krankheitsbildern zur Untersuchung und\n' +
        'Dokumentation, zum Beispiel in der Geriatrie [2, 3], bei vestibulären\n' +
        'Gleichgewichtsdysfunktionen [4, 5, 6] und bei Multipler\n' +
        'Sklerose [7].\n' +
        'In zehn Minuten abgeschlossen s Zur Durchführung des DGI\n' +
        'benötigt man eine freie Gehstrecke von mindestens 20m, drei\n' +
        'Schuhschachteln, drei Keulen und eine Treppe. In ungefähr zehn\n' +
        'Minuten kann man den DGI fertigstellen [5]. Für die Schulung\n' +
        'empfehlen Wissenschaftler, einen Zeitraum von zirka einer\n' +
        'Stunde einzuplanen [3]. Dies beinhaltet, den Test genau durchzulesen,\n' +
        'ihn an Patienten zu üben und im Team gemeinsam\n' +
        'Patientenbeispiele zu bewerten.\n' +
        'Acht alltagsrelevante Aufgaben s Der DGI besteht aus acht verschiedenen\n' +
        'Aufgaben (aKasten 1). Bei jeder Aufgabe kann der\n' +
        'Patient maximal drei Punkte erhalten, wenn er die Aufgabe\n' +
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

  onChange() {
        document.getElementById("extension").style.visibility = "false";
  }

}
