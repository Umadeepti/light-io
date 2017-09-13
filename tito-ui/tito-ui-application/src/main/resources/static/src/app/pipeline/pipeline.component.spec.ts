import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PipelineComponent } from './pipeline.component';
import { OppTableComponent } from '../opp-table/opp-table.component';
import { AppModule } from "app/app.module";
import { OppDetailsComponent } from "app/opp-details/opp-details.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { Ng2SmartTableModule } from "ng2-smart-table";
import { RouterTestingModule } from "@angular/router/testing";
import { FormsModule } from "@angular/forms";
import { OppSummaryComponent } from "app/opp-summary/opp-summary.component";

describe('PipelineComponent', () => {
  let component: PipelineComponent;
  let fixture: ComponentFixture<PipelineComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        PipelineComponent,
        OppTableComponent,
      ],
      imports: [
        FormsModule,
        NgbModule.forRoot(),
        Ng2SmartTableModule,
        RouterTestingModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PipelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
