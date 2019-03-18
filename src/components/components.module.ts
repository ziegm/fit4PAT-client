import { NgModule } from '@angular/core';
import { PatientStationaryListComponent } from './patient-stationary-list/patient-stationary-list';
import { PatientAmbulatoryListComponent } from './patient-ambulatory-list/patient-ambulatory-list';
@NgModule({
	declarations: [PatientStationaryListComponent,
    PatientAmbulatoryListComponent],
	imports: [],
	exports: [PatientStationaryListComponent,
    PatientAmbulatoryListComponent]
})
export class ComponentsModule {}
