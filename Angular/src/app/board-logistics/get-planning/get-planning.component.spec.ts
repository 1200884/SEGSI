import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetPlanningComponent } from './get-planning.component';

describe('GetPlanningComponent', () => {
  let component: GetPlanningComponent;
  let fixture: ComponentFixture<GetPlanningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetPlanningComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GetPlanningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
