import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Path } from '../_models/Path';
import { Planning } from '../_models/Planning';
import { Packaging } from '../_models/Packaging';

const API_URL = 'http://vsgate-s1.dei.isep.ipp.pt:10136/api';
const API_URL_LOCAL = 'http://localhost:2223/api'
const PATHS_URL = '/paths';
const PLANNING_URL = '/planning';
const PACKAGING_URL = '/packaging';

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
  
    console.log(path);
    return this.http.post<Path>(API_URL + PATHS_URL, path);
  }

  getPlanning(truckId: string, date: string): Observable<Planning> {
    return this.http.get<Planning>(API_URL_LOCAL + PLANNING_URL + '/' + truckId + '/' + date, { responseType: 'json' });
  }

  //Packaging packaging
  getPackagings(): Observable<Packaging[]> {
    return this.http.get<Packaging[]>(API_URL + PACKAGING_URL, { responseType: 'json' });
  }

  getPackaging(id: string): Observable<Packaging> {
    return this.http.get<Packaging>(API_URL + PACKAGING_URL + '/' + id, { responseType: 'json'});
  }

  postPackaging(info: any): Observable<Packaging> {
    console.log(info);
    return this.http.post<Packaging>(API_URL + PACKAGING_URL, info);
  }
  putPackaging(info: any): Observable<Packaging> {
    console.log(info);
    return this.http.put<Packaging>(API_URL + PACKAGING_URL, info);
  }
}