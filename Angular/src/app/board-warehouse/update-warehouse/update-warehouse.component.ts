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
}
