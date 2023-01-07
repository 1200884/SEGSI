import { Service, Inject } from 'typedi';
import config from "../../config";
import { IUserDTO } from '../dto/IUserDTO';
import { User } from '../domain/user';
import IUserRepo from './IRepos/IUserRepo';
import IUserService from './IServices/IUserService';
import { Result } from "../core/logic/Result";
import { UserMap } from '../mappers/UserMap';

@Service()
export default class UserService implements IUserService {
  constructor(
    @Inject(config.repos.user.name) private userRepo: IUserRepo,
  ) { }

  public async createUser(userDTO: IUserDTO): Promise<Result<IUserDTO>> {
    try {

      const user = await this.userRepo.findByEmail(userDTO.email);
      if( user === null){
      const userOrError = await User.create(userDTO);

      if (userOrError.isFailure) {
        return Result.fail<IUserDTO>(userOrError.errorValue());
      }

      const userResult = userOrError.getValue();

      await this.userRepo.save(userResult);

      const userDTOResult = UserMap.toDTO(userResult) as IUserDTO;
      return Result.ok<IUserDTO>(userDTOResult)
      }else{
        return Result.fail<IUserDTO>("This email is already registered");
      }
    } catch (e) {
      throw e;
    }
  }

  public async getUsers(): Promise<Result<IUserDTO[]>> {
    try {
      const users = await this.userRepo.findAll();
      var finalusers: Array<IUserDTO> = [];
      if (users === null) {
        return Result.fail<IUserDTO[]>("There was a problem assembling the users");
      }
      else {
        
        for (var i = 0; i<users.length; i++){
          finalusers.push(UserMap.toDTO(users[i]) as IUserDTO);
        }
        return Result.ok<IUserDTO[]>(finalusers)
      }
    } catch (e) {
      throw e;
    }
  }

  public async signIn(email: string): Promise<Result<IUserDTO>> {
    try {
      const user = await this.userRepo.findByEmail(email);

      if (user === null) {
        return Result.fail<IUserDTO>("User not found");
      }
      else {
        const userDTOResult = UserMap.toDTO(user) as IUserDTO;
        return Result.ok<IUserDTO>(userDTOResult)
      }
    } catch (e) {
      throw e;
    }
  }

  public async disableUser(email: string): Promise<Result<IUserDTO>> {
    try {
      const user = await this.userRepo.findByEmail(email);

      if (user === null) {
        return Result.fail<IUserDTO>("User not found");
      }
      else {
        user.firstName = "Sem Nome";
        user.lastName = "Sem Nome";
        user.email = "aaa@aaa.com";
        user.phoneNumber = "999999999";
        await this.userRepo.save(user);

        const userDTOResult = UserMap.toDTO(user) as IUserDTO;
        return Result.ok<IUserDTO>(userDTOResult)
      }
    } catch (e) {
      throw e;
    }
  }

}
