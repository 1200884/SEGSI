import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { FleetService } from '../_services/fleet.service';
import { Truck } from '../_models/Truck';

@Component({
  selector: 'app-board-fleet',
  templateUrl: './board-fleet.component.html',
  styleUrls: ['./board-fleet.component.css']
})
export class BoardFleetComponent implements OnInit {
  content?: string;
  trucks: Truck[] = [];
  error = false;

  constructor(private userService: UserService, private fleetService: FleetService) { }

  ngOnInit(): void {
  }

  getTrucks(): void {
    this.fleetService.getTrucks().subscribe(
      data => {
        this.error = false;
        this.trucks = data;
      },
      err => {
        this.error = true;
        this.content = JSON.parse(err.error).message;
      }
    )
  }
}
