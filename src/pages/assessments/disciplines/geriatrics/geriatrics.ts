import {Component} from '@angular/core';
import {App, IonicPage, NavParams} from 'ionic-angular';
import {WorkflowPage} from "../../../../workflow/workflow-page";

@IonicPage()
@Component({
  selector: 'page-geriatrics',
  templateUrl: 'geriatrics.html',
})
/**
 * Page for the displaying of geriatric assessments.
 */
export class GeriatricsPage extends WorkflowPage {
  private rootNav:any;
  private isSearchbarVisible = false;
  private readonly assessments: string[] = ['de Morton Mobility Index (DEMMI)',
                                            'Dynamic Gait Index (DGI)',
                                            'Timed Walking Test (10-Meter-Gehtest)'];

  constructor(navParams: NavParams, app: App) {
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
