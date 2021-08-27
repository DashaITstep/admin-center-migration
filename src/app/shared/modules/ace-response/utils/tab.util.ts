import { AbstractControl, FormArray, FormControl } from '@angular/forms';

export class TabUtil {
  activeDisplayOptionIndex: number | null = null;

  setActiveOptionIndex(index: number): void {
    this.activeDisplayOptionIndex = index;
  }

  clearActiveOptionIndex(): void {
    this.activeDisplayOptionIndex = null;
  }

  removeControlFromFormArrayByIndex(formArray: FormArray, index: number): void {
    formArray.removeAt(index);
    formArray.markAsDirty();
  }

  addPromptVariation(formArray: FormArray): void {
    this.clearActiveOptionIndex();
    formArray.push(new FormControl(''));
  }

  selectOption(formArray: FormArray, index: number, responseValue: string | string[]): void {
    const control = formArray.at(index);
    control.setValue(responseValue);
    control.markAsDirty();
    this.clearActiveOptionIndex();
  }

  selectGroupOption(control: AbstractControl, responseValue: string): void {
    control.setValue(responseValue);
    control.markAsDirty();
    this.clearActiveOptionIndex();
  }
}
