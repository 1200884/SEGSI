import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Truck } from 'src/app/_models/Truck';
import { FleetService } from 'src/app/_services/fleet.service';

@Component({
  selector: 'app-create-truck',
  templateUrl: './create-truck.component.html',
  styleUrls: ['./create-truck.component.css']
})
export class CreateTruckComponent implements OnInit {

  message: string | undefined;

  constructor(
    private fleetService: FleetService,
    private location: Location
  ) { }

  ngOnInit(): void {
  }

  goBack(): void {
    this.location.back();
  }

  postTruck(truck: Truck): void {
    this.fleetService.postTruck(truck).subscribe(
      data => {
        this.message = "Truck Created";
      },
      err => {
        this.message = "Error creating truck";
      }
    )
  }

}
