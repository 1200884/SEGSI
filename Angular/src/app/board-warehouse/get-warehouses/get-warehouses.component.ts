import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

import { WarehouseService } from 'src/app/_services/warehouse.service';
import {Warehouse} from '../../_models/Warehouse';

@Component({
  selector: 'app-warehouses',
  templateUrl: './get-warehouses.component.html',
  styleUrls: ['./get-warehouses.component.css']
})
export class WarehousesComponent implements OnInit {
  warehouses: Warehouse[] = [];
  content ?: string;
  constructor(private warehouseService: WarehouseService,
              private location: Location) { }

  ngOnInit(): void {
    this.getWarehouses();
  }

  goBack(): void {
    this.location.back();
  }

  getWarehouses(): void {
    this.warehouseService.getWarehouses().subscribe(data => {
      this.warehouses = data;
    },
    err => {
      this.content = JSON.parse(err.error).message;
      }
    )
  }

}
