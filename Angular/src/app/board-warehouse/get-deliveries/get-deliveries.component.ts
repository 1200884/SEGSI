import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

import { DeliveryService } from 'src/app/_services/delivery.service';
import {Delivery} from '../../_models/Delivery';

@Component({
  selector: 'app-deliveries',
  templateUrl: './get-deliveries.component.html',
  styleUrls: ['./get-deliveries.component.css']
})
export class DeliveriesComponent implements OnInit {
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

}
