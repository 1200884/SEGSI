import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardFleetComponent } from './board-fleet.component';

describe('BoardFleetComponent', () => {
  let component: BoardFleetComponent;
  let fixture: ComponentFixture<BoardFleetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoardFleetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardFleetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
