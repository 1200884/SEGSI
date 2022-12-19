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
  ipAddress = '';
  constructor(private http: HttpClient) { }

  getWarehouses(): Observable<Warehouse[]> {
    return this.http.get<Warehouse[]>(this.apiUri + this.Warehouses,{observe: 'body', responseType: 'json'});
  }

  getDisabledWarehouses(): Observable<Warehouse[]> {
    return this.http.get<Warehouse[]>(this.apiUri + this.Warehouses + "/Disabled",{observe: 'body', responseType: 'json'});
  }

  getEnabledWarehouses(): Observable<Warehouse[]> {
    return this.http.get<Warehouse[]>(this.apiUri + this.Warehouses + "/Enabled",{observe: 'body', responseType: 'json'});
  }

  getWarehouse(id: string): Observable<Warehouse>{
    return this.http.get<Warehouse>(this.apiUri + this.Warehouses + "/" + id);
  }

  update(warehouse: Warehouse): Observable<any>{
    return this.http.put(this.apiUri+this.Warehouses+ "/" + warehouse.id,warehouse);
  }

  disable(id: string): Observable<Warehouse>{
    return this.http.delete<Warehouse>(this.apiUri + this.Warehouses + "/" + id);
  }

  enable(id: string): Observable<any>{
    return this.http.patch(this.apiUri + this.Warehouses + "/" + id,null);
  }

  addWarehouse(warehouse: any): Observable<Warehouse>{
    return this.http.post<Warehouse>(this.apiUri+this.Warehouses,warehouse);
  }
}
