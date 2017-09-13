import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { OppSummaryComponent } from './opp-summary.component';
import { DomCheckboxComponent } from "app/dom-checkbox/dom-checkbox.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { SampleOpportunities } from "app/sample-opportunities";
import { DomDatepickerComponent } from "app/dom-datepicker/dom-datepicker.component";
import { fakeAsync } from "@angular/core/testing";

describe('OppSummaryComponent', () => {
  let component: OppSummaryComponent;
  let fixture: ComponentFixture<OppSummaryComponent>;
  let opp: any;
  let checkRequiredFieldsSpy;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, NgbModule.forRoot()],
      declarations: [OppSummaryComponent, 
        DomCheckboxComponent,
        DomDatepickerComponent],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OppSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.opp = JSON.parse(SampleOpportunities.OPPJSON);
  });
  it('should be created', () => {
    expect(component).toBeTruthy();
  });
  describe('accountSelect', ()=>{
    it('should set opp.summary.client and opp.summary.subclient to null', ()=>{
      component.accountSelect();
      expect(component.opp.summary.client).toBe(null);
      expect(component.opp.summary.subClient).toBe(null);
    });
  });

  describe('clientSelect', async()=>{
    it('should set opp.summary.subclient to null', () => {
      component.clientSelect();
      expect(component.opp.summary.subClient).toBe(null);
    });
  });
  
  describe('compareObjectsById', async()=>{
    it('should return true if two objects have the same id attribute or are both falsy, false otherwise', ()=>{
      let obj1 = null;
      let obj2 = null;
      let res = component.compareObjectsById(obj1, obj2);
      expect(res).toBeTruthy();
      obj1 = {id: null};
      obj2 = {id: null};
      res = component.compareObjectsById(obj1, obj2);
      expect(res).toBeTruthy();
      obj1 = {id: 1};
      obj2 = {id: 2};
      res = component.compareObjectsById(obj1, obj2);
      expect(res).toBeFalsy();
      obj1 = {id: 2};
      obj2 = {id: 2};
      res = component.compareObjectsById(obj1, obj2);
      expect(res).toBeTruthy();
    });
  });
}); 
