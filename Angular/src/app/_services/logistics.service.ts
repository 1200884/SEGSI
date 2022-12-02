import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Path } from '../_models/Path';
import { Planning } from '../_models/Planning';

const API_URL = 'http://vsgate-s1.dei.isep.ipp.pt:10775/api';
const PATHS_URL = '/paths';
const PLANNING_URL = '/planning';

@Injectable({
  providedIn: 'root'
})
export class LogisticsService {

  constructor(private http: HttpClient) { }

  getPaths(): Observable<Path[]> {
    return this.http.get<Path[]>(API_URL + PATHS_URL, { responseType: 'json' });
  }
  public getSpecificPath(id: string): Observable<any> {
    return this.http.get(API_URL + PATHS_URL + '/' + id, { responseType: 'text'});
  }

  postPath(path: any): Observable<Path> {
    console.log(API_URL + PATHS_URL);
    console.log("batata");
    console.log(path);
    return this.http.post<Path>(API_URL + PATHS_URL, path);
  }

  getPlanning(truckId: string, date: string): Observable<Planning> {
    console.log(truckId);
    console.log(date);
    return this.http.get<Planning>(API_URL + PLANNING_URL + '/' + truckId + '/' + date, { responseType: 'json' });
  }
}