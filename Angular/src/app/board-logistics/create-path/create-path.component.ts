import { Component, OnInit } from '@angular/core';

import { LogisticsService } from 'src/app/_services/logistics.service';
import { Path } from 'src/app/_models/Path';

@Component({
  selector: 'app-create-path',
  templateUrl: './create-path.component.html',
  styleUrls: ['./create-path.component.css']
})
export class CreatePathComponent implements OnInit {
  
  message:string | undefined;
  constructor(
    
    private logisticsService: LogisticsService
  ) {}

  ngOnInit(): void {
    console.log("8");
  }


  onPathCreate(path:Path){
    console.log("8");
    this.logisticsService.postPath(path).subscribe(data=>{this.message="Path Created"},err => {
        this.message="Error creating path";
      });
    }
}