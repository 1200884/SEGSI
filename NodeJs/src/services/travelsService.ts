import { Service, Inject } from 'typedi';
import config from "../../config";
import { Result } from "../core/logic/Result";
import ITravelsService from './IServices/ITravelsService';
import ITravelsDTO from '../dto/ITravelsDTO';
import ITravelsRepo from './IRepos/ITravelsRepo';
import { TravelsMap } from '../mappers/TravelsMap';

@Service()
export default class TravelsService implements ITravelsService {
  constructor(
    @Inject(config.repos.travels.name) private travelsRepo: ITravelsRepo,
  ) { }

  public async getTravels(date: string): Promise<Result<ITravelsDTO>> {
    try {

      const travels = await this.travelsRepo.getTravelsByDate(date);

      if (travels === null) {
        const createdTavels = await this.travelsRepo.generateTravels(date);

        if (createdTavels === null) {
          return Result.fail<ITravelsDTO>("There are no travels");
        }
        else {
          await this.travelsRepo.save(createdTavels);

          const travelsDTOResult = TravelsMap.toDTO(createdTavels) as ITravelsDTO;
          return Result.ok<ITravelsDTO>(travelsDTOResult);
        }
      }
      else {
        const travelsDTOResult = TravelsMap.toDTO(travels) as ITravelsDTO;
        return Result.ok<ITravelsDTO>(travelsDTOResult);
      }
    } catch (e) {
      throw e;
    }
  }
}
