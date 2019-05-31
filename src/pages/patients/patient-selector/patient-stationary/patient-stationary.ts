import {Component} from '@angular/core';
import {App, IonicPage, NavParams} from 'ionic-angular';
import {WardA1Page} from "../../wards/ward-a1/ward-a1";
import {WardA2Page} from "../../wards/ward-a2/ward-a2";
import {WardB1Page} from "../../wards/ward-b1/ward-b1";
import {WardB2Page} from "../../wards/ward-b2/ward-b2";
import {WardB3Page} from "../../wards/ward-b3/ward-b3";
import {WardC1Page} from "../../wards/ward-c1/ward-c1";
import {WardIpsPage} from "../../wards/ward-ips/ward-ips";
import {WorkflowPage} from "../../../../workflow/workflow-page";


@IonicPage()
@Component({
  selector: 'page-patient-stationary',
  templateUrl: 'patient-stationary.html',
})
/**
 * Page for displaying a list of wards.
 */
export class PatientStationaryPage extends WorkflowPage {
  private rootNav: any;
  private isSearchbarVisible = false;
  private wards: string[] = ['Station A1', 'Station A2', 'Station B1',
    'Station B2', 'Station B3', 'Station C1', 'Station IPS'];
  private results: string[] = this.wards;

  constructor(navParams: NavParams, app: App) {
    super(navParams.data);
    this.rootNav = app.getRootNav();
  }

  /**
   * Navigates to a wards patient list page, based on the wards name.
   * @param ward    The wards name.
   */
  private navToWard(ward: string): void {
    switch (ward) {
      case 'Station A1':
        this.rootNav.push(WardA1Page, this.workflowParameters);
        break;
      case 'Station A2':
        this.rootNav.push(WardA2Page, this.workflowParameters);
        break;
      case 'Station B1':
        this.rootNav.push(WardB1Page, this.workflowParameters);
        break;
      case 'Station B2':
        this.rootNav.push(WardB2Page, this.workflowParameters);
        break;
      case 'Station B3':
        this.rootNav.push(WardB3Page, this.workflowParameters);
        break;
      case 'Station C1':
        this.rootNav.push(WardC1Page, this.workflowParameters);
        break;
      case 'Station IPS':
        this.rootNav.push(WardIpsPage, this.workflowParameters);
        break;
    }
  }

  /**
   * Event handler for the searchbarVisibiltyChange event of the navbar.
   * @param isVisible   The current value of the searchbar visibility.
   */
  private onSearchbarVisibilityChange(isVisible: boolean): void {
    this.isSearchbarVisible = isVisible;
    this.results = this.wards;
  }

  /**
   * Searches inside the loaded ward list for a wards name and removes
   * not fitting wards.
   * @param search    The search string.
   */
  private getWards(event): void {
    if (event.target.value !== undefined) {
      this.results = this.wards.filter(ward => {
        return ward.toLowerCase().includes(event.target.value.toLowerCase());
      });
    } else {
      this.results = this.wards;
    }
  }
}
