import {Component} from '@angular/core';
import {App, IonicPage, NavParams} from 'ionic-angular';
import {WorkflowPage} from "../../../../workflow/workflow-page";
import {MyApp} from "../../../../app/app.component";
import {DocumentViewer} from '@ionic-native/document-viewer';


@IonicPage()
@Component({
  selector: 'page-neurology',
  templateUrl: 'neurology.html',
})
export class NeurologyPage extends WorkflowPage {
  private rootNav:any;
  private isSearchbarVisible = false;
  private readonly assessments: string[] = ['de Morton Mobility Index (DEMMI)',
                                            'Dynamic Gait Index (DGI)',
                                            'Timed Walking Test (10-Meter-Gehtest)'];

  constructor(navParams: NavParams, app: App, private document: DocumentViewer/*, private fileOpener: FileOpener*/) {
    super(navParams.data);
    this.document = document;
    this.rootNav = app.getRootNav();
  }

  navToAssessmentTab(){
    this.rootNav.push(MyApp, this.workflowParameters);
  }

  showPdfDemmi(){
    /*this.fileOpener.open('/assets/Assessment_DGI.pdf', 'application/pdf')
      .then(()=>console.log('File is opend'))
      .catch(e=>console.log('Error opening file', e));*/
    /*const options: DocumentViewerOptions = {
      title: 'My PDF'
    }
    this.document.viewDocument('/assets/Assessment_DGI.pdf', 'application/pdf', options)*/
  }

  private onSearchbarVisibilityChange(isVisible: boolean): void {
    this.isSearchbarVisible = isVisible;
  }
}
