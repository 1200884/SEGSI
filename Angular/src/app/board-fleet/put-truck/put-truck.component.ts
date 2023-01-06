import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Truck } from 'src/app/_models/Truck';
import { FleetService } from 'src/app/_services/fleet.service';

@Component({
  selector: 'app-put-truck',
  templateUrl: './put-truck.component.html',
  styleUrls: ['./put-truck.component.css']
})
export class PutTruckComponent implements OnInit {
  @ViewChild('myButton', { static: true }) button: any;
  buttonText = 'Disable';
  truck: Truck | undefined;

  constructor(
    private route: ActivatedRoute,
    private fleetService: FleetService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getTruck();
  }

  getTruck(): void {
    const id = String(this.route.snapshot.paramMap.get('id'));
    this.fleetService.getTruck(id).subscribe(
      truck => {
        this.truck = truck;
        this.changeButton();
      });
  }

  patchTruck(givenTruck: Truck): void {
    this.fleetService.patchTruck(givenTruck).subscribe(
      truck => {
        this.truck = truck;
        this.changeButton();
      }
    )
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.truck) {
      this.fleetService.putTruck(this.truck).subscribe(
        () => this.goBack()
      );
    }
  }

  updateTruck(): void {
    if (this.truck) {
      let newTruck: Truck;
      newTruck = {
        id: this.truck.id,
        plate: this.truck.plate,
        active: false
      }
      if (this.buttonText == 'Disable') {
        this.patchTruck(newTruck);
      }
      else if (this.buttonText == 'Enable') {
        newTruck.active = true;
        this.patchTruck(newTruck);
      }
    }
  }

  changeButton(): void {
    if (this.truck) {
      if (this.truck.active) {
        this.buttonText = 'Disable';
      }
      else {
        this.buttonText = 'Enable'
      }
    }
  }
}