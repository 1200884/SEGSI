import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Warehouse } from 'src/app/_models/Warehouse';
import { WarehouseService } from 'src/app/_services/warehouse.service';
import { WarehousesComponent } from './get-warehouses.component';
import { of } from 'rxjs';

describe('WarehousesComponent', () => {
  let WAREHOUSES: Warehouse[];
  let mockWarehouseService: any;
  let component: WarehousesComponent;
  let fixture: ComponentFixture<WarehousesComponent>;

  beforeEach(async () => {
    WAREHOUSES =[
      {
        id: 123,
        description: "Arouca",
        street: "Rua de Arouca",
        city: "Porto",
        country: "Portugal",
        latitude: 40.9321,
        longitude: 8.2451,
        altitude: 250.0
      },
      {
        id: 124,
        description: "PORTO",
        street: "Rua de porto",
        city: "Lisboa",
        country: "Portugal",
        latitude: 41.9321,
        longitude: 7.2451,
        altitude: 450.0
      }];
    TestBed.configureTestingModule({
      declarations: [ WarehousesComponent ],
      providers: [
        {
        provide: WarehouseService,
        useValue: mockWarehouseService,
        },
      ]
    })
    fixture = TestBed.createComponent(WarehousesComponent);
    component = fixture.componentInstance;
  });

  mockWarehouseService = jasmine.createSpyObj(['getWarehouses']);

  it('should set warehouses from the service directly', () => {
    mockWarehouseService.getWarehouses.and.returnValue(of(WAREHOUSES));
    fixture.detectChanges();
    expect(component.warehouses.length).toBe(2);
  });
});
