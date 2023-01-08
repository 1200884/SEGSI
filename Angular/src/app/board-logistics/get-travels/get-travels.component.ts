import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LogisticsService } from 'src/app/_services/logistics.service';
import {Travel} from '../../_models/Travel';

@Component({
  selector: 'app-path',
  templateUrl: './get-travels.component.html',
  styleUrls: ['./get-travels.component.css']
})
export class GetTravelsComponent implements OnInit {

  title = 'pagination';
  POSTS: any;
  page: number=1;
  count:number =0;
  tablesize:number=5;
  tablesizes:any =[5,10,15,20];
  filterText1 = '';
  filterText2 = '';
  sortOrder = 'asc';
  travels: Travel[] = [];
  content ?: string;
  constructor(private logisticsservice: LogisticsService) { }

  ngOnInit(): void {
    this.getTravels();
  }
  getTravels(): void {
    this.logisticsservice.getTravels().subscribe(data => {
    
        this.travels = data;
        console.log(data);
      },
      
      err => {
        this.content = JSON.parse(err.error).message;
      }
    )
  }

  filterTravelsByDate() {
    if (this.filterText1) {
      this.travels = this.travels.filter(travel => travel.date.includes(this.filterText1));
    } else {
      this.getTravels();
    }
  }

  onTableDataChange(event:any){
    this.page=event;
    this.getTravels();
  }
  onTableSizeChange(event:any):void{
    this.tablesize=event.target.value;
    this.page=1;
    this.getTravels();
  }

  sortData(sortBy: any) {
    // Retrieve current value of sortOrder
    const sortOrder = this.sortOrder;

    // Sort the deliveries array by the id property in ascending or descending order
    this.travels.sort((a, b) => {
      switch(sortBy) {
        case 'date':
          if (sortOrder === 'asc') {
            return compare(a.date,b.date,true);
          } else {
            return compare(a.date,b.date,false);
          }
        case 'delivery':
          if (sortOrder === 'asc') {
            return compare(a.date,b.date,true);
          } else {
            return compare(a.date,b.date,false);
          }
          default: return 0; 
        }
      
    });
    this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
  }
} 
function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}


