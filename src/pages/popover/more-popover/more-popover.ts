import {Component} from '@angular/core';
import {PopoverController} from 'ionic-angular';
import {InstructionPage} from "./instruction/instruction";
import {SettingsPage} from "./settings/settings";
import {PrivacyPage} from "./privacy/privacy";
import {LicencesPage} from "./licences/licences";
import {ImpressumPage} from "./impressum/impressum";

@Component({
  selector: 'page-more-popover',
  templateUrl: 'more-popover.html',
})
export class MorePopoverPage {

  constructor(private popoverCtrl: PopoverController) {
  }

  private openInstruction(event): void {
    let popover = this.popoverCtrl.create(InstructionPage, {});
    popover.present({
      ev: event
    });
  }

  private openSettings(event): void {
    let popover = this.popoverCtrl.create(SettingsPage, {});
    popover.present({
      ev: event
    });
  }

  private openPrivacy(event): void {
    let popover = this.popoverCtrl.create(PrivacyPage, {});
    popover.present({
      ev: event
    });
  }

  private openLicences(event): void {
    let popover = this.popoverCtrl.create(LicencesPage, {});
    popover.present({
      ev: event
    });
  }

  private openImpressum(event): void {
    let popover = this.popoverCtrl.create(ImpressumPage, {});
    popover.present({
      ev: event
    });
  }
}
