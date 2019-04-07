import {Component, EventEmitter, Input, Output} from '@angular/core';
import {App, NavController} from "ionic-angular";
import {TabsPage} from "../../pages/tabs/tabs";
import {WorkflowParameters} from "../../workflow/workflow-parameters";


@Component({
  selector: 'navbar',
  templateUrl: 'navbar.html'
})
export class NavbarComponent {
  @Output() private searchbarVisibilityChange = new EventEmitter();
  private isSearchbarVisible = false;
  @Input() private isMenuVisible = false;
  @Input() private title: string;
  @Input() private subTitle: string;
  @Input() private workflowParameters: WorkflowParameters;

  constructor(private navController: NavController, app: App) {
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
}
