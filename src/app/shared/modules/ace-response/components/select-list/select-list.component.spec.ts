import { ComponentFixture, fakeAsync, flush, TestBed } from '@angular/core/testing';

import { IOption, SelectListComponent } from './select-list.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

const options: IOption[] = [
  {
    label: 'option label 1',
    value: 1,
  },
  {
    label: 'option label 2',
    value: 2,
  },
];

describe('SelectListComponent', () => {
  let component: SelectListComponent;
  let fixture: ComponentFixture<SelectListComponent>;
  let el: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SelectListComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectListComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    component.options = options;
    component.onTouched = jasmine.createSpy();
    component.onChange = jasmine.createSpy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('close list', () => {
    component.isListShown = true;
    component.closeList();
    expect(component.isListShown).toBeFalsy();
  });

  it('should not show list on initial', () => {
    const itemList = el.query(By.css('.wrapper .list'));
    expect(itemList).toBeNull();
  });

  it('should show list when it is shown', () => {
    component.isListShown = true;
    fixture.detectChanges();
    const itemList = el.query(By.css('.wrapper .list'));
    const items = itemList.queryAll(By.css('.list__item'));
    expect(itemList.nativeElement).not.toBeNull();
    expect(items.length).toBe(options.length);
  });

  it('should close list items', () => {
    component.isListShown = true;
    component.closeList();
    expect(component.isListShown).toBeFalsy();
  });

  it('should reverse isShown when called', () => {
    const initialValue = component.isListShown;
    fixture.detectChanges();
    component.onTriggerClick({
      stopPropagation: () => {},
    } as Event);
    expect(component.isListShown).not.toBe(initialValue);
  });

  it('should ignore reversing isShown property when it is called', () => {
    const initialValue = component.isListShown;
    component[`onTouched`] = jasmine.createSpy();
    component.disabled = true;
    component.onTriggerClick({
      stopPropagation: () => {},
    } as Event);
    expect(component[`onTouched`]).toHaveBeenCalled();
    expect(component.isListShown).toBe(initialValue);
  });

  it('should emit option when clicked on item and close list', fakeAsync(() => {
    component.isListShown = true;
    component.writeValue = jasmine.createSpy();
    component.closeList = jasmine.createSpy('JamesBond');
    fixture.detectChanges();
    const itemList = el.query(By.css('.wrapper .list'));
    const items = itemList.queryAll(By.css('.list__item'));
    component.selected.subscribe((item) => expect(item).toEqual(options[0]));
    items[0].nativeElement.click();
    flush();
    expect(component.writeValue).toHaveBeenCalledTimes(1);
    expect(component.closeList).toHaveBeenCalledTimes(1);
  }));

  it('should not emit option when clicked on disabled item and reverse isShown', () => {
    component.isListShown = true;
    component.options = options.map((option) => ({ ...option, disabled: true }));
    fixture.detectChanges();
    const itemList = el.query(By.css('.wrapper .list'));
    const items = itemList.queryAll(By.css('.list__item'));
    component.selected = jasmine.createSpyObj(['emit']);
    items[0].nativeElement.click();
    expect(component.selected.emit).toHaveBeenCalledTimes(0);
  });
});
