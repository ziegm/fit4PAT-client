import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {WorkflowPage} from "../../../../workflow/workflow-page";


@IonicPage()
@Component({
  selector: 'page-ward-a2',
  templateUrl: 'ward-a2.html',
})
export class WardA2Page extends WorkflowPage {
  private readonly ward:string = "A2";
  private isSearchbarVisible = false;

  constructor(private navCtrl: NavController, navParams: NavParams) {
    super(navParams.data);
  }

  private onSearchbarVisibilityChange(isVisible: boolean): void {
    this.isSearchbarVisible = isVisible;
  }
}
