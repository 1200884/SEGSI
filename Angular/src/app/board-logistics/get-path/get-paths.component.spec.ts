/*import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Path } from 'src/app/_models/Path';
import { LogisticsService } from 'src/app/_services/logistics.service';
import { GetPathsComponent } from './get-paths.component';
import { of } from 'rxjs';

describe('PathsComponent', () => {
  let PATH: Path[];
  let mockLogisticsService: any;
  let component: GetPathsComponent;
  let fixture: ComponentFixture<GetPathsComponent>;

  beforeEach(async () => {
    PATH =[
      {
        warehouseDeparture: 1,
        warehouseDestination: 2,
        distance:3,
        travelTime:4,
        energyNecessary:5,
        additionalTime:6
      },
      {
        warehouseDeparture: 10,
        warehouseDestination: 20,
        distance:30,
        travelTime:40,
        energyNecessary:50,
        additionalTime:60
      }];
    TestBed.configureTestingModule({
      declarations: [ GetPathsComponent ],
      providers: [
        {
        provide: LogisticsService,
        useValue: mockLogisticsService,
        },
      ]
    })
    fixture = TestBed.createComponent(GetPathsComponent);
    component = fixture.componentInstance;
  });

  mockLogisticsService = jasmine.createSpyObj(['getPaths']);

  it('should set paths from the service directly', () => {
    mockLogisticsService.getPaths.and.returnValue(of(PATH));
    fixture.detectChanges();
    expect(component.paths.length).toBe(2);
  });
});*/




import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WarehouseService } from 'src/app/_services/warehouse.service';
import { GetPathsComponent } from './get-paths.component';
import { of, throwError } from 'rxjs';
import { Location } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { Path } from 'src/app/_models/Path';
import { LogisticsService } from 'src/app/_services/logistics.service';


describe('GetPathsComponent', () => {
  let paths: Path[];
  let mockLogisticsService: any;
  let component: GetPathsComponent;
  let fixture: ComponentFixture<GetPathsComponent>;

  beforeEach(async () => {
    paths =[
      {
      warehouseDeparture : 10,
      warehouseDestination : 5,
      distance : 30,
      travelTime : 40,
      energyNecessary : 50,
      additionalTime : 60
      },
      {
       warehouseDeparture : 1,
       warehouseDestination : 3,
       distance : 3,
       travelTime : 4,
       energyNecessary : 5,
       additionalTime : 6
      }];
      
      TestBed.configureTestingModule({
        declarations: [ GetPathsComponent],
        imports: [
          NgxPaginationModule,
        ],
        providers: [
          {
          provide: LogisticsService,
          useValue: mockLogisticsService,
          },
        ]
      })
    fixture = TestBed.createComponent(GetPathsComponent);
    component = fixture.componentInstance;
  });

  mockLogisticsService = jasmine.createSpyObj(['getPaths']);

  /*describe('ngOnInit', () => {

    it('should set check1 to true and call DisplayAll', () => {
      spyOn(component, 'DisplayAll');
  
      component.ngOnInit();
  
      expect(component.check1).toBeTrue();
      expect(component.DisplayAll).toHaveBeenCalled();
    });
  });

  describe('DisplayAll', () => {
  
    it('should retrieve and store the list of paths', () => {
  
      mockLogisticsService.getPaths.and.returnValue(of(paths));
  
      component.DisplayAll();
  
      expect(component.paths).toEqual(paths);
    });
  });*/
  it('should set paths from the service directly', () => {
    mockLogisticsService.getPaths.and.returnValue(of(paths));
    fixture.detectChanges();
    expect(component.paths.length).toBe(2);
  });

});
