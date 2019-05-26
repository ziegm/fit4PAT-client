import {Component} from '@angular/core';
import {App, IonicPage, NavParams} from 'ionic-angular';
import {WorkflowPage} from "../../../../workflow/workflow-page";
import {DocumentViewer} from '@ionic-native/document-viewer';

@IonicPage()
@Component({
  selector: 'page-neurology',
  templateUrl: 'neurology.html',
})
/**
 * Page for the displaying of neurologic assessments.
 */
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

  /**
   * Event handler for the searchbarVisibiltyChange event of the navbar.
   * @param isVisible   The current value of the searchbar visibility.
   */
  private onSearchbarVisibilityChange(isVisible: boolean): void {
    this.isSearchbarVisible = isVisible;
  }
}
