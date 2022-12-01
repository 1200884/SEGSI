import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetAPathComponent } from './get-a-path.component';

describe('GetAPathComponent', () => {
  let component: GetAPathComponent;
  let fixture: ComponentFixture<GetAPathComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetAPathComponent ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(GetAPathComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
