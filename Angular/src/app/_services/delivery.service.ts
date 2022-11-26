import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Delivery } from '../_models/Delivery';

@Injectable({
  providedIn: 'root'
})
export class DeliveryService {

  private apiUri = "https://localhost:5001/api";
  private Deliveries = "/Deliveries"

  constructor(private http: HttpClient) { }

  getDeliveries(): Observable<Delivery[]> {
    return this.http.get<Delivery[]>(this.apiUri + this.Deliveries,{observe: 'body', responseType: 'json'});
  }

  getDelivery(id: string): Observable<Delivery>{
    return this.http.get<Delivery>(this.apiUri + this.Deliveries + "/" + id);
  }

  update(delivery: Delivery): Observable<any>{
    return this.http.put(this.apiUri+this.Deliveries+ "/" + delivery.id,delivery);
  }

  addDelivery(delivery: any): Observable<Delivery>{
    return this.http.post<Delivery>(this.apiUri+this.Deliveries,delivery);
  }
}
