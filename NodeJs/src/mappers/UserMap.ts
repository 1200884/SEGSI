import { Container } from 'typedi';

import { Mapper } from "../core/infra/Mapper";

import {IUserDTO} from "../dto/IUserDTO";

import { User } from "../domain/user";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";

import { UserEmail } from "../domain/userEmail";

import RoleRepo from "../repos/roleRepo";

export class UserMap extends Mapper<User> {

  public static toDTO( user: User): IUserDTO {
    return {
      //id: user.id.toString(),
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role
    } as IUserDTO;
  }

  public static async toDomain (raw: any): Promise<User> {
    const userEmailOrError = UserEmail.create(raw.email);
    const repo = Container.get(RoleRepo);
    const role = await repo.findByDomainId(raw.role);

    const userOrError = User.create({
      firstName: raw.firstName,
      lastName: raw.lastName,
      email: raw.email,
      phoneNumber: raw.phoneNumber,
      role: raw.role,
    }, new UniqueEntityID(raw.domainId))

    userOrError.isFailure ? console.log(userOrError.error) : '';
    
    return userOrError.isSuccess ? userOrError.getValue() : null;
  }

  public static toPersistence (user: User): any {
    const a = {
      domainId: user.id.toString(),
      email: user.email,
      phoneNumber: user.phoneNumber,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
    }
    return a;
  }
}