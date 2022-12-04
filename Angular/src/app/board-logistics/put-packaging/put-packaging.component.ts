import { Component, OnInit } from '@angular/core';
import { Packaging } from 'src/app/_models/Packaging';
import { LogisticsService } from 'src/app/_services/logistics.service';

@Component({
  selector: 'app-put-packaging',
  templateUrl: './put-packaging.component.html',
  styleUrls: ['./put-packaging.component.css']
})
export class PutPackagingComponent implements OnInit {
//packaging Packaging
  content?: string;
  packaging: Packaging = {
    id: 'Teste',
    boxId: 0,
    positionX: 0,
    positionY: 0,
    positionZ: 0
  };
  error = false;

  constructor(private logisticsService: LogisticsService) { }

  ngOnInit(): void {
  }

  putPackaging(packaging: Packaging): void {
    this.logisticsService.putPackaging(packaging).subscribe(
      data => {
        this.error = false;
        this.content = '';
        this.packaging = data;
      },
      err => {
        this.error = true;
        this.content = JSON.parse(err.error).message;
      }
    )
  }
}