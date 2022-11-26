import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

import { WarehouseService } from 'src/app/_services/warehouse.service';
import { Warehouse } from 'src/app/_models/Warehouse';

@Component({
  selector: 'app-create-warehouse',
  templateUrl: './create-warehouse.component.html',
  styleUrls: ['./create-warehouse.component.css']
})
export class CreateWarehouseComponent implements OnInit {
  message:string | undefined;
  constructor(
    private warehouseService: WarehouseService,
    private location: Location,
  ) {}

  ngOnInit(): void {
  }

  goBack(): void {
    this.location.back();
  }
  /*onWarehouseCreate(warehouse: [id: string, description: string, street:string, city:string, country:string,latitude:string,longitude:string]){
    this.warehouseService.addWarehouse(warehouse).subscribe();
  }*/
  onWarehouseCreate(warehouse:Warehouse){
    this.warehouseService.addWarehouse(warehouse).subscribe(data=>{this.message="Warehouse Created"},err => {
        this.message="Error creating warehouse";
      });
    }
}
