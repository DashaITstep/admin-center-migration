import { TChatMessageType } from "../../utils/chat-message.type";
import { IOption } from "../../utils/option.model";

export const RESPONSE_TYPE_IDS: { [key: string]: number } = {
  Voice: 1,
  WebChat: 2,
  SMS: 4,
};

export interface ITabConfig {
  header: string;
  typeId: number;
}

export const ACE_OPTIONS: { [key in TChatMessageType]: IOption } = {
  SMS: { label: 'Add Text response', value: RESPONSE_TYPE_IDS.SMS },
  WebChat: { label: 'Add Chatbot response', value: RESPONSE_TYPE_IDS.WebChat },
  Voice: { label: 'Add Default response', value: RESPONSE_TYPE_IDS.Voice },
};

export const ACE_TAB_CONFIG: { [key in TChatMessageType]: ITabConfig } = {
  Voice: { header: 'Default', typeId: RESPONSE_TYPE_IDS.Voice },
  WebChat: { header: 'Chatbot', typeId: RESPONSE_TYPE_IDS.WebChat },
  SMS: { header: 'Text', typeId: RESPONSE_TYPE_IDS.SMS },
};
