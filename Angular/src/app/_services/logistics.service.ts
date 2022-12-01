import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Path } from '../_models/Path';

const API_URL = 'http://localhost:3000/api';
  const PATHS_URL = '/paths';

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
 // public patchPath(info: string): Observable<any> {
   // return this.http.patch(API_URL + PATHS_URL, info, { responseType: 'text'}); }
//  public putPath(info: string): Observable<any> {
  //  return this.http.put(API_URL + PATHS_URL, info, { responseType: 'text'}); }
   postPath(path: any): Observable<Path> {
    console.log(API_URL+PATHS_URL);
    console.log("batata");
    console.log(path);
    return this.http.post<Path>(API_URL+PATHS_URL,path);
  }
}