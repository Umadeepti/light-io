import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DomCheckboxComponent } from './dom-checkbox.component';

describe('DomCheckboxComponent', () => {
  let component: DomCheckboxComponent;
  let fixture: ComponentFixture<DomCheckboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DomCheckboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DomCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('has checkBoxClicked method defined', async() => {
    fixture.whenStable().then(() => {
      expect(component.checkBoxClicked).toBeTruthy();
    });
  });

  describe('checkBoxClicked', async() => {
    let button;
    
    beforeEach(async() => {
      button = fixture.debugElement.nativeElement.querySelector('button');
    });
    
    it('should call emit method on onBoxClick', async() => {
      spyOn(component, 'checkBoxClicked');
      button.click();
      fixture.whenStable().then(() => {
        expect(component.checkBoxClicked).toHaveBeenCalled();
      });
    });

    it('should set isChecked to true when isChecked is false', async() => {
      component.isChecked = false;
      button.click();
      expect(component.isChecked).toBe(true);    
    });

    it('should set isChecked to false when isChecked is true', async() => {
      component.isChecked = true;
      button.click();
      expect(component.isChecked).toBe(false);    
    });
  });
});
