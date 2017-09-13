import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OppPartnersComponent } from './opp-partners.component';
import { FormsModule } from "@angular/forms";
import { DomCheckboxComponent } from "app/dom-checkbox/dom-checkbox.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { HttpModule } from "@angular/http";
import { RouterTestingModule } from "@angular/router/testing";
import { PartnerService } from "../../services/partner.service";
import { Partner } from "app/common/partner";
import { SampleOpportunities } from "app/sample-opportunities";

describe('OppPartnersComponent', () => {
  let component: OppPartnersComponent;
  let fixture: ComponentFixture<OppPartnersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        NgbModule.forRoot(),
        HttpModule,
        RouterTestingModule
      ],
      declarations: [ 
        OppPartnersComponent,
        DomCheckboxComponent, 
        
      ],
      providers: [
        PartnerService,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OppPartnersComponent);
    component = fixture.componentInstance;
    component.opp = JSON.parse(SampleOpportunities.OPPJSON);
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle partner off', () => {
    let partner = {workshare: 'Yes'};
    expect(component.toggleWorkshare(partner)).toEqual(null);
  });

  it('should toggle partner on', () => {
    let partner = {workshare: null};
    expect(component.toggleWorkshare(partner)).toEqual('Yes');
  });

  it('should toggle prime off', () => {
    let prime = {firm: {id: 1}};
    expect(component.togglePrime(prime)).toEqual(null);
  });

  it('should toggle prime on', () => {
    let prime = {firm: {id: 2}};
    expect(component.togglePrime(prime)).toEqual(jasmine.objectContaining({id: 2}));
  });

});
