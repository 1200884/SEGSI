/*import { Component, OnInit } from '@angular/core';

import { LogisticsService } from 'src/app/_services/logistics.service';
import {Path} from '../../_models/Path';

@Component({
  selector: 'app-path',
  templateUrl: './get-path.component.html',
  styleUrls: ['./get-path.component.css']
})
export class GetPathComponent implements OnInit {
  path: Path[] = [];
  content ?: string;
  constructor(private logisticsservice: LogisticsService) { }

  ngOnInit(): void {
    this.getPaths();
  }

  getPaths(): void {
    this.logisticsservice.getPaths().subscribe(data => {
        this.path = data;
      },
      err => {
        this.content = JSON.parse(err.error).message;
      }
    )
  }

}
*/