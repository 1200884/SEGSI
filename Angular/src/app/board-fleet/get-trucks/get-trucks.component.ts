import { Location } from '@angular/common';
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
  checkbox1 = true;
  checkbox2 = false;
  checkbox3 = false;
  page: number=1;
  count:number =0;
  tablesize:number=10;
  tablesizes:any =[5,10,15];
  constructor(private fleetService: FleetService,
              private location: Location) { }

  ngOnInit(): void {
    this.getTrucks();
  }

  goBack(): void {
    this.location.back();
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

  getActiveTrucks(): void {
    this.fleetService.getActiveTrucks().subscribe(
      data=> {
        this.trucks = data;
      },
      err => {
        this.content = JSON.parse(err.error).message;
      }
    )
  }

  getInactiveTrucks(): void {
    this.fleetService.getInactiveTrucks().subscribe(
      data => {
        this.trucks = data;
      },
      err => {
        this.content = JSON.parse(err.error).message;
      }
    )
  }

  uncheckOthers(selected: number): void {
    if (selected !== 1) {
      this.checkbox1 = false;
    }
    if (selected !== 2) {
      this.checkbox2 = false;
    }
    if (selected !== 3) {
      this.checkbox3 = false;
    }
  }

  updateList(): void {
    if(this.checkbox1) {
      this.getTrucks();
    }
    else if(this.checkbox2) {
      this.getActiveTrucks();
    }
    else if(this.checkbox3) {
      this.getInactiveTrucks();
    }
  }

  onTableDataChange(event:any){
    this.page=event;
  }
  onTableSizeChange(event:any):void{
    this.tablesize=event.target.value;
    this.page=1;
  }  
}
