import { VARIABLE_REGEXP, VariableHighlightingPipe } from './variable-highlighting.pipe';
import SpyObj = jasmine.SpyObj;
import { DomSanitizer } from '@angular/platform-browser';
import { TestBed } from '@angular/core/testing';

describe('VariableHighlightingPipe', () => {
  let highlightingPipe: VariableHighlightingPipe;
  let domSanitizerSpyObj: SpyObj<DomSanitizer>;

  beforeEach(() => {
    domSanitizerSpyObj = jasmine.createSpyObj('DomSanitizer', ['bypassSecurityTrustHtml']);
    TestBed.configureTestingModule({
      providers: [
        VariableHighlightingPipe,
        { provide: DomSanitizer, useValue: domSanitizerSpyObj },
      ],
    });

    highlightingPipe = TestBed.inject(VariableHighlightingPipe);
  });

  it('create an instance', () => {
    expect(highlightingPipe).toBeTruthy();
  });

  it('should create safe HTML when it is getting string with variable inside', () => {
    const textVariable = 'XXvariableXX';
    const testString = `some string with ${textVariable} inside, that should be hightlighted`;
    const highlightedVariable = `<mark>${textVariable}</mark>`;
    const modifiedStringWithVar = testString.replace(VARIABLE_REGEXP, highlightedVariable);
    highlightingPipe.transform(testString);
    expect(domSanitizerSpyObj.bypassSecurityTrustHtml).toHaveBeenCalledTimes(1);
    expect(domSanitizerSpyObj.bypassSecurityTrustHtml).toHaveBeenCalledWith(modifiedStringWithVar);
  });

  it('should not modify represented string without variable inside', () => {
    const testString = 'some string that does not contain variable inside';
    highlightingPipe.transform(testString);
    expect(domSanitizerSpyObj.bypassSecurityTrustHtml).toHaveBeenCalledTimes(1);
    expect(domSanitizerSpyObj.bypassSecurityTrustHtml).toHaveBeenCalledWith(testString);
  });
});
