import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OppCompetitorsComponent } from './opp-competitors.component';
import { FormsModule } from "@angular/forms";
import { DomCheckboxComponent } from "app/dom-checkbox/dom-checkbox.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { AppModule } from "app/app.module";
import { OppGetService } from "../../opp-data/opp-get.service";
import { RouterTestingModule } from "@angular/router/testing";
import { HttpModule } from "@angular/http";
import { SampleOpportunities } from "app/sample-opportunities";

import { CompetitorService } from "../../services/competitor.service";
import { Competitor } from "app/common/competitor";

describe('OppCompetitorsComponent', () => {
  let component: OppCompetitorsComponent;
  let fixture: ComponentFixture<OppCompetitorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ 
        NgbModule.forRoot(), 
        FormsModule,
        HttpModule,
        RouterTestingModule
      ],
      declarations: [ 
        OppCompetitorsComponent,
        DomCheckboxComponent,        
      ],
      providers: [
        CompetitorService,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OppCompetitorsComponent);
    component = fixture.componentInstance;
    component.opp = JSON.parse(SampleOpportunities.OPPJSON);
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

});
