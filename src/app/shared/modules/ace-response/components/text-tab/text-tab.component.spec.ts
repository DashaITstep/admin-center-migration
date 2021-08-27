import { FormArray, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { TextTabComponent } from './text-tab.component';
import { InputActionsComponent } from '../../../../../../../../shared/components/input-actions/input-actions.component';
import { ResponseOptionsComponent } from '../../../../../../../../shared/components/response-options/repsonse-options.component';
import { VariableHighlightingPipe } from '../../../../../../../../shared/pipes/variable-highlighting.pipe';

describe('Text tab', () => {
  let spectator: Spectator<TextTabComponent>;
  const createComponent = createComponentFactory({
    component: TextTabComponent,
    imports: [ReactiveFormsModule],
    declarations: [InputActionsComponent, ResponseOptionsComponent, VariableHighlightingPipe],
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

  it('should not show voice preview', () => {
    expect(spectator.query('.fas.fa-volume')).toBeFalsy();
  });
});
