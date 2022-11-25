import { Component, OnInit } from '@angular/core';
import { Truck } from 'src/app/_models/Truck';
import { FleetService } from 'src/app/_services/fleet.service';

@Component({
  selector: 'app-create-truck',
  templateUrl: './create-truck.component.html',
  styleUrls: ['./create-truck.component.css']
})
export class CreateTruckComponent implements OnInit {

  content?: string;
  truck: Truck = {
    id: 'Teste',
    tare: 0,
    maxWeight: 0,
    batteryCapacity: 0,
    truckAutonomy: 0,
    chargeTime: 0
  };
  error = false;

  constructor(private fleetService: FleetService) { }

  ngOnInit(): void {
  }

  postTruck(truck: Truck): void {
    this.fleetService.postTruck(truck).subscribe(
      data => {
        this.error = false;
        this.content = '';
        this.truck = data;
      },
      err => {
        this.error = true;
        this.content = JSON.parse(err.error).message;
      }
    )
  }

}
