import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DomDatepickerComponent } from './dom-datepicker.component';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { FormsModule } from "@angular/forms";
describe('DomDatepickerComponent', () => {
  let component: DomDatepickerComponent;
  let fixture: ComponentFixture<DomDatepickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DomDatepickerComponent ],
      imports: [
        NgbModule.forRoot(),
        FormsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DomDatepickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
