import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetGeneticplanningComponent } from './get-geneticplanning.component';

describe('GetGeneticplanningComponent', () => {
  let component: GetGeneticplanningComponent;
  let fixture: ComponentFixture<GetGeneticplanningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetGeneticplanningComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetGeneticplanningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
