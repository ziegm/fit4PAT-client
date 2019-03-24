import { NgModule } from '@angular/core';
import { PatientStationaryListComponent } from './patient-stationary-list/patient-stationary-list';
import { PatientSelectorComponent } from './patient-selector/patient-selector';

@NgModule({
	declarations: [PatientStationaryListComponent,
    PatientSelectorComponent],
	imports: [],
	exports: [PatientStationaryListComponent,
    PatientSelectorComponent]
})
export class ComponentsModule {}
