import { RouterModule } from '@angular/router';

import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { NgbModule, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { AppComponent } from './app.component';

import { HttpModule } from '@angular/http';

import { OppTableComponent } from './opp-table/opp-table.component';
import { OppService } from './opp-service/opp.service';

import { ProjectsComponent } from './projects/projects.component';
import { HomeComponent } from './home/home.component';
import { PipelineComponent } from './pipeline/pipeline.component';
import { MySkillsComponent } from './my-skills/my-skills.component';
import { NavbarComponent } from './navbar/navbar.component';
import { OppDetailsComponent } from './opp-details/opp-details.component';
import { OppSummaryComponent } from './opp-summary/opp-summary.component';

import { OppLandscapeComponent } from './landscape/opp-landscape/opp-landscape.component';
import { OppPartnersComponent } from './landscape/opp-partners/opp-partners.component';
import { OppCompetitorsComponent } from './landscape/opp-competitors/opp-competitors.component';
import { OppViewComponent } from './opp-view/opp-view.component';
import { DomCheckboxComponent } from './dom-checkbox/dom-checkbox.component';
import { PursueModalComponent } from './pursue-modal/pursue-modal.component';

import { DatePickerFormatter } from './date-picker-formatter';
import { AddOppModalComponent } from './add-opp-modal/add-opp-modal.component';
import { OppCaptureActivitiesComponent } from './opp-capture-activities/opp-capture-activities.component';
import { DomNotificationComponent } from './dom-notification/dom-notification.component';
import { DomDatepickerComponent } from './dom-datepicker/dom-datepicker.component';
import { OppGetService } from "app/opp-data/opp-get.service";
import { BidModalComponent } from './bid-modal/bid-modal.component';
import { CompetitorService } from "app/services/competitor.service";
import { PartnerService } from "app/services/partner.service";
import { NotesModalComponent } from './notes-modal/notes-modal.component';
import { OppViewHeaderComponent } from './opp-view-header/opp-view-header.component';
import { DomStatusBarComponent } from './dom-status-bar/dom-status-bar.component';
import { DomStatusTriangleComponent } from './dom-status-triangle/dom-status-triangle.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProjectsComponent,
    PipelineComponent,
    MySkillsComponent,
    OppTableComponent,
    NavbarComponent,
    OppDetailsComponent,
    OppSummaryComponent,
    OppViewComponent,
    PipelineComponent,
    OppPartnersComponent,
    OppCompetitorsComponent,
    DomCheckboxComponent,
    OppLandscapeComponent,
    AddOppModalComponent,
    DomNotificationComponent,
    DomDatepickerComponent,
    PursueModalComponent,
    BidModalComponent,
    NotesModalComponent,
    OppViewHeaderComponent,
    OppCaptureActivitiesComponent,
    DomStatusBarComponent,
    DomStatusTriangleComponent
  ],
  exports: [
  ],
  imports: [
    Ng2SmartTableModule,
    BrowserModule,
    HttpModule,
    NgbModule.forRoot(),
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MultiselectDropdownModule,
    RouterModule.forRoot([
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'projects',
        component: ProjectsComponent
      },
      {
        path: 'pipeline',
        component: PipelineComponent
      },
      {
        path: 'myskills',
        component: MySkillsComponent
      },
      {
        path: 'opps/:id',
        component: OppViewComponent
      },
      {
        path: 'opps',
        component: OppTableComponent
      }
    ])
  ],
  providers: [
    OppGetService,
    CompetitorService,
    PartnerService,
    {
      provide: NgbDateParserFormatter,
      useFactory: DatePickerFormatterFactory
    }
  ],
  entryComponents: [
    PursueModalComponent, 
    AddOppModalComponent, 
    BidModalComponent, 
    NotesModalComponent
  ],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }

export function DatePickerFormatterFactory() {
  return new DatePickerFormatter();
}
