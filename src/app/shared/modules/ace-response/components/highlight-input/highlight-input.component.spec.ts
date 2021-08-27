import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { HighlightInputComponent } from './highlight-input.component';

describe('CustomInputComponent', () => {
  let component: HighlightInputComponent;
  let fixture: ComponentFixture<HighlightInputComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [HighlightInputComponent],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(HighlightInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call custom copy function', () => {
    const copySpy = spyOn(component, 'onCopy');
    component.input.nativeElement.dispatchEvent(new Event('copy'));
    expect(copySpy).toHaveBeenCalled();
  });
});
