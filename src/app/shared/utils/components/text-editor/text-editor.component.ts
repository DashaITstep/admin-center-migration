import {
  AfterContentChecked,
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { ControlContainer, FormControl, FormGroup } from '@angular/forms';

import { Editor } from 'primeng/editor';
// @ts-ignore
import Quill from 'quill';
import { quilModules } from './config';
import { TargetLink } from './target-link';
import { ITargetedLink } from "../../targeted-link.model";

Quill.debug('error');
Quill.register(TargetLink);

@Component({
  selector: 'app-text-editor',
  templateUrl: './text-editor.component.html',
  styleUrls: ['./text-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextEditorComponent
  implements OnInit, AfterViewInit, AfterContentChecked, AfterViewChecked {
  @Input() isAutoFocused: boolean = false;
  @Input() placeholder: string = '';
  @Input() controlName: string = '';
  @Input() isReadonly: boolean = false;
  @Input() isModified: boolean = false;
  @Input() isSelectMode: boolean = false;
  @Output() cFocus: EventEmitter<FocusEvent> = new EventEmitter<FocusEvent>();
  @Output() cBlur: EventEmitter<FocusEvent> = new EventEmitter<FocusEvent>();
  @ViewChild(Editor, { static: true }) editor!: Editor;
  isHtmlMode: boolean = false;
  group!: FormGroup;
  control!: FormControl;
  displayLinkModal: string = '';
  editorWrapper!: HTMLDivElement;
  textAreaEditor: HTMLTextAreaElement = document.createElement<'textarea'>('textarea');
  readonly modules = quilModules;

  constructor(private controlContainer: ControlContainer) {}

  get quill() {
    return this.editor && this.editor.getQuill();
  }

  ngOnInit(): void {
    this.group = this.controlContainer.control as FormGroup;
    this.control = this.group.get(this.controlName) as FormControl;
    this.textAreaEditor.value = this.control.value;
  }

  ngAfterViewInit(): void {
    this.initHtmlEditor();

    setTimeout(() => {
      if (this.control.value) {
        this.quill.pasteHTML(this.control.value);
      }
    }, 500);
  }

  ngAfterViewChecked(): void {
    if (!this.isAutoFocused || this.isSelectMode) {
      return;
    }
    this.isAutoFocused = false;
    setTimeout(() => this.editor.getQuill().focus(), 0);
  }

  ngAfterContentChecked(): void {
    if (this.group !== this.controlContainer.control) {
      this.updateComponentData();
    }
  }

  onTextChange(event: { delta: any; htmlValue: string }): void {
    this.textAreaEditor.value = event.htmlValue;

    // tslint:disable-next-line:max-line-length
    const expression = /(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/gi;
    const regex = new RegExp(expression);
    const isWhitespace = (str: string) => str && str.trim() === '';

    if (
      event.delta.ops.length === 2 &&
      event.delta.ops[0].retain &&
      isWhitespace(event.delta.ops[1].insert)
    ) {
      const endRetain = event.delta.ops[0].retain;
      const text = this.quill.getText().substr(0, endRetain);
      const match = text.match(regex);

      if (match !== null) {
        const url = match[0];

        let ops: any = [];
        if (endRetain > url.length) {
          ops.push({ retain: endRetain - url.length });
        }

        ops = ops.concat([{ delete: url.length }, { insert: url, attributes: { link: url } }]);

        this.quill.updateContents({
          ops,
        });
      }
    }
  }

  onLinkAdded(payload: ITargetedLink): void {
    this.insertTargetedLink(payload, this.displayLinkModal === 'Image');
  }

  onCloseLinkModal(): void {
    this.displayLinkModal = '';
  }

  insertTargetedLink(payload: ITargetedLink, image: boolean = false): void {
    this.onCloseLinkModal();

    const range = this.quill.getSelection(true);
    const value = payload.src;

    if (value) {
      let node;

      if (image) {
        node = `<a href="${value}?target=${payload.target}"><img src="${value}" /></a>`;
      } else {
        const selectedText = this.quill.getText(range);

        if (selectedText) {
          this.quill.deleteText(range);
        }

        node = `<a href="${value}?target=${payload.target}">${selectedText || value}</a>`;
      }

      this.quill.clipboard.dangerouslyPasteHTML(range.index, node);

      setTimeout(() => {
        this.control.setValue(this.quill.container.firstChild.innerHTML);
        this.control.markAsDirty();
      });
    }
  }

  onToggleContentMode(): void {
    this.isHtmlMode = !this.isHtmlMode;

    const container = this.quill.container.parentElement;
    const toggleContentModeButton = container.querySelector('.ql-toggleContentMode');
    const qlEditor = container.querySelector('.ql-editor');
    toggleContentModeButton?.classList.toggle('active');

    if (this.isHtmlMode) {
      qlEditor.classList.add('hidden');
      this.editorWrapper.classList.remove('hidden');
    } else {
      qlEditor.classList.remove('hidden');
      this.editorWrapper.classList.add('hidden');
    }

    if (this.textAreaEditor && this.textAreaEditor.classList.contains('view-raw-html')) {
      const html = this.textAreaEditor.value;
      this.quill.pasteHTML(html);
    }
  }

  onAddImage(event: Event): void {
    event.stopImmediatePropagation();
    this.displayLinkModal = this.displayLinkModal ? '' : 'Image';
  }

  onAddLink(event: Event): void {
    event.stopImmediatePropagation();
    this.displayLinkModal = this.displayLinkModal ? '' : 'Link';
  }

  private initHtmlEditor(): void {
    this.textAreaEditor.classList.add('view-raw-html');
    this.textAreaEditor.addEventListener('keyup', (event: any) => {
      this.control.setValue(event.target.value);
      this.control.markAsDirty();
    });

    this.editorWrapper = this.quill.addContainer('ql-custom');
    this.editorWrapper.classList.add('hidden');
    this.editorWrapper.appendChild(this.textAreaEditor);
  }

  private updateComponentData(): void {
    this.group = this.controlContainer.control as FormGroup;
    this.control = this.controlContainer?.control?.get(this.controlName) as FormControl;
    this.textAreaEditor.value = this.control.value;
    this.quill.pasteHTML(this.control.value);
  }
}
