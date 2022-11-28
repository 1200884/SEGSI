import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PathComponent } from './get-path.component';

describe('PathsComponent', () => {
  let component: PathComponent;
  let fixture: ComponentFixture<PathComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PathComponent ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PathComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
