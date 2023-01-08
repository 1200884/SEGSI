import { TestBed } from '@angular/core/testing';
import { FleetService } from 'src/app/_services/fleet.service';
import { GetTrucksComponent } from './get-trucks.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { NgxPaginationModule } from 'ngx-pagination';
import { environment } from 'src/environments/environment';

describe('ServiceAndComponent Trucks', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,NgxPaginationModule],
      declarations: [GetTrucksComponent],
      providers: [GetTrucksComponent, FleetService]
    });
  });
  let component: GetTrucksComponent;
  let service: FleetService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    component = TestBed.get(GetTrucksComponent);
    service = TestBed.get(FleetService);
    httpMock = TestBed.get(HttpTestingController);
  });
  const mockTrucks = [
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

  it('should retrieve a list of trucks from the server', () => {
    component.getTrucks();

    const req = httpMock.expectOne(environment.LOGISTICS_URL_LOCAL + environment.TRUCKS_URL);
    expect(req.request.method).toEqual('GET');
    req.flush(mockTrucks);

    expect(component.trucks).toEqual(mockTrucks);
  });
  it('should generate an error when retrieving a list of trucks from the server', () => {
    component.getTrucks();

    const req = httpMock.expectOne(environment.LOGISTICS_URL_LOCAL + environment.TRUCKS_URL);
    expect(req.request.method).toEqual('GET');
    req.flush(new Error('Error geting all trucks'));

    expect(component.getTrucks).toThrowError();
  });

  it('should retrieve a list of active trucks from the server', () => {
    component.getActiveTrucks();

    const req = httpMock.expectOne(environment.LOGISTICS_URL_LOCAL + environment.TRUCKS_URL + "/enabled");
    expect(req.request.method).toEqual('GET');
    req.flush(mockTrucks);

    expect(component.trucks).toEqual(mockTrucks);
  });
  it('should generate an error when retrieving active trucks', () => {
    component.getActiveTrucks();

    const req = httpMock.expectOne(environment.LOGISTICS_URL_LOCAL + environment.TRUCKS_URL + "/enabled");
    expect(req.request.method).toEqual('GET');
    req.flush(new Error('Error geting active trucks'));

    expect(component.getActiveTrucks).toThrowError();
  });

  it('should retrieve a list of inactive trucks from the server', () => {
    component.getInactiveTrucks();

    const req = httpMock.expectOne(environment.LOGISTICS_URL_LOCAL + environment.TRUCKS_URL + "/disabled");
    expect(req.request.method).toEqual('GET');
    req.flush(mockTrucks);

    expect(component.trucks).toEqual(mockTrucks);
  });
  it('should generate an error when retrieving inactive trucks', () => {
    component.getInactiveTrucks();

    const req = httpMock.expectOne(environment.LOGISTICS_URL_LOCAL + environment.TRUCKS_URL + "/disabled");
    expect(req.request.method).toEqual('GET');
    req.flush(new Error('Error geting inactive trucks'));

    expect(component.getInactiveTrucks).toThrowError();
  });
});
