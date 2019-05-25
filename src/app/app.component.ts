import {Component} from '@angular/core';
import {AlertController, Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';

import {TabsPage} from '../pages/tabs/tabs';
import {MenuNavigationProvider} from "../providers/menu-navigation/menu-navigation";

@Component({
  templateUrl: 'app.html'
})
/**
 * Entry-Component of the ionic app.
 */
export class MyApp {
  private rootPage:any = TabsPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private menuNav: MenuNavigationProvider, private alertCtrl: AlertController) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  /**
   * Loads a popup with the information, that a specific feature is not yet implemented in this prototype.
   */
  private presentAlert(): void{
    let alert = this.alertCtrl.create({
      title: 'Prototyp',
      message: 'Diese Funktion wurde leider noch nicht umgesetzt.',
      buttons: ['OK']
    });
    alert.present();
  }
}
