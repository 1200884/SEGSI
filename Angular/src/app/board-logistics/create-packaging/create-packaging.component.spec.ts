import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LogisticsService } from 'src/app/_services/logistics.service';
import { CreatePackagingComponent } from './create-packaging.component';
import { Packaging } from 'src/app/_models/Packaging';
import { of, throwError } from 'rxjs';
import { FormsModule } from '@angular/forms';


describe('CreatePackagingComponent', () => {
  let mockPackagingService: any;
  let component: CreatePackagingComponent;
  let fixture: ComponentFixture<CreatePackagingComponent>;
  let Packaging: Packaging, NoBusinessRulesPackaging: Packaging
 

  mockPackagingService = jasmine.createSpyObj(['getPackagings','getPackaging','update','postPackaging',]);
  beforeEach(async () => {
    Packaging =
    {
      boxId:1,
      id: "1xzy",
      positionX:2,
      positionY:3,
      positionZ:4
      
      },
      NoBusinessRulesPackaging={
        boxId:-1,
          id: "1xzy",
          positionX:-2,
          positionY:-3,
          positionZ:-4
      },
     
    TestBed.configureTestingModule({
      declarations: [ CreatePackagingComponent ],
      imports : [FormsModule],
      providers: [
        {
        provide: LogisticsService,
        useValue: mockPackagingService,
        },
      ]
    })
    fixture = TestBed.createComponent(CreatePackagingComponent);
    component = fixture.componentInstance;
  });


  describe('add', () => {
    beforeEach(() => {
      mockPackagingService.postPackaging.and.returnValue(of(true));
    });
    it('should create the selected Packaging', () => {
        component.postPackaging(Packaging);
        expect(component.content).toBe("Packaging Created");
    });
    it('should validate the selected Packaging aguments', () => {
      component.postPackaging(Packaging);
      expect(Packaging.boxId).toBe(1);
      expect(Packaging.positionX).not.toBeLessThan(0);
      expect(Packaging.positionX).not.toBeGreaterThan(100);
      expect(Packaging.positionX).toBe(2);
      expect(Packaging.positionY).not.toBeLessThan(0);
      expect(Packaging.positionY).not.toBeGreaterThan(100);
      expect(Packaging.positionZ).not.toBeLessThan(0);
      expect(Packaging.positionY).toBe(3);
      expect(Packaging.positionZ).not.toBeGreaterThan(100);
      expect(Packaging.positionZ).not.toBeLessThan(0);
      
  });

    it('should NOT create the selected Packaging', () => {
      mockPackagingService.postPackaging.and.returnValue(throwError(() => new Error('Mock Error')));
      component.postPackaging(NoBusinessRulesPackaging);
      expect(component.error).toBe(true);
  });
  })
 
  
});
