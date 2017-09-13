import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DomStatusBarComponent } from './dom-status-bar.component';
import { DomStatusTriangleComponent } from "app/dom-status-triangle/dom-status-triangle.component";
import { SampleOpportunities } from "app/sample-opportunities";

describe('DomStatusBarComponent', () => {
  let component: DomStatusBarComponent;
  let fixture: ComponentFixture<DomStatusBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        DomStatusBarComponent,
        DomStatusTriangleComponent, 
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DomStatusBarComponent);
    component = fixture.componentInstance;
    component.opp = JSON.parse(SampleOpportunities.OPPJSON);
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  describe('isHighligted', ()=>{
    it('exists', ()=>{
      expect(component.isHighlighted).toBeDefined();
    });

    it('returns true if stage is greater than or equal to the current stage', ()=>{
      let stage = 'Proposal / Bid';
      let ndx = 3;
      component.opp.summary.stage = stage;
      spyOn(component.statusBarStages, 'indexOf').and.returnValue(ndx);
      
      let returnedVal = component.isHighlighted(ndx);
      
      expect(returnedVal).toBe(true);
    });

    it('returns false if stage is less than the current stage', ()=>{
      let stage = 'Proposal / Bid';
      let ndx = 2;
      let ndxParam = 3;
      component.opp.summary.stage = stage;
      spyOn(component.statusBarStages, 'indexOf').and.returnValue(ndx);
      
      let returnedVal = component.isHighlighted(ndxParam);
      
      expect(returnedVal).toBe(false);
    });
  });
});
