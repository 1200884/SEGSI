import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Delivery } from '../../_models/Delivery';
import { DeliveryService } from 'src/app/_services/delivery.service';

@Component({
  selector: 'app-update-delivery',
  templateUrl: './update-delivery.component.html',
  styleUrls: ['./update-delivery.component.css']
})
export class UpdateDeliveryComponent implements OnInit{
  delivery: Delivery | undefined;

  constructor(
    private route: ActivatedRoute,
    private deliveryService: DeliveryService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getDelivery();
  }

  getDelivery(): void {
    const id = String(this.route.snapshot.paramMap.get('id'));
    this.deliveryService.getDelivery(id)
      .subscribe(delivery => this.delivery = delivery);
  }

  goBack(): void {
    this.location.back();
  }

  Save(): void {
    if(this.delivery){
      this.deliveryService.update(this.delivery).subscribe(() => this.goBack());
    }
  }
}
