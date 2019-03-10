import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PatientStationaryPage } from './patient-stationary';

@NgModule({
  declarations: [
    PatientStationaryPage,
  ],
  imports: [
    IonicPageModule.forChild(PatientStationaryPage),
  ],
})
export class PatientStationaryPageModule {}
