import {NgModule} from '@angular/core';
import {PatientListComponent} from './patient/patient-list/patient-list';
import {PatientSelectorComponent} from './patient/patient-selector/patient-selector';
import { NavbarComponent } from './navbar/navbar';
import { NotImplementedYetComponent } from './not-implemented-yet/not-implemented-yet';
import { SearchAssessmentComponent } from './search-assessment/search-assessment';

@NgModule({
	declarations: [PatientListComponent,
    PatientSelectorComponent,
    NavbarComponent,
    NotImplementedYetComponent,
    SearchAssessmentComponent],
	imports: [],
	exports: [PatientListComponent,
    PatientSelectorComponent,
    NavbarComponent,
    NotImplementedYetComponent,
    SearchAssessmentComponent]
})
export class ComponentsModule {}
