import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Warehouse } from 'src/app/_models/Warehouse';
import { WarehouseService } from 'src/app/_services/warehouse.service';
import { WarehousesComponent } from './get-warehouses.component';
import { of, throwError } from 'rxjs';
import { Location } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { expect } from '@jest/globals';


describe('WarehousesComponent', () => {
  let warehouses: Warehouse[];
  let mockWarehouseService: any;
  let component: WarehousesComponent;
  let fixture: ComponentFixture<WarehousesComponent>;
  let location: Location;

  beforeEach(async () => {
    warehouses =[
      {
        id: "123",
        description: "Arouca",
        street: "Rua de Arouca",
        city: "Porto",
        country: "Portugal",
        latitude: 40.9321,
        longitude: 8.2451,
        altitude: 250.0
      },
      {
        id: "124",
        description: "PORTO",
        street: "Rua de porto",
        city: "Lisboa",
        country: "Portugal",
        latitude: 41.9321,
        longitude: 7.2451,
        altitude: 450.0
      }];
      
      TestBed.configureTestingModule({
        declarations: [ WarehousesComponent],
        imports: [
          NgxPaginationModule,
        ],
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

  mockWarehouseService = jasmine.createSpyObj(['getWarehouses','getEnabledWarehouses','getDisabledWarehouses']);

  describe('ngOnInit', () => {

    it('should set check1 to true and call DisplayAll', () => {
      spyOn(component, 'DisplayAll');
  
      component.ngOnInit();
  
      expect(component.check1).toBeTruthy();
      expect(component.DisplayAll).toHaveBeenCalled();
    });
  });

  describe('DisplayAll', () => {
  
    it('should retrieve and store the list of warehouses', () => {
  
      mockWarehouseService.getWarehouses.and.returnValue(of(warehouses));
  
      component.DisplayAll();
  
      expect(component.warehouses).toEqual(warehouses);
    });
  });

  describe('DisplayEnabled', () => {
  
    it('should retrieve and store the list of enabled warehouses', () => {
  
      mockWarehouseService.getEnabledWarehouses.and.returnValue(of(warehouses));
  
      component.DisplayEnabled();
  
      expect(component.warehouses).toEqual(warehouses);
    });
  });

  describe('DisplayDisabled', () => {
  
    it('should retrieve and store the list of enabled warehouses', () => {
  
      mockWarehouseService.getDisabledWarehouses.and.returnValue(of(warehouses));
  
      component.DisplayDisabled();
  
      expect(component.warehouses).toEqual(warehouses);
    });
  });
  
  describe('DisplayDisabledError', () => {
    it('should throw an error if there is a problem retrieving the disabled warehouses', () => {
      mockWarehouseService.getDisabledWarehouses.and.returnValue(throwError(new Error('error')));
      expect(component.DisplayDisabled).toThrowError();
    });
  });

});
