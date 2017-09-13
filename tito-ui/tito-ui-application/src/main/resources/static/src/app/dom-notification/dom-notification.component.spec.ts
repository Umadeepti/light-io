import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { DomNotificationComponent } from './dom-notification.component';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { FormsModule } from "@angular/forms";

describe('DomNotificationComponent', () => {
  let component: DomNotificationComponent;
  let fixture: ComponentFixture<DomNotificationComponent>;
  let type;
  let txt;
  let timeout;
  const TIME = 5000;
  const TYPE = "danger";
  const TXT = "warning";
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, NgbModule.forRoot()],
      declarations: [ DomNotificationComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DomNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.timeout = TIME;
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
  describe('display', () => {
    beforeEach(()=>{
      component.display(TYPE, TXT);
    });
    it('should set the txt attribute to specified string', ()=>{
      expect(component.txt).toEqual(TXT);
    });
    it('should set the type attribute to specified string', ()=>{
      expect(component.type).toEqual(TYPE);
    });
    it('should set the txt attribute to null after ' + TIME + ' milliseconds', fakeAsync(()=>{
    }));
  });
});
