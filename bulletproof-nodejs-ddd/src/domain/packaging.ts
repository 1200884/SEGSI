import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";

import { Result } from "../core/logic/Result";
import { PackagingId } from "./packagingId";

import IPackagingDTO from "../dto/IPackagingDTO";

interface PackgingProps {
  boxId: number;
  positionX : number;
  positionY : number;
  positionZ : number;
}

export class Packaging extends AggregateRoot<PackagingProps> {
  get id (): UniqueEntityID {
    return this._id;
  }
  get packagingId (): PackagingId {
    return new PackagingId(this.packagingId.toValue());
  }
  get boxId (): number {
    return this.props.boxId;
  }
  get positionX (): number {
    return this.props.positionX;
  }
  get positionY (): number {
    return this.props.positionY;
  }
  get positionZ (): number {
    return this.props.positionZ;
  }

  set boxId ( value: number) {
    this.props.boxId = value;
  }
  set positionX ( value: number) {
    this.props.positionX = value;
  }
  set positionY ( value: number) {
    this.props.positionY = value;
  }
  set positionZ ( value: number) {
    this.props.positionZ = value;
  }


  private constructor (props: PackagingProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create (roleDTO: IRoleDTO, id?: UniqueEntityID): Result<Role> {
    const name = roleDTO.name;

    if (!!name === false || name.length === 0) {
      return Result.fail<Role>('Must provide a role name')
    } else {
      const role = new Role({ name: name }, id);
      return Result.ok<Role>( role )
    }
  }
}
