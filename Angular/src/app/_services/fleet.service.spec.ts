import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs'
import { TestBed } from '@angular/core/testing';

import { FleetService } from './fleet.service';

describe('FleetService', () => {
  let service: FleetService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let TRUCKS =[
    {
      id: "8a4e943c-f40d-4ffa-938b-c38a2acbdcea",
      tare: 21,
      maxWeight: 22,
      batteryCapacity: 32,
      truckAutonomy: 32,
      chargeTime: 23
    },
    {
      id: "0cd0578b-1aa0-450e-abdf-3170b168f432",
      tare: 1,
      maxWeight: 2,
      batteryCapacity: 5,
      truckAutonomy: 4,
      chargeTime: 2
    }];

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    service = new FleetService(httpClientSpy);
  });

  describe('getTrucks()', () => {
    it('it should return expected trucks when called', (done: DoneFn) => {
      httpClientSpy.get.and.returnValue(of(TRUCKS));
      service.getTrucks().subscribe( {
        next: (trucks) => {
            expect(trucks).toEqual(TRUCKS);
            done();
        },
        error: () => {
          done.fail;
        },
      });
      expect(httpClientSpy.get).toHaveBeenCalledTimes(1);
    })
  })
});
