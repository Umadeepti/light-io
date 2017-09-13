import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OppViewHeaderComponent } from './opp-view-header.component';
import { OppService } from "app/opp-service/opp.service";
import { HttpModule } from "@angular/http";
import { NgbModule, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { RouterTestingModule } from "@angular/router/testing";
import { SampleOpportunities } from "app/sample-opportunities";
import { DebugElement } from "@angular/core";
import { By } from '@angular/platform-browser';
import { OppTimeline } from "app/common/opp-timeline";
import { DomStatusBarComponent } from "app/dom-status-bar/dom-status-bar.component";
import { DomStatusTriangleComponent } from "app/dom-status-triangle/dom-status-triangle.component";

describe('OppViewHeaderComponent', () => {
  let component: OppViewHeaderComponent;
  let fixture: ComponentFixture<OppViewHeaderComponent>;
  let modalRef: NgbModalRef;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule,
        NgbModule.forRoot(),
        RouterTestingModule
      ],
      declarations: [ 
        OppViewHeaderComponent,
        DomStatusBarComponent, 
        DomStatusTriangleComponent,
      ],
      providers: [
        OppService,
      ],
    })    
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OppViewHeaderComponent);
    component = fixture.componentInstance;
    component.opp = JSON.parse(SampleOpportunities.OPPJSON);
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  describe('showPursueModal', function() {
    it('is defined', () => {
      expect(component.showPursueModal).toBeDefined();
    });
  });

  describe('template', ()=>{    
    let expectedDateInMS = 1504284069210;  // September 1, 2017 in Milliseconds
    let expectedDateString = '09/01/2017';
    let expectedDate = new OppTimeline();
    
    it('shows a filtered estimated award date in format MM/dd/yyyy', ()=>{
      expectedDate.date = expectedDateInMS;
      component.opp.summary.estAwardDate = expectedDate; 
      de = fixture.debugElement.query(By.css('span#estAwardDateDisplay'));
      el = de.nativeElement;
      fixture.detectChanges();
      
      expect(el.textContent).toContain(expectedDateString);
    });

    it('shows a filtered estimated proposal due date in format MM/dd/yyyy', ()=>{
      expectedDate.date = expectedDateInMS;
      component.opp.summary.proposalDueDate = expectedDate; 
      de = fixture.debugElement.query(By.css('span#propDueDateDisplay'));
      el = de.nativeElement;
      fixture.detectChanges();

      expect(el.textContent).toContain(expectedDateString);
    });

    it('shows a formatted currency for opportunity expectedContractValue', ()=>{
      let testContractValue = 432432123;
      let expectedString = '$432,432,123.00';     
      component.opp.details.contractValueExpected = testContractValue; 
      de = fixture.debugElement.query(By.css('span#formattedExpContractVal'));
      el = de.nativeElement;
      fixture.detectChanges();

      expect(el.textContent).toContain(expectedString);
    });

    it('displays first and lastname of owner', ()=>{
      let firstName = 'Nobody';
      let lastName = 'Special';
      let expectedString = firstName + ' ' + lastName;
      component.opp.summary.owner.firstName = firstName;
      component.opp.summary.owner.lastName = lastName;

      de = fixture.debugElement.query(By.css('span#ownerName'));
      el = de.nativeElement;
      fixture.detectChanges();

      expect(el.textContent).toContain(expectedString);
    });

    it ('displays account, client, and sub client, in that order, separated by slashes', ()=>{
      let accountName = 'Who Cares';
      let clientName = 'Not Me';
      let subClientName = 'Whatever';
      let expectedString = accountName + ' / ' + clientName + ' / ' + subClientName;
      component.opp.summary.account.name = accountName;  
      component.opp.summary.client.name = clientName;
      component.opp.summary.subClient.name = subClientName;
      
      de = fixture.debugElement.query(By.css('span#oppBreakdown'));
      el = de.nativeElement;
      fixture.detectChanges();

      expect(el.textContent).toContain(expectedString);
    });

    it ('shows the summary name in an h5 tag', ()=>{
      let expectedName = 'Blah blahdy blah';
      component.opp.summary.name = expectedName; 
      
      de = fixture.debugElement.query(By.css('h5#summaryNameHeader'));
      el = de.nativeElement;
      fixture.detectChanges();

      expect(el.textContent).toContain(expectedName);
    });
  });
});
