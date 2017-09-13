import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOppModalComponent } from './add-opp-modal.component';
import { NgbModule, NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { OppDetailsComponent } from "app/opp-details/opp-details.component";
import { OppLandscapeComponent } from "app/opp-landscape/opp-landscape.component";
import { OppSummaryComponent } from "app/opp-summary/opp-summary.component";
import { FormsModule } from "@angular/forms";
import { DomCheckboxComponent } from "app/dom-checkbox/dom-checkbox.component";
import { DomDatepickerComponent } from "app/dom-datepicker/dom-datepicker.component";
import { MultiselectDropdownModule } from "angular-2-dropdown-multiselect";

describe('AddOppModalComponent', () => {
  let component: AddOppModalComponent;
  let fixture: ComponentFixture<AddOppModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        AddOppModalComponent,
        OppDetailsComponent,
        OppLandscapeComponent,
        OppSummaryComponent,
        DomCheckboxComponent,
        DomDatepickerComponent
      ],
      imports: [
        NgbModule.forRoot(),
        FormsModule,
        MultiselectDropdownModule
      ],
      providers: [
        NgbActiveModal
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOppModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
