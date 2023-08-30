import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatRoomSelectionComponent } from './chat-room-selection.component';

describe('ChatRoomSelectionComponent', () => {
  let component: ChatRoomSelectionComponent;
  let fixture: ComponentFixture<ChatRoomSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatRoomSelectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatRoomSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
