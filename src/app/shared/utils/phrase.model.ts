import { ITag, TagModel } from './tag.model';
import { ISynonym, SynonymModel } from "./synonym.model";
import { ChatResponseModel, IChatResponse } from "./chat-response.model";
import { arrayOfType } from "./commonFunctions";

type TLeasingQuestionStatus = 'custom' | 'default' | 'touched' | 'untouched';

export enum EQuestionStatus {
  default,
  custom,
  all = 'all',
}

export interface IPhrase {
  PromptId: number;
  DisplayName: string;
  HelpInformation: string;
  UserDefinable: boolean;
  Cloneable?: boolean;
  Tags: ITag[];
  Synonyms: ISynonym[];
  Voice: IChatResponse;
  WebChat: IChatResponse;
  SMS: IChatResponse;
  Status?: TLeasingQuestionStatus;
  QuestionStatus?: EQuestionStatus;
}

export class PhraseModel implements IPhrase {
  PromptId: number = 0;
  DisplayName: string = '';
  HelpInformation: string = '';
  UserDefinable: boolean = false;
  Cloneable: boolean | undefined = false;
  Tags: ITag[] = [];
  Synonyms: ISynonym[] = [];
  Voice: IChatResponse = new ChatResponseModel();
  WebChat: IChatResponse = new ChatResponseModel();
  SMS: IChatResponse = new ChatResponseModel();
  Status: TLeasingQuestionStatus = 'default';
  QuestionStatus: EQuestionStatus | undefined = EQuestionStatus.all;

  constructor(data?: IPhrase) {
    if (data) {
      this.PromptId = data.PromptId;
      this.DisplayName = data.DisplayName;
      this.HelpInformation = data.HelpInformation;
      this.UserDefinable = data.UserDefinable;
      this.Cloneable = data.Cloneable;
      this.Tags = arrayOfType(data.Tags, TagModel);
      this.Synonyms = arrayOfType(data.Synonyms, SynonymModel);
      this.Voice = new ChatResponseModel(data.Voice);
      this.WebChat = new ChatResponseModel(data.WebChat);
      this.SMS = new ChatResponseModel(data.SMS);
      this.Status = data.Status || 'default';
      this.QuestionStatus = data.QuestionStatus ?? data.QuestionStatus;
    }
  }
}
