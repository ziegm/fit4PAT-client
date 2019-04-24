import {NgModule} from '@angular/core';
import {PatientListComponent} from './patient/patient-list/patient-list';
import {PatientSelectorComponent} from './patient/patient-selector/patient-selector';
import { NavbarComponent } from './navbar/navbar';
import { NotImplementedYetComponent } from './not-implemented-yet/not-implemented-yet';
import { SearchAssessmentComponent } from './search-assessment/search-assessment';
import { FabNavigationComponent } from './fab-navigation/fab-navigation';

@NgModule({
	declarations: [PatientListComponent,
    PatientSelectorComponent,
    NavbarComponent,
    NotImplementedYetComponent,
    SearchAssessmentComponent,
    FabNavigationComponent],
	imports: [],
	exports: [PatientListComponent,
    PatientSelectorComponent,
    NavbarComponent,
    NotImplementedYetComponent,
    SearchAssessmentComponent,
    FabNavigationComponent]
})
export class ComponentsModule {}
