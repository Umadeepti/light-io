import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BidModalComponent } from './bid-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DomCheckboxComponent } from "app/dom-checkbox/dom-checkbox.component";
import { NgbModule, NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { OppService } from "../opp-service/opp.service";
import { HttpModule } from "@angular/http";
import { SampleOpportunities } from "app/sample-opportunities";

describe('BidModalComponent', () => {
  let component: BidModalComponent;
  let fixture: ComponentFixture<BidModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule, NgbModule.forRoot(), HttpModule ],
      declarations: [ BidModalComponent, DomCheckboxComponent ],
      providers: [ OppService, NgbActiveModal ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BidModalComponent);
    component = fixture.componentInstance;
    component.opportunity = JSON.parse(SampleOpportunities.OPPJSON);
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  describe('buildForm function', () => {
    it('should exist', () => {
      expect(component.buildForm).toBeDefined();
    });
  });

  describe('submit function', () => {
    it('should exist', () => {
      expect(component.submit).toBeDefined();
    });
  });

  describe('close function', () => {
    it('should exist', () => {
      expect(component.close).toBeDefined();
    });
  });

  describe('cancel function', () => {
    it('should exist', () => {
      expect(component.cancel).toBeDefined();
    });
  });

  describe('ngOnInit', () => {
    it('should exist', () => {
      expect(component.ngOnInit).toBeDefined();
    });
    it('calls buildForm on init', () => {
      spyOn(component, 'buildForm');
      component.ngOnInit();
      expect(component.buildForm).toHaveBeenCalled();
    });
  });

});
