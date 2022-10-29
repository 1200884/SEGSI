import { Repo } from "../../core/infra/Repo";
import { Path } from "../../domain/path";
import { PathId } from "../../domain/pathId";

export default interface IPathRepo extends Repo<Path> {
  save(Path: Path): Promise<Path>;
  findByDomainId (PathId: PathId | string): Promise<Path>;

}