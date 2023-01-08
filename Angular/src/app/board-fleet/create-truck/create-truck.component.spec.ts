import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FleetService } from 'src/app/_services/fleet.service';
import { CreateTruckComponent } from './create-truck.component';
import { Truck } from 'src/app/_models/Truck';
import { of, throwError } from 'rxjs';
import { FormsModule } from '@angular/forms';


describe('CreateTruckComponent', () => {
  let mockFleetService: any;
  let component: CreateTruckComponent;
  let fixture: ComponentFixture<CreateTruckComponent>;
  let Truck: Truck, NoBusinessRulesTruck: Truck
 

  mockFleetService = jasmine.createSpyObj(['getTrucks','getTruck','update','postTruck',]);
  beforeEach(async () => {
    Truck =
    {
      id: "000adannas3",
      plate: "xx-00-yy",
      tare: 50,
      maxWeight: 51,
      batteryCapacity: 52,
      truckAutonomy: 53,
      chargeTime: 54,
      active: true
      },
      NoBusinessRulesTruck={
        id: "100adannas3",
        plate: "zz-00-yy",
        tare: -50,
        maxWeight: -51,
        batteryCapacity: -52,
        truckAutonomy: -53,
        chargeTime: -54,
        active: true
      },
     
    TestBed.configureTestingModule({
      declarations: [ CreateTruckComponent ],
      imports : [FormsModule],
      providers: [
        {
        provide: FleetService,
        useValue: mockFleetService,
        },
      ]
    })
    fixture = TestBed.createComponent(CreateTruckComponent);
    component = fixture.componentInstance;
  });


  describe('add', () => {
    beforeEach(() => {
      mockFleetService.postTruck.and.returnValue(of(true));
      component.message = "";
    });
    it('should create the selected Truck', () => {
        component.postTruck(Truck);
        expect(component.message).toBe("Truck Created");
    });
    it('should validate the selected Truck aguments', () => {
      component.postTruck(Truck);
      expect(Truck.id).toBe("000adannas3");
      expect(Truck.tare).toBe(50);
      expect(Truck.tare).not.toBeLessThan(0);
      expect(Truck.maxWeight).toBe(51);
      expect(Truck.batteryCapacity).toBe(52); 
      expect(Truck.truckAutonomy).not.toBeLessThan(0);
      expect(Truck.truckAutonomy).toBe(53);
      expect(Truck.chargeTime).not.toBeLessThan(0);
      expect(Truck.chargeTime).toBe(54);
      expect(Truck.active).toBeTrue();
  });

    it('should NOT create the selected Truck', () => {
      mockFleetService.postPath.and.returnValue(throwError(() => new Error('Mock Error')));
      component.postTruck(NoBusinessRulesTruck);
      expect(component.message).toBe("Error creating truck");
  });
  })
 
  
});
