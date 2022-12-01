import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetPathsComponent } from './get-paths.component';

describe('PathsComponent', () => {
  let component: GetPathsComponent;
  let fixture: ComponentFixture<GetPathsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetPathsComponent ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(GetPathsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
