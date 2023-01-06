import { Component, OnInit } from '@angular/core';
import { LogisticsService } from 'src/app/_services/logistics.service';
import {GeneticPlanning} from 'src/app/_models/GeneticPlanning'
@Component({
  selector: 'app-get-geneticplanning',
  templateUrl: './get-geneticplanning.component.html',
  styleUrls: ['./get-geneticplanning.component.css']
})
export class GetGeneticplanningComponent implements OnInit {

  content?: string;
  geneticplanning: GeneticPlanning = {
    places: []
  };
  error = false;

  constructor(private logisticsService:LogisticsService){}

  ngOnInit(): void {}

  getGeneticPlanning(info:any):void{
    this.logisticsService.getGeneticPlanning(info.id,info.date,info.probcruzamento,info.probmutacao,info.nrgeracoes,info.tamanhopop).subscribe(
      data => {
        this.error = false;
        this.content = '';
        this.geneticplanning = data;
      },
      err => {
        this.error = true;
        this.content = JSON.parse(err.error).message;
      }
    )

  }
}
