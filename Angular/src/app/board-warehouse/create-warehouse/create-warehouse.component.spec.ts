import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WarehouseService } from 'src/app/_services/warehouse.service';
import { CreateWarehouseComponent } from './create-warehouse.component';
import { Warehouse } from 'src/app/_models/Warehouse';
import {of,throwError } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { expect } from '@jest/globals';


describe('CreateWarehouseComponent', () => {
  let mockWarehouseService: any;
  let component: CreateWarehouseComponent;
  let fixture: ComponentFixture<CreateWarehouseComponent>;
  let WAREHOUSE: Warehouse;

  mockWarehouseService = jasmine.createSpyObj(['getWarehouses','getWarehouse','update','addWarehouse',]);
  beforeEach(async () => {
    WAREHOUSE =
    {
        id: "123",
        description: "Arouca",
        street: "Rua de Arouca",
        city: "Porto",
        country: "Portugal",
        latitude: 40.9321,
        longitude: 8.2451,
        altitude: 250.0
      };
    TestBed.configureTestingModule({
      declarations: [ CreateWarehouseComponent ],
      imports : [FormsModule],
      providers: [
        {
        provide: WarehouseService,
        useValue: mockWarehouseService,
        },
      ]
    })
    fixture = TestBed.createComponent(CreateWarehouseComponent);
    component = fixture.componentInstance;
  });

  describe('add', () => {
    beforeEach(() => {
      mockWarehouseService.addWarehouse.and.returnValue(of(WAREHOUSE));
      component.message = "";
    });
    it('should create the selected Warehouse', () => {
        component.onWarehouseCreate(WAREHOUSE);
        expect(component.message).toBe("Warehouse Created");
    });
    it('should not create the Warehouse', () => {
      mockWarehouseService.addWarehouse.and.returnValue(throwError(() => new Error('Mock Error')));
      component.message = "";
      component.onWarehouseCreate(WAREHOUSE);
      expect(component.message).toBe("Error creating warehouse");
  });
  })
});