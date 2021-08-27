import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ControlContainer } from '@angular/forms';
import { TextEditorComponent } from './text-editor.component';
describe('TextEditorComponent', () => {
  let component: TextEditorComponent;
  let fixture: ComponentFixture<TextEditorComponent>;
  beforeEach(() => {
    const controlContainerStub = () => ({ control: {} });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [TextEditorComponent],
      providers: [{ provide: ControlContainer, useFactory: controlContainerStub }],
    });
    fixture = TestBed.createComponent(TextEditorComponent);
    component = fixture.componentInstance;
  });
  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
  it(`isModified has default value`, () => {
    expect(component.isModified).toEqual(false);
  });
  it(`isHtmlMode has default value`, () => {
    expect(component.isHtmlMode).toEqual(false);
  });
});
