import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { OppDetailsComponent } from './opp-details.component';
import { FormsModule } from "@angular/forms";
import { DomCheckboxComponent } from "app/dom-checkbox/dom-checkbox.component";
import { RouterTestingModule } from "@angular/router/testing";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { Opp } from "app/opp";
import { SampleOpportunities } from "app/sample-opportunities";
import { DomDatepickerComponent } from "app/dom-datepicker/dom-datepicker.component";
import { MultiselectDropdownModule } from "angular-2-dropdown-multiselect";

describe('OppDetailsComponent', () => {
  let component: OppDetailsComponent;
  let fixture: ComponentFixture<OppDetailsComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NgbModule.forRoot(),
        FormsModule,
        MultiselectDropdownModule
      ],
      declarations: [ 
        OppDetailsComponent, 
        DomCheckboxComponent,
        DomDatepickerComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OppDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.opp = JSON.parse(SampleOpportunities.OPPJSON);
    
  });

   it('should be created', async() => {
     expect(component).toBeTruthy();
   });

  // describe('onInit', function () {
  //   it('populates an opp if opp is null', async() => {
  //     component.opp = null;
  //     component.ngOnInit();
  //     expect(OppOperations.populateEmpty).toHaveBeenCalledWith(null);
  //   })
  // });
});
