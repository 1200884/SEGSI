import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

import { DeliveryService } from 'src/app/_services/delivery.service';
import { Delivery } from 'src/app/_models/Delivery';

@Component({
  selector: 'app-create-delivery',
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

  onDeliveryCreate(delivery:Delivery){
    this.deliveryService.addDelivery(delivery).subscribe(data=>{this.message="Delivery Created"},err => {
      this.message="Error creating delivery";
    });
  }
}
