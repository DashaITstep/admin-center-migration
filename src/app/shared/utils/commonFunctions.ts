import { EQuestionStatus, IPhrase } from "./phrase.model";

export const arrayOfType = (data: any[], Type: any) => {
  return data && data.length ? data.map((item) => new Type(item)) : [];
};

export function getCloneablePhrases(phrases: IPhrase[] = []): IPhrase[] {
  return phrases
    .filter((phrase) => Boolean(phrase))
    .filter(
      ({ Cloneable, UserDefinable, QuestionStatus }) =>
        Cloneable && UserDefinable && QuestionStatus === EQuestionStatus.custom
    );
}
