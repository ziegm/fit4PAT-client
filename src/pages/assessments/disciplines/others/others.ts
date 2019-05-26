import {Component} from '@angular/core';
import {App, IonicPage, NavController, NavParams} from 'ionic-angular';
import {WorkflowPage} from "../../../../workflow/workflow-page";

@IonicPage()
@Component({
  selector: 'page-others',
  templateUrl: 'others.html',
})
/**
 * Page for the displaying of other assessments.
 */
export class OthersPage extends WorkflowPage{
  private rootNav:any;
  private isSearchbarVisible = false;
  private readonly assessments: string[] = [];

  constructor(public navCtrl: NavController, app: App, navParams: NavParams) {
    super(navParams.data);
    this.rootNav = app.getRootNav();
  }

  /**
   * Event handler for the searchbarVisibiltyChange event of the navbar.
   * @param isVisible   The current value of the searchbar visibility.
   */
  private onSearchbarVisibilityChange(isVisible: boolean): void {
    this.isSearchbarVisible = isVisible;
  }
}
