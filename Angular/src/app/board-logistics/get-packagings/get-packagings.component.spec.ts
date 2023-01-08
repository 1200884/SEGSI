import { TestBed } from '@angular/core/testing';
import { GetPackagingsComponent } from './get-packagings.component';
import { LogisticsService } from 'src/app/_services/logistics.service';
import { Location } from '@angular/common';
import { of } from 'rxjs';

describe('GetPackagingsComponent', () => {
  let component: GetPackagingsComponent;
  let logisticsService: LogisticsService;
  let location: Location;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        GetPackagingsComponent,
        { provide: LogisticsService, useValue: { getPackagings: () => of([]) } },
        { provide: Location, useValue: { back: () => {} } },
      ]
    });

    component = TestBed.inject(GetPackagingsComponent);
    logisticsService = TestBed.inject(LogisticsService);
    location = TestBed.inject(Location);
  });

  it('should call logisticsService.getPackagings() when getPackagings() is called', () => {
    spyOn(logisticsService, 'getPackagings').and.callThrough();
    component.getPackagings();
    expect(logisticsService.getPackagings).toHaveBeenCalled();
  });

  it('should call location.back() when goBack() is called', () => {
    spyOn(location, 'back').and.callThrough();
    component.goBack();
    expect(location.back).toHaveBeenCalled();
  });

  it('should filter the packagings array by id when filterPackagingsById() is called', () => {
    component.packagings = [
      { id: '1', boxId: 1, positionX: 1, positionY: 1, positionZ: 1 },
      { id: '2', boxId: 2, positionX: 2, positionY: 2, positionZ: 2 },
      { id: '3', boxId: 3, positionX: 3, positionY: 3, positionZ: 3 }
    ];
    component.filterText1 = '2';
    component.filterPackagingsById();
    expect(component.packagings).toEqual([{ id: '2', boxId: 2, positionX: 2, positionY: 2, positionZ: 2 }]);
  });
});
