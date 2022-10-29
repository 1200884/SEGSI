import { Result } from "../../core/logic/Result";
import IPathDTO from "../../dto/IPathDTO";

//In accordance with the Lvl 3 Logical View developed, as it uses DTO instances as it can be seen below, are used in the services class, consuming, as such, the DTO class functionalities.
export default interface IPathService  {
  createPath(PathDTO: IPathDTO): Promise<Result<IPathDTO>>;
  updatePath(PathDTO: IPathDTO): Promise<Result<IPathDTO>>;
  listPath();
  getPath (PathId: string): Promise<Result<IPathDTO>>;
}
