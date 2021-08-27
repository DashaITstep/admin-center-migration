import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LinkTargetModalComponent } from './link-target-modal.component';
import { FormsModule } from '@angular/forms';

describe('ImageLinkModalComponent', () => {
  let component: LinkTargetModalComponent;
  let fixture: ComponentFixture<LinkTargetModalComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [FormsModule],
        declarations: [LinkTargetModalComponent],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkTargetModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
