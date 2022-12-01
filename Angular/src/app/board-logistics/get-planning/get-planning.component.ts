import { Component, OnInit } from '@angular/core';
import { Planning } from 'src/app/_models/Planning';
import { LogisticsService } from 'src/app/_services/logistics.service';

@Component({
  selector: 'app-get-planning',
  templateUrl: './get-planning.component.html',
  styleUrls: ['./get-planning.component.css']
})
export class GetPlanningComponent implements OnInit {

  content?: string;
  planning: Planning = {
    time: 0,
    places: []
  };
  error = false;

  constructor(private logisticsService: LogisticsService) { }

  ngOnInit(): void {
  }

  getPlanning(info: any): void {
    this.logisticsService.getPlanning(info.id, info.date).subscribe(
      data => {
        this.error = false;
        this.content = '';
        this.planning = data;
      },
      err => {
        this.error = true;
        this.content = JSON.parse(err.error).message;
      }
    )
  }
}
