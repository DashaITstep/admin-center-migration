import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MockProvider } from '../../../../test';
import { VoicePreviewService } from '../../../core/services/voice-preview.service';
import { ElementRef } from '@angular/core';
import { InputActionsComponent } from './input-actions.component';

describe('TextToSpeechComponent', () => {
  let component: InputActionsComponent;
  let fixture: ComponentFixture<InputActionsComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [InputActionsComponent],
        providers: [MockProvider(ElementRef), MockProvider(VoicePreviewService)],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(InputActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
