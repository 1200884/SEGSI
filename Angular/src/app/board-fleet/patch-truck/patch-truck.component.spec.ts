import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatchTruckComponent } from './patch-truck.component';

describe('PatchTruckComponent', () => {
  let component: PatchTruckComponent;
  let fixture: ComponentFixture<PatchTruckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatchTruckComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatchTruckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
