export interface ISynonym {
  PromptSynonym: string;
}

export class SynonymModel implements ISynonym {
  PromptSynonym: string;

  constructor(data?: ISynonym) {
    if (data) {
      this.PromptSynonym = data.PromptSynonym;
    }
  }
}
