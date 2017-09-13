import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { FormsModule } from "@angular/forms";

import { OppCaptureActivitiesComponent } from './opp-capture-activities.component';
import { DomCheckboxComponent } from '../dom-checkbox/dom-checkbox.component';
import { SampleOpportunities } from 'app/sample-opportunities';
import { OppGetService } from "app/opp-data/opp-get.service";
import { Http, ConnectionBackend, RequestOptions, HttpModule, BaseRequestOptions } from "@angular/http";
import { ActivatedRoute } from "@angular/router";
import { RouterTestingModule } from '@angular/router/testing';
import { when } from "q";

describe('OppCaptureActivitiesComponent', () => {
  let component: OppCaptureActivitiesComponent;
  let fixture: ComponentFixture<OppCaptureActivitiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NgbModule.forRoot(),
        FormsModule,
        HttpModule,
        RouterTestingModule,
      ],
      declarations: [
        OppCaptureActivitiesComponent,
        DomCheckboxComponent
      ],
      providers: [
        OppGetService,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OppCaptureActivitiesComponent);
    component = fixture.componentInstance;
    component.opp = JSON.parse(SampleOpportunities.OPPJSON);
    
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
  // describe('Add', ()=>{
  //   it('should display a success message if Add is valid', ()=>{
  //     spyOn(component.addCapture, "post").and.returnValue(new Promise<any>((resolve, reject)=>{
  //       this.resolved = true;
  //     }));
  //     component.addCapture();
  //     expect(component.addCapture).toEqual("success");
  //   });
  //   it('should display an error message if Add is invalid', ()=>{
  //     spyOn(component.addCapture, "post").and.returnValue(new Promise<any>((resolve, reject)=>{
  //       this.resolved = false;
  //     }));
  //     component.addCapture();
  //     expect(component.addCapture).toEqual("danger");
  //   });
  // });

  // describe('addCapture', function () {
  //   it('should call oppGetService\'s createOppCapture method', function () {
  //     //arrange
  //     let spy = spyOn(component.oppGetService, 'createOppCapture');
    
  //     //act
  //     component.addCapture();

  //     //assert
  //     expect(spy).toHaveBeenCalledWith(1);
  //   });
  // });
});
