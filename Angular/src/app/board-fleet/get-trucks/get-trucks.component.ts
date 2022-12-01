import { Component, OnInit } from '@angular/core';
import { Truck } from 'src/app/_models/Truck';
import { FleetService } from 'src/app/_services/fleet.service';

@Component({
  selector: 'app-get-trucks',
  templateUrl: './get-trucks.component.html',
  styleUrls: ['./get-trucks.component.css']
})
export class GetTrucksComponent implements OnInit {

  trucks: Truck[] = [];
  content ?: string;

  constructor(private fleetService: FleetService) { }

  ngOnInit(): void {
    this.getTrucks();
  }

  getTrucks(): void {
    this.fleetService.getTrucks().subscribe(
      data=> {
        this.trucks = data;
      },
      err => {
        this.content = JSON.parse(err.error).message;
      }
    )
  }

}
