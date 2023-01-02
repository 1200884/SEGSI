import { Component, OnInit } from '@angular/core';
import { Truck } from 'src/app/_models/Truck';
import { FleetService } from 'src/app/_services/fleet.service';

@Component({
  selector: 'app-get-truck',
  templateUrl: './get-truck.component.html',
  styleUrls: ['./get-truck.component.css']
})
export class GetTruckComponent implements OnInit {

  content?: string;
  header?: string;
  body?: string;
  truck: Truck | undefined;
  error = false;

  constructor(private fleetService: FleetService) { }

  ngOnInit(): void {
  }

  getTruck(input: string): void {
    this.fleetService.getTruck(input).subscribe(
      data => {
        this.error = false;
        this.truck = data;
        this.header = "ID: " + this.truck.id;
        this.body =
          " Plate: " + this.truck.plate +
          " Tare: " + this.truck.tare +
          " Max Weight: " + this.truck.maxWeight +
          " Battery Capacity: " + this.truck.batteryCapacity +
          " Truck Autonomy: " + this.truck.truckAutonomy +
          " Charge Time: " + this.truck.chargeTime;
      },
      err => {
        this.error = true;
        this.body = JSON.parse(err.error).message;
      }
    )
  }
}

