import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NavController, PopoverController} from "ionic-angular";
import {TabsPage} from "../../pages/tabs/tabs";
import {WorkflowParameters} from "../../workflow/workflow-parameters";
import {MoreHomePage} from "../../pages/popover/more-popover/more-home/more-home";
import {MoreAZPage} from "../../pages/popover/more-popover/more-a-z/more-a-z";
import {MoreNavToPatientDetailPage} from "../../pages/popover/more-popover/more-nav-to-patient-detail/more-nav-to-patient-detail";
import {MorePatientAmbulatoryPage} from "../../pages/popover/more-popover/more-patient-ambulatory/more-patient-ambulatory";
import {MorePatientDetailPage} from "../../pages/popover/more-popover/more-patient-detail/more-patient-detail";
import {MorePatientIpsPage} from "../../pages/popover/more-popover/more-patient-ips/more-patient-ips";
import {MorePatientStationaryPage} from "../../pages/popover/more-popover/more-patient-stationary/more-patient-stationary";


@Component({
  selector: 'navbar',
  templateUrl: 'navbar.html'
})
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

  constructor(private navController: NavController, private popoverCtrl: PopoverController) {
  }

  private toggleSearchbarVisibility(): void {
    this.isSearchbarVisible = this.isSearchbarVisible !== true;
    this.searchbarVisibilityChange.emit(this.isSearchbarVisible);
  }

  private navToHome() {
    let home = this.navController.getViews().find((view) => view.component.name === "TabsPage");
    if (this.workflowParameters.patient !== undefined) {
      this.workflowParameters.patient = undefined;
    }
    (home.instance as TabsPage).tabRef.select(0);
    this.navController.popTo(home);
  }

  private openModal(event): void {
    let popover = this.popoverCtrl.create(this.switchModal(), {});
    popover.present({
      ev: event
    });
  }

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
    } else if (this.popoverType === "MoreHomePage") {
      return MoreHomePage;
    }
  }
}
