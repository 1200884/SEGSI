import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

import { DeliveryService } from 'src/app/_services/delivery.service';
import { Delivery } from '../../_models/Delivery';

@Component({
  selector: 'app-deliveries',
  templateUrl: './get-deliveries.component.html',
  styleUrls: ['./get-deliveries.component.css']
})
export class DeliveriesComponent implements OnInit {

  page: number=1;
  count:number =0;
  tablesize:number=5;
  tablesizes:any =[5,10,15,20];

  deliveries: Delivery[] = [];
  content ?: string;

  constructor(
    private deliveryService: DeliveryService,
    private location: Location,
    ) { }

  ngOnInit(): void {
    this.getDeliveries();
  }

  goBack(): void {
    this.location.back();
  }

  getDeliveries(): void {
    this.deliveryService.getDeliveries().subscribe(data => {
        this.deliveries = data;
      },
      err => {
        this.content = JSON.parse(err.error).message;
      }
    )
  }

  onTableDataChange(event:any){
    this.page=event;
    this.getDeliveries();
  }

  onTableSizeChange(event:any):void{
    this.tablesize=event.target.value;
    this.page=1;
    this.getDeliveries();
  }
}
