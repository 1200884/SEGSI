import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Delivery } from '../../_models/Delivery';
import { DeliveryService } from '../../_services/delivery.service'
import { DeliveriesComponent } from './get-deliveries.component';
import { of, throwError } from 'rxjs';
import { Location } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { environment } from 'src/environments/environment';

describe('DeliveriesComponent', () => {
  let deliveries: Delivery[];
  let mockDeliveryService: any;
  let component: DeliveriesComponent;
  let fixture: ComponentFixture<DeliveriesComponent>;
  let location: Location;

  beforeEach(async () => {
    deliveries= [
      {
          "id": "1",
          "date": "2023-10-10T00:00:00",
          "weight": 3.0,
          "destinationWarehouseId": "1",
          "loadTime": 1,
          "unloadTime": 2
      },
      {
          "id": "2",
          "date": "2023-11-10T00:00:00",
          "weight": 4.0,
          "destinationWarehouseId": "2",
          "loadTime": 5,
          "unloadTime": 6
      }],

    TestBed.configureTestingModule({
      declarations: [DeliveriesComponent],
      imports: [
        NgxPaginationModule,
      ],
      providers: [
        {
          provide: DeliveryService,
          useValue: mockDeliveryService,
        },
      ]
    })
    fixture = TestBed.createComponent(DeliveriesComponent);
    component = fixture.componentInstance;
  });

  mockDeliveryService = jasmine.createSpyObj(['getDeliveries']);

  describe('ngOnInit', () => {

    it('it should call getDeliveries', () => {
      spyOn(component, 'getDeliveries');

      component.ngOnInit();

      expect(component.getDeliveries).toHaveBeenCalled();
    });
  });

  describe('getDeliveries', () => {

    it('should retrieve and store the list of deliveries', () => {

      mockDeliveryService.getDeliveries.and.returnValue(of(deliveries));

      component.getDeliveries();

      expect(component.deliveries).toEqual(deliveries);
    });
  });

});

