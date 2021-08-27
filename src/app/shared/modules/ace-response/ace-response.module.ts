import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AceResponseComponent } from './ace-response.component';
import { TagComponent } from './components/tag/tag.component';
import { TagColorDirective } from "./directives/tag-color.directive";
import { InfoTipComponent } from './components/info-tip/info-tip.component';
import { TabViewModule } from 'primeng/tabview';
import { CallTabComponent } from "./components/call-tab/call-tab.component";
import { ChatbotTabComponent } from "./components/chatbot-tab/chatbot-tab.component";
import { TextTabComponent } from "./components/text-tab/text-tab.component";
import { ClickOutsideDirective } from "../../utils/click-outside.directive";
import { CheckboxModule } from "primeng/checkbox";
import { IsCloneablePipe } from "./directives/is-cloneable.pipe";
import { SelectListComponent } from "./components/select-list/select-list.component";
import { HighlightInputComponent } from "./components/highlight-input/highlight-input.component";
import { InputActionsComponent } from "./components/input-actions/input-actions.component";
import { ResponseOptionsComponent } from "./components/response-options/repsonse-options.component";
import { TextEditorComponent } from "../../utils/components/text-editor/text-editor.component";
import { VariableHighlightingPipe } from "./pipes/variable-highlighting.pipe";
import { EditorModule } from "primeng/editor";
import { LinkTargetModalComponent } from "../../utils/components/link-target-modal/link-target-modal.component";
import { AceResponseFormComponent } from './components/ace-response-form/ace-response-form.component';

@NgModule({
  declarations: [
    AceResponseComponent,
    TagComponent,
    TagColorDirective,
    InfoTipComponent,
    CallTabComponent,
    ChatbotTabComponent,
    TextTabComponent,
    ClickOutsideDirective,
    IsCloneablePipe,
    SelectListComponent,
    HighlightInputComponent,
    InputActionsComponent,
    ResponseOptionsComponent,
    TextEditorComponent,
    VariableHighlightingPipe,
    LinkTargetModalComponent,
    AceResponseFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    TabViewModule,
    ReactiveFormsModule,
    CheckboxModule,
    EditorModule
  ],
  exports: [
    AceResponseComponent,
    AceResponseFormComponent
  ]
})
export class AceResponseModule { }
