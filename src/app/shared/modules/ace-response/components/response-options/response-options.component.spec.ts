import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ResponseOptionsComponent } from './repsonse-options.component';

describe('RepsonseOptionsComponent', () => {
  let component: ResponseOptionsComponent;
  let fixture: ComponentFixture<ResponseOptionsComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ResponseOptionsComponent],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ResponseOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
