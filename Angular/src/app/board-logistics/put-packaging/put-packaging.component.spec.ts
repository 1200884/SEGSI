/*import { TestBed } from '@angular/core/testing';
import { PutPackagingComponent } from './put-packaging.component';
import { LogisticsService } from 'src/app/_services/logistics.service';
import { of } from 'rxjs';
import { Packaging } from 'src/app/_models/Packaging';

describe('PutPackagingComponent', () => {
  let component: PutPackagingComponent;
  let logisticsService: LogisticsService;
  let packaging: Packaging[];

  beforeEach(async () => {
    packaging = {
      id: '123123',
      boxId: 0,
      positionX: 0,
      positionY: 0,
      positionZ: 0
    };
    TestBed.configureTestingModule({
      providers: [
        PutPackagingComponent,
        { provide: LogisticsService, useValue: { putPackaging: () => of({}) } },
      ]
    });

    component = TestBed.inject(PutPackagingComponent);
    logisticsService = TestBed.inject(LogisticsService);
  });

  it('should call logisticsService.putPackaging() with the correct argument when putPackaging() is called', () => {
    const packaging: Packaging = {
      id: 'Teste',
      boxId: 0,
      positionX: 0,
      positionY: 0,
      positionZ: 0
    };
    spyOn(logisticsService, 'putPackaging').and.callThrough();
    component.putPackaging(packaging);
    expect(logisticsService.putPackaging).toHaveBeenCalledWith(packaging);
  });
});*/