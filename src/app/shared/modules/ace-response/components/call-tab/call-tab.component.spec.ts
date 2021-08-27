import { FormArray, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { CallTabComponent } from './call-tab.component';
import { InputActionsComponent } from '../../../../../../../../shared/components/input-actions/input-actions.component';
import { ResponseOptionsComponent } from '../../../../../../../../shared/components/response-options/repsonse-options.component';
import { VariableHighlightingPipe } from '../../../../../../../../shared/pipes/variable-highlighting.pipe';
import { HighlightInputComponent } from '../../../../../../../../shared/components/highlight-input/highlight-input.component';
import { VoicePreviewService } from '../../../../../../../../core/services/voice-preview.service';
import { ErrorService } from '../../../../../../../../core/services/error.service';
import { provideMockStore } from '@ngrx/store/testing';
import { HttpClientModule } from '@angular/common/http';

describe('Call tab', () => {
  let spectator: Spectator<CallTabComponent>;
  const createComponent = createComponentFactory({
    component: CallTabComponent,
    imports: [ReactiveFormsModule, HttpClientModule],
    declarations: [
      HighlightInputComponent,
      InputActionsComponent,
      ResponseOptionsComponent,
      VariableHighlightingPipe,
    ],
    mocks: [VoicePreviewService, ErrorService],
    providers: [provideMockStore()],
  });

  beforeEach(
    () =>
      (spectator = createComponent({
        props: {
          formArray: new FormArray([new FormControl('test')]),
          isNotModified: true,
          responseOptions: [],
        },
      }))
  );

  it('should show cog', () => {
    expect(spectator.query('.fas.fa-cog')).toBeTruthy();
  });

  it('should show voice preview', () => {
    expect(spectator.query('.fas.fa-volume')).toBeTruthy();
  });

  it('should have voice preview value', () => {
    const responseText = spectator.query('.highlight-input')?.textContent;
    const voicePreviewElem = spectator.query('.fas.fa-volume');
    spectator.click(voicePreviewElem);
    expect(spectator.inject(VoicePreviewService).playVoicePreview).toHaveBeenCalledWith(
      responseText
    );
  });
});
