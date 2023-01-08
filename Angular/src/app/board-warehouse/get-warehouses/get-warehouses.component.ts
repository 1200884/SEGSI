import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { WarehouseService } from 'src/app/_services/warehouse.service';
import {Warehouse} from '../../_models/Warehouse';

@Component({
  selector: 'app-warehouses',
  templateUrl: './get-warehouses.component.html',
  styleUrls: ['./get-warehouses.component.css'],
})
export class WarehousesComponent implements OnInit {
  warehouses: Warehouse[] = [];
  content ?: string;
  check1 = false;
  check2 = false;
  check3 = false;
  page: number=1;
  count:number =0;
  tablesize:number=5;
  tablesizes:any=[5,10,15];
  constructor(private warehouseService: WarehouseService,
              private location: Location) { }

  ngOnInit(): void {
    this.check1=true;
    this.DisplayAll();
  }

  goBack(): void {
    this.location.back();
  }

  DisplayAll(){
    this.warehouses=[];
    this.check2=false;
    this.check3=false;
    this.warehouseService.getWarehouses().subscribe(data => {
      this.warehouses = data;
    },
    err => {
      this.content = JSON.parse(err.error).message;
      }
    )
  }

  DisplayEnabled(){
    this.warehouses=[];
    this.check1=false;
    this.check3=false;
    this.warehouseService.getEnabledWarehouses().subscribe(data => {
      this.warehouses = data;
    },
    err => {
      this.content = JSON.parse(err.error).message;
      }
    )
  }

  DisplayDisabled(){
    this.warehouses=[];
    this.check1=false;
    this.check2=false;
    this.warehouseService.getDisabledWarehouses().subscribe(data => {
      this.warehouses = data;
    },
    err => {
      this.content = JSON.parse(err.error).message;
      }
    )
  }

  onTableDataChange(event:any){
    this.page=event;
  }
  onTableSizeChange(event:any):void{
    this.tablesize=event.target.value;
    this.page=1;
  }

}
