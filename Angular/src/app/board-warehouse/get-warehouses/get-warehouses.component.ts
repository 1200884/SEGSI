import { Component, OnInit } from '@angular/core';

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
  constructor(private warehouseService: WarehouseService) { }

  ngOnInit(): void {
    this.getWarehouses();
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