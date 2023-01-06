import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { LogisticsService } from 'src/app/_services/logistics.service';
import { Packaging } from 'src/app/_models/Packaging';

@Component({
  selector: 'app-get-packagings',
  templateUrl: './get-packagings.component.html',
  styleUrls: ['./get-packagings.component.css']
})
export class GetPackagingsComponent implements OnInit {

  page: number=1;
  count:number =0;
  tablesize:number=5;
  tablesizes:any =[5,10,15,20];

  sortOrder = 'asc';
  packagings: Packaging[] = [];
  content ?: string;

  constructor(
    private logisticsService: LogisticsService,
    private location: Location
    ) { }

  ngOnInit(): void {
    this.getPackagings();
  }

  goBack(): void {
    this.location.back();
  }

  getPackagings(): void {
    this.logisticsService.getPackagings().subscribe(
      data=> {
        this.packagings = data;
      },
      err => {
        this.content = JSON.parse(err.error).message;
      }
    )
  }

  
  onTableDataChange(event:any){
    this.page=event;
    this.getPackagings();
  }

  onTableSizeChange(event:any):void{
    this.tablesize=event.target.value;
    this.page=1;0
    this.getPackagings();
  }

  sortData(sortBy: any) {
    // Retrieve current value of sortOrder
    const sortOrder = this.sortOrder;

    // Sort the deliveries array by the id property in ascending or descending order
    this.packagings.sort((a, b) => {
      switch(sortBy) {
        case 'id':
          if (sortOrder === 'asc') {
            return compare(a.id,b.id,true);
          } else {
            return compare(a.id,b.id,false);
          }
        case 'boxId':
          if (sortOrder === 'asc') {
            return compare(a.boxId,b.boxId,true);
          } else {
            return compare(a.boxId,b.boxId,false);
          }
        case 'positionX':
          if (sortOrder === 'asc') {
            return compare(a.positionX,b.positionX,true);
          } else {
            return compare(a.positionX,b.positionX,false);
          }
        case 'positionY':
          if (sortOrder === 'asc') {
            return compare(a.positionY,b.positionY,true);
          } else {
            return compare(a.positionY,b.positionY,false);
          }
        case 'positionZ':
          if (sortOrder === 'asc') {
            return compare(a.positionZ,b.positionZ,true);
          } else {
            return compare(a.positionZ,b.positionZ,false);
          }    
          default: return 0; 
        }
      
    });

    // Toggle the value of sortOrder between 'asc' and 'desc'
    this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
  }
} 
function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
