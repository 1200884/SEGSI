import { Component, OnInit } from '@angular/core';
import { LogisticsService } from 'src/app/_services/logistics.service';
import {GeneticPlanning} from 'src/app/_models/GeneticPlanning'
@Component({
  selector: 'app-get-geneticplanning',
  templateUrl: './get-geneticplanning.component.html',
  styleUrls: ['./get-geneticplanning.component.css']
})
export class GetGeneticplanningComponent implements OnInit {

  content?: String;
  error = false;
  form: any = {
    date: null,
    probcruzamento: null,
    probmutacao: null,
    nrgeracoes: null,
    tamanhopop: null
  };
  constructor(private logisticsService:LogisticsService){}

  ngOnInit(): void {}

  getGeneticPlanning(info:any):void{
    const { date, nrgeracoes, tamanho, probcruzamento, probmutacao } = this.form;
    let geneticplanning : GeneticPlanning;
    geneticplanning = this.form;
    this.logisticsService.getGeneticPlanning(geneticplanning).subscribe(
      data => {
        console.log("date is"+info.date);
        console.log("probcruzamento is"+info.probcruzamento);
        console.log("probmutacao is"+info.probmutacao);
        console.log("nrgeracoes is"+info.nrgeracoes);
        console.log("tamanhopop is"+info.tamanhopop);
        //console.log("termino is"+info.termino)
        this.error = false;
        this.content = data;
        
      },
      err => {
        this.error = true;
        this.content = JSON.parse(err.error).message;
      }
    )

  }
}
