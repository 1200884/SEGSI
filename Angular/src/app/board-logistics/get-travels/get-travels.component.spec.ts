/* import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GetTravelsComponent } from './get-travels.component';
import { of, throwError } from 'rxjs';
import { NgxPaginationModule } from 'ngx-pagination';
import { Path } from 'src/app/_models/Path';
import { LogisticsService } from 'src/app/_services/logistics.service';


describe('GetPathsComponent', () => {
  let paths: Path[];
  let paths2:Path[];
  let mockLogisticsService: any;
  let component: GetTravelsComponent;
  let fixture: ComponentFixture<GetTravelsComponent>;

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
      }],
      paths2=[ {
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
        },
        {
          warehouseDeparture : 1,
          warehouseDestination : 3,
          distance : 3,
          travelTime : 4,
          energyNecessary : 5,
          additionalTime : 60
         }];
      
      TestBed.configureTestingModule({
        declarations: [ GetTravelsComponent],
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
    fixture = TestBed.createComponent(GetTravelsComponent);
    component = fixture.componentInstance;
  });

  mockLogisticsService = jasmine.createSpyObj(['getPaths']);

 
  it('should set paths from the service directly', () => {
    mockLogisticsService.getPaths.and.returnValue(of(paths));
    fixture.detectChanges();
    expect(component.paths.length).toBe(2);
  });
  it('should validate paths length', () => {
    mockLogisticsService.getPaths.and.returnValue(of(paths));
    fixture.detectChanges();
    expect(component.paths.length).not.toBe(1);
  });
  it('should validate paths length', () => {
    mockLogisticsService.getPaths.and.returnValue(of(paths));
    fixture.detectChanges();
    expect(component.paths.length).not.toBe(3);
  });
  it('should validate paths length', () => {
    mockLogisticsService.getPaths.and.returnValue(of(paths));
    fixture.detectChanges();
    expect(component.paths.length).not.toBe(4);
  });
  it('should validate paths length', () => {
    mockLogisticsService.getPaths.and.returnValue(of(paths));
    fixture.detectChanges();
    expect(component.paths.length).not.toBe(5);
  });
  it('should validate paths length', () => {
    mockLogisticsService.getPaths.and.returnValue(of(paths));
    fixture.detectChanges();
    expect(component.paths.length).not.toBe(6);
  });
  it('sshould validate paths length', () => {
    mockLogisticsService.getPaths.and.returnValue(of(paths));
    fixture.detectChanges();
    expect(component.paths.length).not.toBe(7);
  });



  
  it('should validate paths length', () => {
    mockLogisticsService.getPaths.and.returnValue(of(paths2));
    fixture.detectChanges();
    expect(component.paths.length).toBe(3);
  });
  it('should validate paths length', () => {
    mockLogisticsService.getPaths.and.returnValue(of(paths2));
    fixture.detectChanges();
    expect(component.paths.length).not.toBe(1);
  });
  it('should validate paths length', () => {
    mockLogisticsService.getPaths.and.returnValue(of(paths2));
    fixture.detectChanges();
    expect(component.paths.length).not.toBe(2);
  });
  it('should validate paths length', () => {
    mockLogisticsService.getPaths.and.returnValue(of(paths2));
    fixture.detectChanges();
    expect(component.paths.length).not.toBe(4);
  });
  it('should validate paths length', () => {
    mockLogisticsService.getPaths.and.returnValue(of(paths2));
    fixture.detectChanges();
    expect(component.paths.length).not.toBe(5);
  });
  it('should validate paths length', () => {
    mockLogisticsService.getPaths.and.returnValue(of(paths2));
    fixture.detectChanges();
    expect(component.paths.length).not.toBe(6);
  });
  it('should validate paths length', () => {
    mockLogisticsService.getPaths.and.returnValue(of(paths2));
    fixture.detectChanges();
    expect(component.paths.length).not.toBe(7);
  });



  it('should set paths from the service directly', () => {
    mockLogisticsService.getPaths.and.returnValue(of(paths2));
    fixture.detectChanges();
    expect(component.paths.length).not.toBeLessThan(3);
  });
  it('should set paths from the service directly', () => {
    mockLogisticsService.getPaths.and.returnValue(of(paths2));
    fixture.detectChanges();
    expect(component.paths.length).not.toBeGreaterThan(3);
  });


  it('should set paths from the service directly', () => {
    mockLogisticsService.getPaths.and.returnValue(of(paths));
    fixture.detectChanges();
    expect(component.paths.length).not.toBeLessThan(2);
  });
  it('should set paths from the service directly', () => {
    mockLogisticsService.getPaths.and.returnValue(of(paths));
    fixture.detectChanges();
    expect(component.paths.length).not.toBeGreaterThan(2);
  });
});
 */