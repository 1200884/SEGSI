import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Truck } from '../_models/Truck';

const API_URL = 'http://localhost:3000/api';
const TRUCKS_URL = '/trucks';

@Injectable({
  providedIn: 'root'
})
export class FleetService {

  constructor(private http: HttpClient) { }

  getTrucks(): Observable<Truck[]> {
    return this.http.get<Truck[]>(API_URL + TRUCKS_URL, { responseType: 'json' });
  }

  getTruck(id: string): Observable<Truck> {
    return this.http.get<Truck>(API_URL + TRUCKS_URL + '/' + id, { responseType: 'json'});
  }

  postTruck(info: any): Observable<Truck> {
    return this.http.post<Truck>(API_URL + TRUCKS_URL, info);
  }

  putTruck(info: any): Observable<Truck> {
    return this.http.put<Truck>(API_URL + TRUCKS_URL, info, { responseType: 'json' });
  }

  patchTruck(info: string): Observable<Truck> {
    return this.http.patch<Truck>(API_URL + TRUCKS_URL, info, { responseType: 'json' });
  }
}

