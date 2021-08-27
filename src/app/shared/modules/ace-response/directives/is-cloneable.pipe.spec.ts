import { IsCloneablePipe } from './is-cloneable.pipe';
import { EQuestionStatus, IPhrase } from "../../../utils/phrase.model";

describe('IsCloneablePipe', () => {
  let pipe: IsCloneablePipe;
  beforeEach(() => {
    pipe = new IsCloneablePipe();
  });
  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return true when phrase is cloneable', () => {
    const res = pipe.transform({
      Cloneable: true,
      QuestionStatus: EQuestionStatus.custom,
      UserDefinable: true,
    } as IPhrase);

    expect(res).toBeTruthy();
  });

  it('should return false when phrase is cloneable', () => {
    const res = pipe.transform({
      Cloneable: true,
      QuestionStatus: EQuestionStatus.custom,
      UserDefinable: false,
    } as IPhrase);

    expect(res).toBeFalsy();
  });
});
