import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {WorkflowPage} from "../../../../workflow/workflow-page";

@IonicPage()
@Component({
  selector: 'page-ward-a2',
  templateUrl: 'ward-a2.html',
})
/**
 * The page displaying the patients on ward A2.
 */
export class WardA2Page extends WorkflowPage {
  private readonly ward:string = "A2";
  private isSearchbarVisible = false;
  private search = "";

  constructor(private navCtrl: NavController, navParams: NavParams) {
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

  /**
   * Retrieves the search string from an ionInput event.
   * @param search    The ionInput event.
   */
  private searchPatients(search: any): void {
    this.search = search.target.value;
  }
}
