import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Path } from '../_models/Path';
import { Planning } from '../_models/Planning';
import { Packaging } from '../_models/Packaging';
import { environment } from 'src/environments/environment';
import { GeneticPlanning } from '../_models/GeneticPlanning';

//const API_URL = 'http://vsgate-s1.dei.isep.ipp.pt:10136/api';
//const PATHS_URL = '/paths';
//const PLANNING_URL = '/planning';
//const PACKAGING_URL = '/packaging';

@Injectable({
  providedIn: 'root'
})
export class LogisticsService {

  constructor(private http: HttpClient) { }

  getPaths(): Observable<Path[]> {
    return this.http.get<Path[]>(environment.LOGISTICS_URL + environment.PATHS_URL, { responseType: 'json' });
  }
  public getSpecificPath(id: string): Observable<any> {
    return this.http.get(environment.LOGISTICS_URL + environment.PATHS_URL + '/' + id, { responseType: 'text'});
  }

  postPath(path: any): Observable<Path> {
    console.log(environment.LOGISTICS_URL + environment.PATHS_URL);
  
    console.log(path);
    return this.http.post<Path>(environment.LOGISTICS_URL + environment.PATHS_URL, path);
  }

  getPlanning(truckId: string, date: string): Observable<Planning> {
    return this.http.get<Planning>(environment.LOGISTICS_URL + environment.PLANNING_URL + '/' + truckId + '/' + date, { responseType: 'json' });
  }
  getGeneticPlanning(date: string,probcruzamento:string, probmutacao:string, nrgeracoes:string, tamanhopop:string):Observable<GeneticPlanning>{
    console.log("date"+date);
    console.log("probcruzamento"+probcruzamento);
    console.log("probmutacao"+probmutacao);
    console.log("numero geracoes"+nrgeracoes);
    console.log("tamanho populacao"+tamanhopop);
    
    return this.http.put<GeneticPlanning>(environment.LOGISTICS_URL_LOCAL + environment.GENETICPLANNING_URL + '/' + date+ '/' +probcruzamento+ '/'+probmutacao+'/'+nrgeracoes+'/'+tamanhopop, { responseType: 'json' });
  }
  //Packaging packaging
  getPackagings(): Observable<Packaging[]> {
    return this.http.get<Packaging[]>(environment.LOGISTICS_URL + environment.PACKAGING_URL, { responseType: 'json' });
  }

  getPackaging(id: string): Observable<Packaging> {
    return this.http.get<Packaging>(environment.LOGISTICS_URL + environment.PACKAGING_URL + '/' + id, { responseType: 'json'});
  }

  postPackaging(info: any): Observable<Packaging> {
    console.log(info);
    return this.http.post<Packaging>(environment.LOGISTICS_URL + environment.PACKAGING_URL, info);
  }
  putPackaging(info: any): Observable<Packaging> {
    console.log(info);
    return this.http.put<Packaging>(environment.LOGISTICS_URL + environment.PACKAGING_URL, info);
  }
 
}