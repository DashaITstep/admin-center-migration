import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AceResponseComponent } from './ace-response.component';

describe('AceResponseComponent', () => {
  let component: AceResponseComponent;
  let fixture: ComponentFixture<AceResponseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AceResponseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AceResponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
