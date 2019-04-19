import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {WorkflowPage} from "../../../../workflow/workflow-page";


@IonicPage()
@Component({
  selector: 'page-ward-ips',
  templateUrl: 'ward-ips.html',
})

export class WardIpsPage extends WorkflowPage {
  private readonly ward:string = "IPS";
  private isSearchbarVisible = false;
  private search = "";

  constructor(private navCtrl: NavController, navParams: NavParams) {
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
