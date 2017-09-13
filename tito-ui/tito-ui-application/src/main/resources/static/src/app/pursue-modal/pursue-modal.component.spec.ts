import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PursueModalComponent } from './pursue-modal.component';
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { FormsModule } from "@angular/forms";
import { OppService } from "../opp-service/opp.service";
import { HttpModule } from "@angular/http";
import { OppPursue } from "app/common/opp-pursue";

describe('PursueModalComponent', () => {
  let component: PursueModalComponent;
  let fixture: ComponentFixture<PursueModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        PursueModalComponent, 
      ],
      providers: [
        NgbActiveModal,
        OppService
      ],
      imports: [
        FormsModule,
        HttpModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PursueModalComponent);
    component = fixture.componentInstance;
    component.oppPursue = new OppPursue();
    component.oppPursue.id = 2;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
