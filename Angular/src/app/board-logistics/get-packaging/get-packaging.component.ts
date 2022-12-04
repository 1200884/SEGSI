import { Component, OnInit } from '@angular/core';
import { Packaging } from 'src/app/_models/Packaging';
import { LogisticsService } from 'src/app/_services/logistics.service';

@Component({
  selector: 'app-get-packaging',
  templateUrl: './get-packaging.component.html',
  styleUrls: ['./get-packaging.component.css']
})
export class GetPackagingComponent implements OnInit {

  content?: string;
  header?: string;
  body?: string;
  packaging: Packaging | undefined;
  error = false;

  constructor(private logisticsService: LogisticsService) { }

  ngOnInit(): void {
  }

  getPackaging(input: string): void {
    this.logisticsService.getPackaging(input).subscribe(
      data => {
        this.error = false;
        this.packaging = data;
        this.header = "ID: " + this.packaging.id;
        this.body =
          " boxId: " + this.packaging.boxId +
          " positionX: " + this.packaging.positionX +
          " positionY: " + this.packaging.positionY +
          " positionZ: " + this.packaging.positionZ;
      },
      err => {
        this.error = true;
        this.body = JSON.parse(err.error).message;
      }
    )
  }
}

