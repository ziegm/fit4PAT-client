import {Component} from '@angular/core';
import {IonicPage, NavParams} from 'ionic-angular';
import {WorkflowPage} from "../../../../workflow/workflow-page";

@IonicPage()
@Component({
  selector: 'page-ward-a1',
  templateUrl: 'ward-a1.html',
})
export class WardA1Page extends WorkflowPage {
  private readonly ward:string = "A1";
  private isSearchbarVisible = false;
  private search = "";

  constructor(navParams: NavParams) {
    super(navParams.data);
  }

  private onSearchbarVisibilityChange(isVisible: boolean): void {
    this.isSearchbarVisible = isVisible;
    this.search = "";
  }

  private searchPatients(search: any): void {
    this.search = search.target.value;
  }
}
