import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NavController, Popover, PopoverController} from "ionic-angular";
import {TabsPage} from "../../pages/tabs/tabs";
import {WorkflowParameters} from "../../workflow/workflow-parameters";
import {MoreHomePage} from "../../pages/popover/more-popover/more-home/more-home";
import {MoreAZPage} from "../../pages/popover/more-popover/more-a-z/more-a-z";
import {MoreNavToPatientDetailPage} from "../../pages/popover/more-popover/more-nav-to-patient-detail/more-nav-to-patient-detail";
import {MorePatientAmbulatoryPage} from "../../pages/popover/more-popover/more-patient-ambulatory/more-patient-ambulatory";
import {MorePatientDetailPage} from "../../pages/popover/more-popover/more-patient-detail/more-patient-detail";
import {MorePatientIpsPage} from "../../pages/popover/more-popover/more-patient-ips/more-patient-ips";
import {MorePatientStationaryPage} from "../../pages/popover/more-popover/more-patient-stationary/more-patient-stationary";
import {MorePatientScanPage} from "../../pages/popover/more-popover/more-patient-scan/more-patient-scan";


@Component({
  selector: 'navbar',
  templateUrl: 'navbar.html'
})
/**
 * Top navigation containing title, subtitle, and buttons for navigating home, opening
 * sliding sidebar (hamburger), the overflow menu (3 dots) and search.
 */
export class NavbarComponent {
  @Output() private searchbarVisibilityChange = new EventEmitter();
  private isSearchbarVisible = false;
  @Input() private isMenuVisible = false;
  @Input() private isSearchVisible = true;
  @Input() private hideBackbutton = false;
  @Input() private title: string;
  @Input() private subTitle: string;
  @Input() private workflowParameters: WorkflowParameters;
  @Input() private popoverType = "MoreHomePage";
  public popover: Popover;

  constructor(private navController: NavController, private popoverCtrl: PopoverController) {
  }

  /**
   * Turning the search bar on and off.
   */
  private toggleSearchbarVisibility(): void {
    this.isSearchbarVisible = this.isSearchbarVisible !== true;
    this.searchbarVisibilityChange.emit(this.isSearchbarVisible);
  }

  /**
   * Takes the user back to the home page (assessment tab) by popping all other pages on top of it from
   * the navigation stack.
   */
  private navToHome() {
    // Gets the TabsPage view.
    let home = this.navController.getViews().find((view) => view.component.name === "TabsPage");

    // Removes the current patient from the workflow parameters.
    if (this.workflowParameters.patient !== undefined) {
      this.workflowParameters.patient = undefined;
    }

    // Sets the tab reference to the assessment page, so that it is loaded, even
    // if the user was on the patient page before.
    (home.instance as TabsPage).tabRef.select(0);

    this.navController.popTo(home);
  }

  /**
   * Opens the overflow menu (3 dots)
   * @param event   Click event provided by the click handler of the button used to call this method.
   */
  private openModal(event): void {
    // Creates the specific popover. switchModal() tells, which Page has to be displayed inside the popover.
    this.popover = this.popoverCtrl.create(this.switchModal(), this.workflowParameters, {cssClass: 'morePopover'});

    // Displays the popover.
    this.popover.present({
      ev: event
    });
  }

  /**
   * Decides which page has to be displayed inside a popover. The popoverType is set as component parameter
   * by the surrounding component.
   */
  private switchModal(): any {
    if (this.popoverType === "MoreAZPage") {
      return MoreAZPage;
    } else if (this.popoverType === "MoreNavToPatientDetailPage") {
      return MoreNavToPatientDetailPage;
    } else if (this.popoverType === "MorePatientAmbulatoryPage") {
      return MorePatientAmbulatoryPage;
    } else if (this.popoverType === "MorePatientDetailPage") {
      return MorePatientDetailPage;
    } else if (this.popoverType === "MorePatientIpsPage") {
      return MorePatientIpsPage;
    } else if (this.popoverType === "MorePatientStationaryPage") {
      return MorePatientStationaryPage;
    } else if (this.popoverType === "MorePatientScanPage") {
      return MorePatientScanPage;
    } else if (this.popoverType === "MoreHomePage") {
      return MoreHomePage;
    }
  }
}
