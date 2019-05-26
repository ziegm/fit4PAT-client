import {Component} from '@angular/core';
import {IonicPage, NavParams} from 'ionic-angular';
import {WorkflowPage} from "../../../../workflow/workflow-page";

@IonicPage()
@Component({
  selector: 'page-patient-ambulatory',
  templateUrl: 'patient-ambulatory.html',
})
export class PatientAmbulatoryPage extends WorkflowPage {
  private isSearchbarVisible = false;
  private readonly ward:string = "ambulatory";
  private search = "";

  constructor(navParams: NavParams) {
    super(navParams.data);
  }

  /**
   * Event handler for the searchbarVisibiltyChange event of the navbar.
   * @param isVisible   The current value of the searchbar visibility.
   */
  private onSearchbarVisibilityChange(isVisible: boolean): void {
    this.isSearchbarVisible = isVisible;
    this.search = "";
  }

  private searchPatients(search: any): void {
    this.search = search.target.value;
  }
}
