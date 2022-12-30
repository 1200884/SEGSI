import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Warehouse } from '../_models/Warehouse';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WarehouseService {

  //private apiUri = "https://localhost:5001/api";
  //private Warehouses = "/Warehouses"
  ipAddress = '';
  constructor(private http: HttpClient) { }

  getWarehouses(): Observable<Warehouse[]> {
    return this.http.get<Warehouse[]>(environment.WAREHOUSE_URL_LOCAL + environment.WAREHOUSES_URL, { observe: 'body', responseType: 'json' });
  }

  getWarehouse(id: string): Observable<Warehouse> {
    return this.http.get<Warehouse>(environment.WAREHOUSE_URL_LOCAL + environment.WAREHOUSES_URL + "/" + id);
  }

  update(warehouse: Warehouse): Observable<any> {
    return this.http.put(environment.WAREHOUSE_URL_LOCAL + environment.WAREHOUSES_URL + "/" + warehouse.id, warehouse);
  }

  addWarehouse(warehouse: any): Observable<Warehouse> {
    return this.http.post<Warehouse>(environment.WAREHOUSE_URL_LOCAL + environment.WAREHOUSES_URL, warehouse);
  }
}
