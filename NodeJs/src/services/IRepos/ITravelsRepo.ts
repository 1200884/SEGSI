import { Repo } from "../../core/infra/Repo";
import { Planning } from "../../domain/planning";
import { Travels } from "../../domain/travels";

export default interface ITravelsRepo extends Repo<Travels> {
  generateTravels (date: string): Promise<Travels>;
  save (travels: Travels): Promise<Travels>
}