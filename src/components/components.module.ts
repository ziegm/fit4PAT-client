import {NgModule} from '@angular/core';
import {PatientListComponent} from './patient/patient-list/patient-list';
import {PatientSelectorComponent} from './patient/patient-selector/patient-selector';

@NgModule({
	declarations: [PatientListComponent,
    PatientSelectorComponent],
	imports: [],
	exports: [PatientListComponent,
    PatientSelectorComponent]
})
export class ComponentsModule {}
