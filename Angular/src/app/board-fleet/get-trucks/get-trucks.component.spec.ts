/*import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Truck } from 'src/app/_models/Truck';
import { FleetService } from 'src/app/_services/fleet.service';
import { GetTrucksComponent } from './get-trucks.component';
import { of } from 'rxjs';

describe('GetTrucksComponent', () => {
  let TRUCKS: Truck[];
  let mockTruckService: any;
  let component: GetTrucksComponent;
  let fixture: ComponentFixture<GetTrucksComponent>;

  beforeEach(async () => {
    TRUCKS = [
      {
        id: "8a4e943c-f40d-4ffa-938b-c38a2acbdcea",
        plate: "AB-CD-00",
        tare: 21,
        maxWeight: 22,
        batteryCapacity: 32,
        truckAutonomy: 32,
        chargeTime: 23,
        active: true
      },
      {
        id: "0cd0578b-1aa0-450e-abdf-3170b168f432",
        plate: "AB-CD-01",
        tare: 1,
        maxWeight: 2,
        batteryCapacity: 5,
        truckAutonomy: 4,
        chargeTime: 2,
        active: true
      }];
    TestBed.configureTestingModule({
      declarations: [GetTrucksComponent],
      providers: [
        {
          provide: FleetService,
          useValue: mockTruckService,
        },
      ]
    })
    fixture = TestBed.createComponent(GetTrucksComponent);
    component = fixture.componentInstance;
  });

  mockTruckService = jasmine.createSpyObj(['getTrucks']);

  it('should set trucks from the service directly', () => {
    mockTruckService.getTrucks.and.returnValue(of(TRUCKS));
    fixture.detectChanges();
    expect(component.trucks.length).toBe(2);
  });
});*/