import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DomCheckboxComponent } from "app/dom-checkbox/dom-checkbox.component";
import { NgbModule, NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

import { NotesModalComponent } from './notes-modal.component';

describe('NotesModalComponent', () => {
  let component: NotesModalComponent;
  let fixture: ComponentFixture<NotesModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule, NgbModule.forRoot() ],
      declarations: [ NotesModalComponent ],
      providers: [ NgbActiveModal ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotesModalComponent);
    component = fixture.componentInstance;
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
