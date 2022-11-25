import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Warehouse } from '../_models/Warehouse';

@Injectable({
  providedIn: 'root'
})
export class WarehouseService {

  private apiUri = "https://localhost:5001/api";
  private Warehouses = "/Warehouses"

  constructor(private http: HttpClient) { }

  getWarehouses(): Observable<Warehouse[]> {
    return this.http.get<Warehouse[]>(this.apiUri + this.Warehouses,{observe: 'body', responseType: 'json'});
  }

  getWarehouse(id: string): Observable<Warehouse>{
    return this.http.get<Warehouse>(this.apiUri + this.Warehouses + "/" + id);
  }

  update(warehouse: Warehouse): Observable<any>{
    return this.http.put(this.apiUri+this.Warehouses+ "/" + warehouse.id,warehouse);
  }

  addWarehouse(warehouse: any): Observable<Warehouse>{
    return this.http.post<Warehouse>(this.apiUri+this.Warehouses,warehouse);
  }
}
