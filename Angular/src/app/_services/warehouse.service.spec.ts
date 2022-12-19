import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { WarehouseService } from './warehouse.service';
import { of } from 'rxjs';

describe('WarehouseService', () => {
  let service: WarehouseService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let WAREHOUSE = {
    id: "125",
      description: "Arouca",
      street: "Rua de Arouca",
      city: "Porto",
      country: "Portugal",
      latitude: 40.9321,
      longitude: 8.2451,
      altitude: 250.0
  }
  let WAREHOUSES =[
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
  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get','post']);
    service = new WarehouseService(httpClientSpy);
  });

  describe('getWarehouses()', () => {
    it('should return expected warehouses when getWarehouse is called', (done: DoneFn)=>{
      httpClientSpy.get.and.returnValue(of(WAREHOUSES));
      service.getWarehouses().subscribe({
        next: (warehouses) => {
          expect(warehouses).toEqual(WAREHOUSES);
          done();
        },
        error: () => {},
      });
      expect(httpClientSpy.get).toHaveBeenCalledTimes(1);
    })
  })
});