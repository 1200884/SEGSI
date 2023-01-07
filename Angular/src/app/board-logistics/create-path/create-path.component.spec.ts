import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LogisticsService } from 'src/app/_services/logistics.service';
import { CreatePathComponent } from './create-path.component';
import { Path } from 'src/app/_models/Path';
import { of, throwError } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { expect } from '@jest/globals';


describe('CreatePathComponent', () => {
  let mockPathService: any;
  let component: CreatePathComponent;
  let fixture: ComponentFixture<CreatePathComponent>;
  let PATH: Path, NoBusinessRulesPATH: Path
 

  mockPathService = jasmine.createSpyObj(['getPaths','getPath','update','postPath',]);
  beforeEach(async () => {
    PATH =
    {
      warehouseDeparture: 1,
      warehouseDestination: 2,
      distance:3,
      travelTime:4,
      energyNecessary:5,
      additionalTime:6
      },
      NoBusinessRulesPATH={
      warehouseDeparture: 200,
      warehouseDestination: 300,
      distance:-3,
      travelTime:4,
      energyNecessary:5,
      additionalTime:6
      },
     
    TestBed.configureTestingModule({
      declarations: [ CreatePathComponent ],
      imports : [FormsModule],
      providers: [
        {
        provide: LogisticsService,
        useValue: mockPathService,
        },
      ]
    })
    fixture = TestBed.createComponent(CreatePathComponent);
    component = fixture.componentInstance;
  });


  describe('add', () => {
    beforeEach(() => {
      mockPathService.postPath.and.returnValue(of(true));
      component.message = "";
    });
    it('should create the selected Path', () => {
        component.onPathCreate(PATH);
        expect(component.message).toBe("Path Created");
    });
    it('should validate the selected Path aguments', () => {
      component.onPathCreate(PATH);
      expect(PATH.warehouseDeparture).toBe(1);
      expect(PATH.warehouseDeparture).not.toBeLessThan(0);
      expect(PATH.warehouseDeparture).not.toBeGreaterThan(18);
      expect(PATH.warehouseDeparture).toBe(2);
      expect(PATH.warehouseDeparture).not.toBeLessThan(0);
      expect(PATH.warehouseDeparture).not.toBeGreaterThan(18);
      expect(PATH.distance).not.toBeLessThan(0);
      expect(PATH.distance).toBe(3);
      expect(PATH.travelTime).not.toBeLessThan(0);
      expect(PATH.travelTime).toBe(4); 
      expect(PATH.energyNecessary).not.toBeLessThan(0);
      expect(PATH.energyNecessary).toBe(5);
      expect(PATH.additionalTime).not.toBeLessThan(0);
      expect(PATH.additionalTime).toBe(6);
  });

    it('should NOT create the selected Path', () => {
      mockPathService.postPath.and.returnValue(throwError(() => new Error('Mock Error')));
      component.onPathCreate(NoBusinessRulesPATH);
      expect(component.message).toBe("Error creating path");
  });
  })
 
  
});
