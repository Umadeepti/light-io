import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DebugElement }    from '@angular/core';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { OppTableComponent } from './opp-table/opp-table.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterTestingModule } from '@angular/router/testing';

import { MockBackend } from "@angular/http/testing";
import { Http } from "@angular/http/http";

describe('AppComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        OppTableComponent,
        AppComponent,
        NavbarComponent
      ],
      imports: [
        Ng2SmartTableModule,
        NgbModule.forRoot(),
        RouterTestingModule
      ]
    });
    TestBed.compileComponents();
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
        providers: [
          MockBackend
        ]
    })
  });

  it('should create the app', () => {
    let fixture = TestBed.createComponent(AppComponent);
    let app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});
