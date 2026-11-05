import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MessageBanner } from './message-banner';

describe('MessageBanner', () => {
  let component: MessageBanner;
  let fixture: ComponentFixture<MessageBanner>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MessageBanner],
    }).compileComponents();

    fixture = TestBed.createComponent(MessageBanner);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
