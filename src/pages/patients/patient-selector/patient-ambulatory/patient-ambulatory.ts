import {Component} from '@angular/core';
import {IonicPage, NavParams} from 'ionic-angular';
import {WorkflowPage} from "../../../../workflow/workflow-page";

@IonicPage()
@Component({
  selector: 'page-patient-ambulatory',
  templateUrl: 'patient-ambulatory.html',
})
export class PatientAmbulatoryPage extends WorkflowPage {
  private readonly ward:string = "ambulatory";

  constructor(navParams: NavParams) {
    super(navParams.data);
  }
}
