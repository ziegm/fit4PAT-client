import {Component} from '@angular/core';
import {App, IonicPage, NavParams} from 'ionic-angular';
import {FormDemmiPage} from "../../assessment-forms/form-demmi/form-demmi";
import {FormDgiPage} from "../../assessment-forms/form-dgi/form-dgi";
import {FormWalkingtestPage} from "../../assessment-forms/form-walkingtest/form-walkingtest";
import {WorkflowPage} from "../../../../workflow/workflow-page";
import {MyApp} from "../../../../app/app.component";
import {DocumentViewer, DocumentViewerOptions} from '@ionic-native/document-viewer';
import {FileOpener} from "@ionic-native/file-opener/ngx";


@IonicPage()
@Component({
  selector: 'page-neurology',
  templateUrl: 'neurology.html',
})
export class NeurologyPage extends WorkflowPage {
  private rootNav:any;
  private isSearchbarVisible = false;


  constructor(navParams: NavParams, app: App, private document: DocumentViewer/*, private fileOpener: FileOpener*/) {
    super(navParams.data);
    this.document = document;
    this.rootNav = app.getRootNav();
  }

  navToAssessmentTab(){
    this.rootNav.push(MyApp, this.workflowParameters);
  }

  navToDemmi() {
    this.rootNav.push(FormDemmiPage, this.workflowParameters);
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

  navToDgi() {
    this.rootNav.push(FormDgiPage, this.workflowParameters);
  }

  navToWalkingtest() {
    this.rootNav.push(FormWalkingtestPage, this.workflowParameters);
  }

  private onSearchbarVisibilityChange(isVisible: boolean): void {
    this.isSearchbarVisible = isVisible;
  }
}
