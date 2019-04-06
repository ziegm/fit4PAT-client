import {Component, EventEmitter, Input, Output} from '@angular/core';
import {App, NavController} from "ionic-angular";
import {TabsPage} from "../../pages/tabs/tabs";


@Component({
  selector: 'navbar',
  templateUrl: 'navbar.html'
})
export class NavbarComponent {
  @Output() private searchbarVisibilityChange = new EventEmitter();
  private isSearchbarVisible = false;
  @Input() private isMenuVisible = false;
  @Input() private title: string;
  @Input() private subTitle:string;

  constructor(private navController: NavController, app: App) {
  }

  private toggleSearchbarVisibility(): void {
    this.isSearchbarVisible = this.isSearchbarVisible !== true;
    this.searchbarVisibilityChange.emit(this.isSearchbarVisible);
  }

  private navToHome() {
    let home = this.navController.getViews().find((view) => view.component.name === "TabsPage");
    this.navController.popTo(home);
  }
}
