import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DomStatusTriangleComponent } from './dom-status-triangle.component';
import { SampleOpportunities } from "app/sample-opportunities";
import { DebugElement } from "@angular/core";
import { By } from '@angular/platform-browser';

describe('DomStatusTriangleComponent', () => {
  let component: DomStatusTriangleComponent;
  let fixture: ComponentFixture<DomStatusTriangleComponent>;
  let expectedName = 'Blah blahdy blah';
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        DomStatusTriangleComponent 
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {    
    fixture = TestBed.createComponent(DomStatusTriangleComponent);
    component = fixture.componentInstance;
    component.name = expectedName;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  describe('component template', ()=>{
    it('should show name property in div tag', ()=>{
      de = fixture.debugElement.query(By.css('div.arrow'));
      el = de.nativeElement;
      fixture.detectChanges();
      
      expect(el.textContent).toEqual(expectedName);
    });    
  });
});
