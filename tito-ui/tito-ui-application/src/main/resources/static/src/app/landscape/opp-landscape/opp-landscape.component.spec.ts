import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OppLandscapeComponent } from './opp-landscape.component';
import { OppPartnersComponent } from '../opp-partners/opp-partners.component';
import { OppCompetitorsComponent } from '../opp-competitors/opp-competitors.component';
import { FormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { DomCheckboxComponent } from "app/dom-checkbox/dom-checkbox.component";
import { HttpModule } from "@angular/http";
import { Http } from "@angular/http";
import { MockBackend } from "@angular/http/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { CompetitorService } from "../../services/competitor.service";
import { PartnerService } from "../../services/partner.service";
import { SampleOpportunities } from "app/sample-opportunities";


describe('OppLandscapeComponent', () => {
  let component: OppLandscapeComponent;
  let fixture: ComponentFixture<OppLandscapeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        HttpModule,
        NgbModule.forRoot(),
        RouterTestingModule
      ],
      declarations: [ 
        OppLandscapeComponent,
        OppPartnersComponent,
        OppCompetitorsComponent,
        DomCheckboxComponent
     ],
      providers: [
        CompetitorService,
        PartnerService 
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OppLandscapeComponent);
    component = fixture.componentInstance;
    component.opp = JSON.parse(SampleOpportunities.OPPJSON);
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});