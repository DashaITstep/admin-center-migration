import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ChatbotTabComponent } from './chatbot-tab.component';

describe('ChatbotTabComponent', () => {
  let component: ChatbotTabComponent;
  let fixture: ComponentFixture<ChatbotTabComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ChatbotTabComponent],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatbotTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
