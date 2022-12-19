import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Warehouse } from '../../_models/Warehouse';
import { WarehouseService } from 'src/app/_services/warehouse.service';

@Component({
  selector: 'app-update-warehouse',
  templateUrl: './update-warehouse.component.html',
  styleUrls: ['./update-warehouse.component.css']
})
export class UpdateWarehouseComponent implements OnInit{
  warehouse: Warehouse | undefined;
  message:string | undefined;
  disable:string | undefined;
  message2:boolean | undefined;
  constructor(
    private route: ActivatedRoute,
    private warehouseService: WarehouseService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getWarehouse();
  }

  getWarehouse(): void {
    const id = String(this.route.snapshot.paramMap.get('id'));
    this.disable = String(this.route.snapshot.paramMap.get('check3'));
    if(this.disable=="true"){
      this.message2=true;
    }else{
      this.message2=false;
    }
    this.warehouseService.getWarehouse(id)
      .subscribe(warehouse => this.warehouse = warehouse);
  }

  goBack(): void {
    this.location.back();
  }

  Save(): void {
    if(this.warehouse){    
      this.warehouseService.update(this.warehouse).subscribe(() => this.goBack());
    }
  }

  Disable(): void {
    if(this.warehouse){    
      this.warehouseService.disable(this.warehouse.id).subscribe(data=>{this.message="Warehouse Disabled"});
    }
  }

  Enable(): void {
    if(this.warehouse){    
      this.warehouseService.enable(this.warehouse.id).subscribe(data=>{this.message="Warehouse Enabled"});
    }
  }

}
