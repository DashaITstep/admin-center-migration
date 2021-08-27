import { Pipe, PipeTransform } from '@angular/core';
import { IPhrase } from "../../../utils/phrase.model";
import { getCloneablePhrases } from "../../../utils/commonFunctions";

@Pipe({
  name: 'isCloneable',
})
export class IsCloneablePipe implements PipeTransform {
  transform(phrase: IPhrase): boolean {
    return Boolean(getCloneablePhrases([phrase]).length);
  }
}
