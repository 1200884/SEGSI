import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { DeliveryService } from 'src/app/_services/delivery.service';
import { Delivery } from '../../_models/Delivery';

@Component({
  selector: 'app-deliveries',
  templateUrl: './get-deliveries.component.html',
  styleUrls: ['./get-deliveries.component.css'],
})
export class DeliveriesComponent implements OnInit  {

  page: number=1;
  count:number =0;
  tablesize:number=5;
  tablesizes:any =[5,10,15,20];
  filterText1 = '';
  filterText2 = '';
  filterText3 = '';

  sortOrder = 'asc';
  deliveries: Delivery[] = [];
  content ?: string;

  constructor(
    private deliveryService: DeliveryService,
    private location: Location,
    ) { }

  ngOnInit(): void {
    this.getDeliveries();
  }

  goBack(): void {
    this.location.back();
  }

  getDeliveries(): void {
    this.deliveryService.getDeliveries().subscribe(data => {
      this.deliveries = data;
      },
      err => {
        this.content = JSON.parse(err.error).message;
      }
    )
  }

  filterDeliveriesById() {
    if (this.filterText1) {
      this.deliveries = this.deliveries.filter(delivery => delivery.id.includes(this.filterText1));
    } else {
      this.getDeliveries();
    }
  }
  filterDeliveriesByDestinationWarehouseId() {
    if (this.filterText2) {
      this.deliveries = this.deliveries.filter(delivery => delivery.destinationWarehouseId.includes(this.filterText2));
    } else {
      this.getDeliveries();
    }
  }
  filterDeliveriesByDate() {
    if (this.filterText3) {
      this.deliveries = this.deliveries.filter(delivery => delivery.date.includes(this.filterText3));
    } else {
      this.getDeliveries();
    }
  }

  onTableDataChange(event:any){
    this.page=event;
    this.getDeliveries();
  }

  onTableSizeChange(event:any):void{
    this.tablesize=event.target.value;
    this.page=1;
    this.getDeliveries();
  }

  sortData(sortBy: any) {
    // Retrieve current value of sortOrder
    const sortOrder = this.sortOrder;

    // Sort the deliveries array by the id property in ascending or descending order
    this.deliveries.sort((a, b) => {
      switch(sortBy) {
        case 'id':
          if (sortOrder === 'asc') {
            return compare(a.id,b.id,true);
          } else {
            return compare(a.id,b.id,false);
          }
        case 'date':
          if (sortOrder === 'asc') {
            return compare(a.date,b.date,true);
          } else {
            return compare(a.date,b.date,false);
          }
        case 'destinationWarehouseId':
          if (sortOrder === 'asc') {
            return compare(a.destinationWarehouseId,b.destinationWarehouseId,true);
          } else {
            return compare(a.destinationWarehouseId,b.destinationWarehouseId,false);
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
