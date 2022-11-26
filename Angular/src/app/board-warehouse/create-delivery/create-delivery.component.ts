import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

import { DeliveryService } from 'src/app/_services/delivery.service';
import { Delivery } from 'src/app/_models/Delivery';

@Component({
  selector: 'app-create-warehouse',
  templateUrl: './create-delivery.component.html',
  styleUrls: ['./create-delivery.component.css']
})
export class CreateDeliveryComponent implements OnInit {
  message:string | undefined;
  constructor(
    private deliveryService: DeliveryService,
    private location: Location
  ) {}

  ngOnInit(): void {
  }

  goBack(): void {
    this.location.back();
  }

  /*onDeliveryCreate(warehouse: [id: string, description: string, street:string, city:string, country:string,latitude:string,longitude:string]){
    this.warehouseService.addWarehouse(warehouse).subscribe();
  }*/
  onDeliveryCreate(delivery:Delivery){
    this.deliveryService.addDelivery(delivery).subscribe(data=>{this.message="Delivery Created"},err => {
      this.message="Error creating delivery";
    });
  }
}
