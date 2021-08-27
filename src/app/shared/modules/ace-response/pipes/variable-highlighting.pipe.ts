import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

export const VARIABLE_REGEXP = /(\[{2}[A-Z]+?\]{2})|(x{2}[A-Z]+?x{2})/gi;

@Pipe({
  name: 'variableHighlighting',
})
export class VariableHighlightingPipe implements PipeTransform {
  constructor(private readonly sanitizer: DomSanitizer) {}

  transform(value: string | string[]): SafeHtml | string {
    if (!Array.isArray(value)) {
      return this.sanitizer.bypassSecurityTrustHtml(getHighlightedString(value));
    } else {
      return '';
    }
  }
}

export function getHighlightedString(value: string): string {
  const match = value?.match(VARIABLE_REGEXP);
  if (!match?.length) {
    return value;
  }

  let resultString = value;
  // tslint:disable-next-line:prefer-for-of
  for (let i = 0; i < match.length; i++) {
    const variable = `<mark>${match[i]}</mark>`;
    const startIndex = resultString.indexOf(match[i]);
    resultString =
      resultString.slice(0, startIndex) +
      variable +
      resultString.slice(startIndex + match[i].length);
  }
  return resultString;
}
