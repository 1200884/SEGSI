import { Component, OnInit } from '@angular/core';
import { WarehouseService } from 'src/app/_services/warehouse.service';
import { Warehouse } from '../_models/Warehouse';

@Component({
  selector: 'app-board-warehouse',
  templateUrl: './board-warehouse.component.html',
  styleUrls: ['./board-warehouse.component.css']
})
export class BoardWarehouseComponent implements OnInit {
  title = 'Warehouse Manager Board';
  warehouses: Warehouse[] = [];
  content ?: string;
  constructor(private warehouseService: WarehouseService) { }

  ngOnInit(): void {
  }
  redirect(){
    window.location.href = "http://127.0.0.1:5555/src/app/Graphical-View/canvas.html";
  }
}
