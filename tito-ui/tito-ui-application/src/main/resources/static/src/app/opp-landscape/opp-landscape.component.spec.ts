import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OppLandscapeComponent } from './opp-landscape.component';

describe('OppLandscapeComponent', () => {
  let component: OppLandscapeComponent;
  let fixture: ComponentFixture<OppLandscapeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OppLandscapeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OppLandscapeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
