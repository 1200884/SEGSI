import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LogisticsService } from 'src/app/_services/logistics.service';
import {Path} from '../../_models/Path';

@Component({
  selector: 'app-path',
  templateUrl: './get-paths.component.html',
  styleUrls: ['./get-paths.component.css']
})
export class GetPathsComponent implements OnInit {

  title = 'pagination';
  POSTS: any;
  page: number=1;
  count:number =0;
  tablesize:number=5;
  tablesizes:any =[5,10,15,20];

  paths: Path[] = [];
  content ?: string;
  constructor(private logisticsservice: LogisticsService) { }

  ngOnInit(): void {
    this.getPaths();
  }
  getPaths(): void {
    this.logisticsservice.getPaths().subscribe(data => {
    
        this.paths = data;
      },
      
      err => {
        this.content = JSON.parse(err.error).message;
      }
    )
  }


  onTableDataChange(event:any){
    this.page=event;
    this.getPaths();
  }
  onTableSizeChange(event:any):void{
    this.tablesize=event.target.value;
    this.page=1;
    this.getPaths();
  }



}
