import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  Output,
  OnChanges,
  OnInit,
  SimpleChanges,
  EventEmitter,
  SkipSelf
} from '@angular/core';
import { ACE_OPTIONS, ACE_TAB_CONFIG, ITabConfig, RESPONSE_TYPE_IDS } from "./ace-response.config";
import { ControlContainer } from "@angular/forms";
import { EQuestionStatus, IPhrase } from "../../utils/phrase.model";
import { IOption } from "../../utils/option.model";
import { ICurrentResponse } from "../../utils/current-response.model";
import { MESSAGE_TYPES_ARRAY } from "../../utils/message.type";
import { TChatMessageType } from "../../utils/chat-message.type";

@Component({
  selector: 'app-ace-response',
  templateUrl: './ace-response.component.html',
  styleUrls: ['./ace-response.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [{
    provide: ControlContainer,
    useFactory: (container: ControlContainer) => container,
    deps: [[new SkipSelf(), ControlContainer]]
  }]
})
export class AceResponseComponent implements OnInit, OnChanges {

  @Input() expanded: boolean = false;
  @Input() expandable: boolean = true;
  @Input() selectMode: boolean = false;
  @Input() selected: boolean = false;
  @Input() question!: IPhrase;
  @Input() tabs: ITabConfig[] = [];

  @Output() toggle: EventEmitter<void> = new EventEmitter<void>();
  @Output() selectQuestion: EventEmitter<number> = new EventEmitter<number>();

  public options: IOption[] = [];
  public selectedTabIndex: number = 0;
  public isActiveResponse: boolean = false;
  public typeIds = RESPONSE_TYPE_IDS;

  constructor(private readonly cdRef: ChangeDetectorRef) { }

  public ngOnInit(): void {
    this.initTabsAndOptions();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.question && !changes.question.firstChange) {
      this.initTabsAndOptions();
    }
  }

  public isDefaultResponse(type: TChatMessageType): boolean {
    return (
      !!this.question[type].CurrentResponses.length &&
      this.question[type].CurrentResponses[0].PropertyModifiedResponse === 0
    );
  }

  public onToggle(): void {
    this.toggle.emit();
  }

  public onToggleCheckbox(e: Event): void {
    e.stopPropagation();
    this.selectQuestion.emit(this.question.PromptId);
  }

  public onSelectTab({ index }: { index: number }): void {
    this.selectedTabIndex = index;
  }

  public onTypeSelected(option: IOption): void {
    const tabs = [ ...this.tabs ];
    const addedTabInstance = Object.values(ACE_TAB_CONFIG).find(
      ({ typeId }) => typeId === option.value
    );

    if (!!addedTabInstance) {
      this.selectedTabIndex = tabs.push(addedTabInstance) - 1;
    }

    this.options = this.options.filter(({ value }) => option.value !== value);
    this.tabs = tabs;
  }

  private initTabsAndOptions(): void {
    const options: IOption[] = [];
    // Voice(Default) tab should be presented by default
    const tabs = [ACE_TAB_CONFIG.Voice];

    MESSAGE_TYPES_ARRAY.filter((t) => t !== 'Voice').forEach((type) => {
      const currentResponse: ICurrentResponse =
        this.question[type].CurrentResponses[0] ?? ({} as ICurrentResponse);
      if (
        currentResponse.PropertyModifiedResponse === EQuestionStatus.custom ||
        currentResponse.ResponseValue?.length
      ) {
        tabs.push(ACE_TAB_CONFIG[type]);
      } else {
        options.push(ACE_OPTIONS[type]);
      }
    });

    this.tabs = tabs;
    this.options = options;
    this.cdRef.detectChanges();
  }
}
