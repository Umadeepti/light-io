import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { OppViewComponent } from './opp-view.component';
import { FormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { OppDetailsComponent } from "app/opp-details/opp-details.component";
import { OppSummaryComponent } from "app/opp-summary/opp-summary.component";
import { OppCaptureActivitiesComponent } from 'app/opp-capture-activities/opp-capture-activities.component';
import { OppPartnersComponent } from '../landscape/opp-partners/opp-partners.component';
import { OppCompetitorsComponent } from '../landscape/opp-competitors/opp-competitors.component';
import { HttpModule } from "@angular/http";
import { RouterTestingModule } from '@angular/router/testing';
import { DomCheckboxComponent } from "app/dom-checkbox/dom-checkbox.component";
import { OppLandscapeComponent } from "app/opp-landscape/opp-landscape.component";
import { inject } from "@angular/core/testing";
import { DomNotificationComponent } from "app/dom-notification/dom-notification.component";
import { SampleOpportunities } from "app/sample-opportunities";
import { DomDatepickerComponent } from "app/dom-datepicker/dom-datepicker.component";
import { OppViewHeaderComponent } from "app/opp-view-header/opp-view-header.component";
import { MultiselectDropdownModule } from "angular-2-dropdown-multiselect";
import { DomStatusBarComponent } from "app/dom-status-bar/dom-status-bar.component";
import { DomStatusTriangleComponent } from "app/dom-status-triangle/dom-status-triangle.component";

describe('OppViewComponent', () => {
  let component: OppViewComponent;
  let fixture: ComponentFixture<OppViewComponent>;
  var formattedOppObj;
  var oppObj;
  var serviceSpy;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NgbModule.forRoot(),
        FormsModule,
        HttpModule,
        RouterTestingModule,
        MultiselectDropdownModule
      ],
      declarations: [
        OppViewComponent,
        OppDetailsComponent,
        OppLandscapeComponent,
        OppSummaryComponent,
        OppCaptureActivitiesComponent,
        DomCheckboxComponent,
        DomNotificationComponent,
        DomDatepickerComponent,
        OppPartnersComponent,
        OppCompetitorsComponent,
        OppPartnersComponent,
        OppViewHeaderComponent,
        DomStatusBarComponent,
        DomStatusTriangleComponent,
      ]
    })
      .compileComponents();
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(OppViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.formattedOpp = JSON.parse(SampleOpportunities.FORMATTEDJSON);
    component.opp = JSON.parse(SampleOpportunities.OPPJSON);
    component.notification = new DomNotificationComponent();
    component.notification.timeout = 5000;
    spyOn(component.route.params, "subscribe").and.returnValue(null);
    serviceSpy = spyOn(Promise.prototype, "then").and.callFake((fn, fn1)=>{
      if(this.resolved){
        fn(this.oppObj);
      } 
      else{
        fn1(undefined);
      }
    });
  });

  it('should be created', ()=>{
    expect(component).toBeTruthy();
  });
  describe('setNewOpp', ()=>{
    it('should populate opp and formattedOpp with objects', ()=>{
      component.setNewOpp(JSON.parse(SampleOpportunities.OPPJSON));
      expect(component.opp).toBeTruthy();
      expect(component.formattedOpp).toBeTruthy();
    });
  });
  describe('save', ()=>{
    it('should display a success message if save is valid', ()=>{
      spyOn(component.oppService, "put").and.returnValue(new Promise<any>((resolve, reject)=>{
        this.resolved = true;
      }));
      component.save();
      expect(component.notification.type).toEqual("success");
    });
    it('should display an error message if save is invalid', ()=>{
      spyOn(component.oppService, "put").and.returnValue(new Promise<any>((resolve, reject)=>{
        this.resolved = false;
      }));
      component.save();
      expect(component.notification.type).toEqual("danger");
    });
  });
  describe('cancel', ()=>{
    it('should display a warning message', ()=>{
      spyOn(component.oppService, "getById").and.returnValue(new Promise<any>((resolve, reject)=>{
        this.resolved = true;
      }));
      component.cancel();
      expect(component.notification.type).toEqual("warning");
    });
    it('should display an error if cancel fails', ()=>{
      spyOn(component.oppService, "getById").and.returnValue(new Promise<any>((resolve, reject)=>{
        this.resolved = false;
      }));
      component.cancel();
      expect(component.notification.type).toEqual("danger");
    });
  });
});