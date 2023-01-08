import { AggregateRoot } from "../core/domain/AggregateRoot";

import { Result } from "../core/logic/Result";

import IGeneticPlanningDTO from "../dto/IGeneticPlanningDTO";

interface GeneticPlanningProps {
    //places: [string];
    date:string,
    geracoes:number,
    populacao:number,
    cruzamento:number,
    mutacao:number
}

export class GeneticPlanning extends AggregateRoot<GeneticPlanningProps> {

 /*get places (): [string] {
    return this.props.places;
  }

  set places ( value: [string]) {
    this.props.places = value;
  }*/
  
  get date():string{
    return this.props.date;
  }
  get geracoes():number{
    return this.props.geracoes;
  }
  get populacao():number{
    return this.props.populacao;
  }
  get cruzamento():number{
    return this.props.cruzamento;
  }
  get mutacao():number{
    return this.props.mutacao;
  }

  set date ( value: string) {
    this.props.date = value;
  }
  set geracoes ( value: number) {
    this.props.geracoes = value;
  }
  set populacao ( value: number) {
    this.props.populacao = value;
  }
  set cruzamento ( value: number) {
    this.props.cruzamento = value;
  }
  set mutacao ( value:number) {
    this.props.mutacao = value;
  }


  private constructor (props: GeneticPlanningProps) {
    super(props);
  }

  public static create (geneticplanningDTO: IGeneticPlanningDTO): Result<GeneticPlanning> {
    
    const date = geneticplanningDTO.date;
    const geracoes = geneticplanningDTO.geracoes;
    const populacao = geneticplanningDTO.populacao;
    const cruzamento = geneticplanningDTO.cruzamento;
    const mutacao = geneticplanningDTO.mutacao;
      const geneticplanning = new GeneticPlanning({date: date,geracoes: geracoes,populacao: populacao,cruzamento: cruzamento, mutacao: mutacao});
      return Result.ok<GeneticPlanning>( geneticplanning )
    }
  }

